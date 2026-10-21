<script setup lang="ts">
import { engagement, formations, langues } from '../data/profil'
</script>

<template>
  <section id="formation" class="section">
    <div class="wrap colonnes">
      <div>
        <div class="section-head"><h2>Formation</h2></div>
        <ol class="formations">
          <li v-for="f in formations" :key="f.intitule">
            <span class="periode">{{ f.periode }}</span>
            <div>
              <p class="intitule">{{ f.intitule }}</p>
              <p class="ecole">{{ f.ecole }}</p>
            </div>
          </li>
        </ol>
      </div>
      <div class="cote">
        <div>
          <h2 class="petit">Engagement</h2>
          <p class="intitule">{{ engagement.role }}, {{ engagement.nom }}</p>
          <p class="ecole">{{ engagement.description }}</p>
        </div>
        <div>
          <h2 class="petit">Langues</h2>
          <p>{{ langues }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.colonnes { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 3rem 4rem; }
.formations { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.4rem; }
.formations li { display: grid; grid-template-columns: 7.5rem minmax(0, 1fr); gap: 1rem; }
.periode { color: var(--muted); font-variant-numeric: tabular-nums; padding-top: 0.1rem; }
.intitule { font-weight: 700; }
.ecole { color: var(--muted); }
.cote { display: grid; gap: 2.25rem; align-content: start; }
.petit { font-size: 1.75rem; margin-bottom: 0.75rem; }
@media (max-width: 860px) {
  .colonnes { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .formations li { grid-template-columns: 1fr; gap: 0.15rem; }
}
</style>
