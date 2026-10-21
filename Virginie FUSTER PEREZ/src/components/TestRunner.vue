<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { tests } from '../data/profil'

// Simule « npx playwright test » sur le profil : les tests passent un par un.
const commande = 'npx playwright test profil.spec.ts'
const tape = ref('')
const passes = ref(0)
const enCours = ref(false)
const termine = ref(false)
let timers: number[] = []

const total = computed(() => tests.reduce((t, x) => t + x.duree, 0))

function nettoyer() {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
}

function lancer() {
  nettoyer()
  tape.value = ''
  passes.value = 0
  termine.value = false
  enCours.value = true

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tape.value = commande
    passes.value = tests.length
    enCours.value = false
    termine.value = true
    return
  }

  let t = 300
  for (let i = 1; i <= commande.length; i++) {
    timers.push(window.setTimeout(() => (tape.value = commande.slice(0, i)), t))
    t += 28
  }
  t += 450
  tests.forEach((x, i) => {
    t += x.duree * 1.6
    timers.push(window.setTimeout(() => (passes.value = i + 1), t))
  })
  timers.push(
    window.setTimeout(() => {
      enCours.value = false
      termine.value = true
    }, t + 300),
  )
}

onMounted(lancer)
onBeforeUnmount(nettoyer)
</script>

<template>
  <div class="terminal" role="region" aria-label="Terminal : tests du profil">
    <div class="barre">
      <span class="pt" aria-hidden="true"></span><span class="pt" aria-hidden="true"></span><span class="pt" aria-hidden="true"></span>
      <span class="onglet">profil.spec.ts</span>
    </div>
    <div class="corps" aria-live="polite">
      <p class="ligne"><span class="prompt">~/virginie $</span> {{ tape }}<span v-if="enCours && tape.length < commande.length" class="curseur" aria-hidden="true"></span></p>
      <template v-if="tape === commande">
        <p class="ligne muted">Running {{ tests.length }} tests using 1 worker</p>
        <p class="vide"></p>
        <p v-for="(x, i) in tests.slice(0, passes)" :key="x.suite" class="ligne test">
          <span class="ok">✓</span>
          <span class="num">{{ i + 1 }}</span>
          <span><span class="suite">{{ x.suite }}</span> › {{ x.titre }}</span>
          <span class="duree">({{ x.duree }}ms)</span>
        </p>
        <p v-if="enCours && passes < tests.length" class="ligne muted"><span class="spin" aria-hidden="true"></span> {{ tests[passes].suite }}…</p>
      </template>
      <template v-if="termine">
        <p class="vide"></p>
        <p class="ligne resume"><span class="ok">{{ tests.length }} passed</span> <span class="muted">({{ (total / 1000).toFixed(1) }}s)</span></p>
        <p class="ligne"><span class="prompt">~/virginie $</span><span class="curseur" aria-hidden="true"></span></p>
      </template>
    </div>
    <button type="button" class="relancer" :disabled="enCours" @click="lancer">
      {{ enCours ? 'Tests en cours…' : 'Relancer les tests' }}
    </button>
  </div>
</template>

<style scoped>
.terminal {
  background: var(--term); color: var(--term-text); border-radius: 12px; overflow: hidden;
  box-shadow: 0 30px 60px -25px rgb(0 0 0 / 0.6); border: 1px solid rgb(255 255 255 / 0.1);
  font: 400 0.84rem/1.65 var(--font-mono);
  display: flex; flex-direction: column;
}
.barre { display: flex; align-items: center; gap: 6px; padding: 0.6rem 0.9rem; background: rgb(255 255 255 / 0.05); border-bottom: 1px solid rgb(255 255 255 / 0.06); }
.pt { width: 10px; height: 10px; border-radius: 50%; background: rgb(255 255 255 / 0.18); }
.onglet { margin-left: 0.7rem; color: var(--term-muted); font-size: 0.78rem; }
.corps { padding: 1rem 1.1rem 0.5rem; min-height: 19rem; overflow-x: auto; }
.ligne { white-space: pre-wrap; }
.vide { height: 0.6rem; }
.prompt { color: var(--term-ok); margin-right: 0.5ch; }
.muted { color: var(--term-muted); }
.test { display: grid; grid-template-columns: 1.4ch 2ch 1fr auto; gap: 0 0.8ch; white-space: normal; }
.ok { color: var(--term-ok); }
.num { color: var(--term-muted); text-align: right; }
.suite { color: var(--term-muted); }
.duree { color: var(--term-muted); white-space: nowrap; }
.resume { font-weight: 600; }
.curseur { display: inline-block; width: 0.6ch; height: 1.1em; vertical-align: -0.2em; background: var(--term-text); margin-left: 0.2ch; animation: clignote 1s steps(2) infinite; }
.spin { display: inline-block; width: 0.8em; height: 0.8em; border: 2px solid var(--term-muted); border-top-color: transparent; border-radius: 50%; animation: tourne 0.8s linear infinite; vertical-align: -0.1em; }
@keyframes clignote { to { visibility: hidden; } }
@keyframes tourne { to { transform: rotate(360deg); } }
.relancer {
  margin: 0.5rem 1.1rem 1rem; align-self: flex-start;
  font: 600 0.8rem/1 var(--font-mono); color: var(--term-text); background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.14); border-radius: 6px; padding: 0.55rem 0.8rem; cursor: pointer;
}
.relancer:hover:not(:disabled) { background: rgb(255 255 255 / 0.14); }
.relancer:disabled { opacity: 0.55; cursor: default; }
@media (max-width: 760px) {
  .terminal { font-size: 0.74rem; }
  .test { grid-template-columns: 1.4ch 1fr; }
  .num, .duree { display: none; }
  .corps { min-height: 22rem; }
}
@media (prefers-reduced-motion: reduce) {
  .curseur, .spin { animation: none; }
}
</style>
