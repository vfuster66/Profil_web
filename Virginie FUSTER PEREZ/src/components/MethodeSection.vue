<script setup lang="ts">
import { ref } from 'vue'
import { methode } from '../data/profil'
import PipelineDemo from './PipelineDemo.vue'

type Mode = 'escale' | 'qa'
const mode = ref<Mode>('qa')
const modes: { id: Mode; label: string }[] = [
  { id: 'escale', label: 'À l’escale' },
  { id: 'qa', label: 'En QA' },
]
</script>

<template>
  <section id="methode" class="section methode">
    <div class="wrap">
      <div class="tete" v-reveal>
        <div class="section-head">
          <h2>Ma méthode</h2>
          <p>Vingt-quatre ans à faire partir des avions à l’heure m’ont appris une démarche que j’applique aujourd’hui aux logiciels. Comparez les deux.</p>
        </div>
        <div class="bascule" role="group" aria-label="Choisir le terrain">
          <button
            v-for="m in modes"
            :key="m.id"
            type="button"
            :aria-pressed="mode === m.id"
            :class="{ actif: mode === m.id }"
            @click="mode = m.id"
          >{{ m.label }}</button>
        </div>
      </div>

      <ol class="etapes" v-reveal>
        <li v-for="(e, i) in methode" :key="e.titre" class="etape">
          <span class="num" aria-hidden="true">{{ i + 1 }}</span>
          <h3>{{ e.titre }}</h3>
          <Transition name="bascule" mode="out-in">
            <p :key="mode">{{ e[mode] }}</p>
          </Transition>
        </li>
      </ol>

      <PipelineDemo v-reveal />
    </div>
  </section>
</template>

<style scoped>

.tete { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1.5rem 3rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
.tete .section-head { margin-bottom: 0; }

.bascule { display: inline-flex; background: var(--tint); border: 1px solid var(--line); border-radius: 999px; padding: 4px; }
.bascule button {
  font: 600 1.15rem/1 var(--font-display); letter-spacing: 0.02em;
  border: 0; background: transparent; color: var(--muted);
  padding: 0.7rem 1.3rem; border-radius: 999px; cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.bascule button.actif { background: var(--accent); color: var(--on-accent); box-shadow: 0 4px 12px -4px rgb(91 42 134 / 0.5); }

.etapes {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1.25rem;
}
.etape {
  background: var(--surface); border-radius: 12px; padding: 1.5rem 1.4rem 1.6rem;
  border: 1px solid var(--line); border-top: 4px solid var(--accent);
  display: grid; align-content: start; gap: 0.6rem; min-height: 15rem;
}
.num {
  width: 2.4rem; height: 2.4rem; border-radius: 50%; display: grid; place-items: center;
  background: var(--accent); color: var(--on-accent); font: 600 1.25rem/1 var(--font-display);
}
.etape p { color: var(--muted); }

.bascule-enter-active, .bascule-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.bascule-enter-from { opacity: 0; transform: translateY(8px); }
.bascule-leave-to { opacity: 0; transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) {
  .bascule-enter-active, .bascule-leave-active { transition: none; }
}
</style>
