<script setup lang="ts">
import { competences } from '../data/profil'
</script>

<template>
  <section id="competences" class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Compétences</h2>
      </div>
      <div class="groupes">
        <div v-for="g in competences" :key="g.groupe" class="groupe">
          <h3>{{ g.groupe }}</h3>
          <ul>
            <li v-for="c in g.items" :key="c">{{ c }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.groupes { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr)); gap: 2.25rem 3rem; }
h3 { font-size: 1.3rem; margin-bottom: 0.75rem; }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.45rem; }
li {
  padding: 0.3rem 0.7rem; border: 1px solid var(--line); border-radius: 4px;
  background: var(--surface); font-size: 0.95rem;
}
</style>
