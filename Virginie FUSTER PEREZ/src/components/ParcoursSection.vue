<script setup lang="ts">
import { experiences } from '../data/profil'
</script>

<template>
  <section id="parcours" class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Parcours</h2>
        <p>Vingt-quatre ans d’exploitation aéroportuaire, puis la qualité logicielle.</p>
      </div>
      <ol class="liste">
        <li v-for="e in experiences" :key="e.structure + e.poste" class="item">
          <div class="meta">
            <p class="structure">{{ e.structure }}</p>
            <p class="periode">{{ e.periode }}</p>
          </div>
          <div class="corps">
            <h3>{{ e.poste }}</h3>
            <ul class="points">
              <li v-for="p in e.points" :key="p">{{ p }}</li>
            </ul>
            <ol v-if="e.etapes" class="etapes" aria-label="Évolution de poste">
              <li v-for="et in e.etapes" :key="et.periode">
                <span class="et-periode">{{ et.periode }}</span>
                <span>{{ et.poste }}</span>
              </li>
            </ol>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.liste { list-style: none; margin: 0; padding: 0; }
.item {
  display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: 1rem 2.5rem;
  padding-block: 1.75rem; border-top: 1px solid var(--line);
}
.item:first-child { border-top: 0; padding-top: 0; }
.structure { font: 600 1.3rem/1.2 var(--font-display); }
.periode { color: var(--muted); font-size: 0.95rem; margin-top: 0.25rem; }
.corps { max-width: var(--measure); }
.points { margin: 0.75rem 0 0; padding-left: 1.1rem; list-style: disc; }
.points li { margin-bottom: 0.35rem; }
.points li::marker { color: var(--accent); }
.etapes {
  list-style: none; margin: 1.25rem 0 0; padding: 0.25rem 0 0 1rem;
  border-left: 2px solid var(--line); display: grid; gap: 0.4rem;
}
.etapes li { display: flex; gap: 1rem; flex-wrap: wrap; }
.et-periode { color: var(--muted); min-width: 7.5rem; font-variant-numeric: tabular-nums; }
@media (max-width: 760px) {
  .item { grid-template-columns: 1fr; gap: 0.5rem; }
}
</style>
