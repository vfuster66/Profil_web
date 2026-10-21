<script setup lang="ts">
import { projets } from '../data/profil'
</script>

<template>
  <section id="projets" class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Projets</h2>
        <p>Une sélection de ce que j’ai conçu et développé.</p>
      </div>
      <ul class="grille">
        <li v-for="p in projets" :key="p.nom" class="projet">
          <h3>{{ p.nom }}</h3>
          <p class="desc">{{ p.description }}</p>
          <p v-if="p.stack" class="stack"><span class="sr-only">Technologies : </span>{{ p.stack.join(', ') }}</p>
          <a v-if="p.lien" :href="p.lien" class="lien" target="_blank" rel="noopener">Voir le site</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grille {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 0 3rem;
}
.projet {
  display: flex; flex-direction: column; gap: 0.55rem;
  padding: 1.5rem 0 1.75rem; border-top: 3px solid var(--ink);
}
.desc { max-width: 52ch; }
.stack { color: var(--muted); font-size: 0.95rem; }
.lien { margin-top: auto; padding-top: 0.4rem; font-weight: 700; }
</style>
