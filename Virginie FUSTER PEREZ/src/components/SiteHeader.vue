<script setup lang="ts">
import { identite } from '../data/profil'

const liens = [
  { href: '#parcours', label: 'Parcours' },
  { href: '#projets', label: 'Projets' },
  { href: '#competences', label: 'Compétences' },
  { href: '#formation', label: 'Formation' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <header class="header">
    <div class="wrap bar">
      <a href="#haut" class="brand">{{ identite.nom }}</a>
      <nav aria-label="Navigation principale">
        <ul>
          <li v-for="l in liens" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 10;
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.75rem; }
.brand { font: 700 1.35rem/1 var(--font-display); text-decoration: none; white-space: nowrap; }
ul { display: flex; gap: 1.4rem; list-style: none; margin: 0; padding: 0; }
nav a { text-decoration: none; color: var(--muted); font-size: 0.98rem; }
nav a:hover { color: var(--ink); text-decoration: underline; }

@media (max-width: 760px) {
  .bar { flex-direction: column; align-items: flex-start; gap: 0.35rem; padding-block: 0.6rem; }
  ul { flex-wrap: wrap; gap: 0.2rem 1rem; }
  nav a { white-space: nowrap; font-size: 0.92rem; }
}
</style>
