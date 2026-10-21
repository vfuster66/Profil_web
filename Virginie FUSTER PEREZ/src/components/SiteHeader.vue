<script setup lang="ts">
import { onMounted } from 'vue'
import { identite } from '../data/profil'
import { basculerTheme, initTheme, paletteOuverte, sombre } from '../theme'

const liens = [
  { href: '#methode', label: 'Méthode' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#projets', label: 'Projets' },
  { href: '#competences', label: 'Compétences' },
  { href: '#contact', label: 'Contact' },
]

onMounted(initTheme)
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
      <button class="outil cmd" type="button" @click="paletteOuverte = true">
        <span class="sr-only">Ouvrir la palette de commandes</span>
        <span aria-hidden="true">⌘K</span>
      </button>
      <button class="outil" type="button" :aria-pressed="sombre" @click="basculerTheme">
        <span aria-hidden="true">{{ sombre ? '☀' : '☾' }}</span>
        <span class="sr-only">Thème sombre</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 10;
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.bar { display: flex; align-items: center; gap: 1rem; min-height: 3.75rem; }
.brand { font: 600 1.4rem/1 var(--font-display); text-decoration: none; white-space: nowrap; margin-right: auto; }
ul { display: flex; gap: 1.4rem; list-style: none; margin: 0 0.5rem 0 0; padding: 0; }
nav a { text-decoration: none; color: var(--muted); font-size: 0.98rem; padding-block: 0.3rem; border-bottom: 2px solid transparent; }
nav a:hover { color: var(--ink); border-bottom-color: var(--accent); }
.outil {
  height: 2.4rem; min-width: 2.4rem; padding: 0 0.6rem; border-radius: 999px; border: 1px solid var(--line);
  background: var(--surface); color: var(--ink); font-size: 1.05rem; cursor: pointer;
  display: grid; place-items: center; flex-shrink: 0;
}
.cmd { font: 500 0.8rem/1 var(--font-mono); color: var(--muted); }
.outil:hover { border-color: var(--accent); }

@media (max-width: 920px) {
  .bar { flex-wrap: wrap; gap: 0.3rem 0.6rem; padding-block: 0.55rem; }
  nav { order: 3; width: 100%; }
  ul { flex-wrap: wrap; gap: 0.15rem 1rem; }
  nav a { font-size: 0.92rem; }
}
</style>
