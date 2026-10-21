<script setup lang="ts">
import { departs, experiences } from '../data/profil'
import DepartureBoard from './DepartureBoard.vue'
</script>

<template>
  <section id="parcours" class="section section-tint">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Parcours</h2>
        <p>La qualité logicielle aujourd’hui, avec l’expérience du terrain derrière.</p>
      </div>
      <div class="tableau" v-reveal><DepartureBoard :departs="departs" /></div>
      <ol class="liste">
        <li v-for="e in experiences" :id="e.id" :key="e.id" class="item" v-reveal>
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
.tableau { margin-bottom: clamp(2rem, 4vw, 3rem); }
.liste { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.25rem; }
.item {
  display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: 1rem 2.5rem;
  padding: 1.75rem 1.75rem 1.9rem; background: var(--surface);
  border: 1px solid var(--line); border-left: 4px solid var(--line); border-radius: 10px;
  scroll-margin-top: 5.5rem;
}
.item:first-child, .item:nth-child(2) { border-left-color: var(--accent); }
.structure { font: 600 1.5rem/1.15 var(--font-display); color: var(--accent); }
.periode { color: var(--muted); font-size: 0.95rem; margin-top: 0.3rem; }
.corps { max-width: var(--measure); }
.points { margin: 0.75rem 0 0; padding-left: 1.1rem; list-style: disc; }
.points li { margin-bottom: 0.35rem; }
.points li::marker { color: var(--pop); }
.etapes {
  list-style: none; margin: 1.25rem 0 0; padding: 0.25rem 0 0 1rem;
  border-left: 2px solid var(--line); display: grid; gap: 0.4rem;
}
.etapes li { display: flex; gap: 1rem; flex-wrap: wrap; }
.et-periode { color: var(--muted); min-width: 7.5rem; font-variant-numeric: tabular-nums; }

/* Mise en évidence quand on arrive depuis le tableau des départs */
.item.signale { animation: signale 1.6s ease; }
@keyframes signale {
  0%, 30% { box-shadow: 0 0 0 3px var(--pop); }
  100% { box-shadow: 0 0 0 0 transparent; }
}

@media (max-width: 760px) {
  .item { grid-template-columns: 1fr; gap: 0.5rem; padding: 1.3rem 1.2rem 1.4rem; }
}
</style>
