<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

type Etat = 'attente' | 'cours' | 'ok' | 'ko'
interface Etape { nom: string; detail: string }

const etapes: Etape[] = [
  { nom: 'Commit', detail: 'git push' },
  { nom: 'Lint et types', detail: 'eslint, vue-tsc' },
  { nom: 'Tests unitaires', detail: 'vitest' },
  { nom: 'Tests E2E', detail: 'playwright' },
  { nom: 'Recette', detail: 'validation métier' },
  { nom: 'Production', detail: 'déploiement' },
]

const etats = ref<Etat[]>(etapes.map(() => 'attente'))
const journal = ref<{ texte: string; type: 'info' | 'ok' | 'ko' | 'action' }[]>([])
const actif = ref(false)
const boite = ref<HTMLElement | null>(null)
watch(() => journal.value.length, async () => {
  await nextTick()
  if (boite.value) boite.value.scrollTop = boite.value.scrollHeight
})
let timers: number[] = []
const lent = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function plus(delai: number, fn: () => void) {
  timers.push(window.setTimeout(fn, lent() ? delai : 0))
}
function log(texte: string, type: 'info' | 'ok' | 'ko' | 'action' = 'info') {
  journal.value.push({ texte, type })
}

function lancer(anomalie: boolean) {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
  etats.value = etapes.map(() => 'attente')
  journal.value = []
  actif.value = true

  let t = 0
  const derouler = (depuis: number, echecA: number | null) => {
    for (let i = depuis; i < etapes.length; i++) {
      const idx = i
      plus(t, () => {
        etats.value[idx] = 'cours'
        log(`▸ ${etapes[idx].nom} (${etapes[idx].detail})`)
      })
      t += 750
      if (echecA === idx) {
        plus(t, () => {
          etats.value[idx] = 'ko'
          log('✗ panier › le total n’applique pas la remise fidélité', 'ko')
        })
        t += 900
        plus(t, () => log('→ Anomalie reproduite et qualifiée : priorité haute', 'action'))
        t += 800
        plus(t, () => log('→ Ticket QA-142 créé et suivi avec l’équipe développement', 'action'))
        t += 900
        plus(t, () => {
          log('→ Correctif livré, test de non-régression ajouté, relance du pipeline', 'action')
          etats.value = etats.value.map((e, k) => (k === 0 ? 'ok' : 'attente'))
        })
        t += 700
        derouler(1, null)
        return
      }
      plus(t, () => {
        etats.value[idx] = 'ok'
        log(`✓ ${etapes[idx].nom}`, 'ok')
      })
      t += 150
    }
    plus(t, () => {
      log('Mise en production validée', 'ok')
      actif.value = false
    })
  }
  derouler(0, anomalie ? 3 : null)
}

onBeforeUnmount(() => timers.forEach((t) => window.clearTimeout(t)))
</script>

<template>
  <div class="pipeline">
    <div class="tete">
      <div>
        <h3>Le pipeline qualité, en direct</h3>
        <p>Ce que je surveille entre un commit et la mise en production. Lancez-le, ou provoquez une anomalie pour voir comment je la traite.</p>
      </div>
      <div class="boutons">
        <button type="button" class="btn btn-primary" :disabled="actif" @click="lancer(false)">Lancer le pipeline</button>
        <button type="button" class="btn btn-outline" :disabled="actif" @click="lancer(true)">Simuler une anomalie</button>
      </div>
    </div>

    <ol class="etapes">
      <li v-for="(e, i) in etapes" :key="e.nom" :class="etats[i]">
        <span class="pastille" aria-hidden="true">
          <template v-if="etats[i] === 'ok'">✓</template>
          <template v-else-if="etats[i] === 'ko'">✗</template>
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="nom">{{ e.nom }}</span>
        <span class="detail">{{ e.detail }}</span>
        <span class="sr-only">: {{ { attente: 'en attente', cours: 'en cours', ok: 'réussi', ko: 'en échec' }[etats[i]] }}</span>
      </li>
    </ol>

    <div ref="boite" class="journal" aria-live="polite">
      <p v-if="!journal.length" class="vide">$ en attente d’un déclenchement…</p>
      <p v-for="(l, i) in journal" :key="i" :class="l.type">{{ l.texte }}</p>
    </div>
  </div>
</template>

<style scoped>
.pipeline { margin-top: clamp(2.5rem, 5vw, 3.5rem); background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: clamp(1.25rem, 3vw, 2rem); }
.tete { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem 2rem; margin-bottom: 1.5rem; }
.tete h3 { font-size: 1.6rem; font-weight: 600; margin-bottom: 0.4rem; }
.tete p { color: var(--muted); max-width: 55ch; }
.boutons { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.boutons .btn { font-size: 1.05rem; padding: 0.7rem 1.1rem; }
.boutons .btn:disabled { opacity: 0.5; cursor: default; transform: none; box-shadow: none; }

.etapes { list-style: none; margin: 0 0 1.25rem; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.5rem; }
.etapes li {
  position: relative; display: grid; gap: 0.25rem; justify-items: start;
  padding: 0.9rem 0.85rem; border-radius: 10px; border: 1px solid var(--line); background: var(--paper);
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
.pastille {
  width: 1.8rem; height: 1.8rem; border-radius: 50%; display: grid; place-items: center;
  font: 600 0.8rem/1 var(--font-mono); background: var(--tint); color: var(--muted);
}
.nom { font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
.detail { font: 400 0.75rem/1.2 var(--font-mono); color: var(--muted); }
.etapes li.cours { border-color: var(--pop); }
.cours .pastille { background: var(--pop); color: #fff; animation: pulse 1s ease infinite; }
.etapes li.ok { background: var(--accent-soft); border-color: transparent; }
.ok .pastille { background: var(--accent); color: var(--on-accent); }
.etapes li.ko { border-color: #c98a80; background: color-mix(in srgb, #c98a80 14%, var(--surface)); }
.ko .pastille { background: #b5685c; color: #fff; }
@keyframes pulse { 50% { box-shadow: 0 0 0 5px rgb(192 38 122 / 0.25); } }

.journal {
  background: var(--term); color: var(--term-text); border-radius: 10px; padding: 0.9rem 1rem;
  font: 400 0.8rem/1.7 var(--font-mono); min-height: 9.5rem; max-height: 15rem; overflow-y: auto;
}
.journal .vide, .journal .info { color: var(--term-muted); }
.journal .ok { color: var(--term-ok); }
.journal .ko { color: var(--term-ko); }
.journal .action { color: var(--term-text); }

@media (max-width: 960px) { .etapes { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 520px) { .etapes { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (prefers-reduced-motion: reduce) { .cours .pastille { animation: none; } .etapes li { transition: none; } }
</style>
