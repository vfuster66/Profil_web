<script setup lang="ts">
import { computed, ref } from 'vue'
import { competences } from '../data/profil'

const recherche = ref('')
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const groupes = computed(() => {
  const q = norm(recherche.value.trim())
  return competences.map((g) => ({
    ...g,
    visibles: q ? g.items.filter((c) => norm(c).includes(q) || norm(g.groupe).includes(q)) : g.items,
  }))
})
const nombre = computed(() => groupes.value.reduce((n, g) => n + g.visibles.length, 0))
</script>

<template>
  <section id="competences" class="section section-tint">
    <div class="wrap">
      <div class="tete" v-reveal>
        <div class="section-head"><h2>Compétences</h2></div>
        <label class="grep">
          <span class="prompt" aria-hidden="true">$ grep -i</span>
          <span class="sr-only">Filtrer les compétences</span>
          <input v-model="recherche" type="search" placeholder="playwright, sql, docker…" autocomplete="off" spellcheck="false" />
          <span class="compte" aria-live="polite">{{ nombre }} {{ nombre > 1 ? 'résultats' : 'résultat' }}</span>
        </label>
      </div>
      <div class="groupes">
        <div v-for="g in groupes" :key="g.groupe" class="groupe" :class="{ eteint: !g.visibles.length }" v-reveal>
          <h3>{{ g.groupe }}</h3>
          <ul>
            <li v-for="c in g.items" :key="c" :class="{ cache: !g.visibles.includes(c), trouve: recherche && g.visibles.includes(c) }">{{ c }}</li>
          </ul>
        </div>
      </div>
      <p v-if="recherche && !nombre" class="aucun">Aucune compétence ne contient « {{ recherche }} ». Essayez « test », « vue » ou « données ».</p>
    </div>
  </section>
</template>

<style scoped>
.tete { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem 2rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
.tete .section-head { margin-bottom: 0; }
.grep {
  display: flex; align-items: center; gap: 0.6rem; flex: 0 1 28rem; min-width: 0; max-width: 100%;
  background: var(--term); color: var(--term-text); border-radius: 10px; padding: 0.65rem 0.9rem;
  font: 400 0.9rem/1 var(--font-mono);
}
.grep:focus-within { outline: 3px solid var(--accent); outline-offset: 2px; }
.prompt { color: var(--term-ok); white-space: nowrap; }
.grep input { flex: 1; min-width: 0; width: 100%; background: transparent; border: 0; color: inherit; font: inherit; outline: none; }
.grep input::placeholder { color: var(--term-muted); }
.grep input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.compte { color: var(--term-muted); font-size: 0.78rem; white-space: nowrap; }

.groupes { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr)); gap: 1.25rem; }
.groupe { padding: 1.5rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--line); transition: opacity 0.25s ease; }
.groupe.eteint { opacity: 0.4; }
h3 { font-size: 1.35rem; font-weight: 600; margin-bottom: 0.9rem; color: var(--accent); }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.45rem; }
li {
  padding: 0.3rem 0.75rem; border-radius: 999px; background: var(--paper); border: 1px solid var(--line); font-size: 0.95rem;
  transition: opacity 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}
li.cache { opacity: 0.25; }
li.trouve { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.aucun { margin-top: 1.25rem; color: var(--muted); }
@media (max-width: 560px) {
  .grep { flex-basis: 100%; flex-wrap: wrap; row-gap: 0.4rem; }
  .compte { width: 100%; }
}
</style>
