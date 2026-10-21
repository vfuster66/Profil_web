<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Depart } from '../data/profil'

const props = defineProps<{ departs: Depart[] }>()

// Largeur de chaque colonne, en nombre de palettes.
const largeurs = { annee: 4, poste: 19, lieu: 12, statut: 6 } as const
type Colonne = keyof typeof largeurs
const colonnes: Colonne[] = ['annee', 'poste', 'lieu', 'statut']

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const tick = ref(0)
const fini = ref(false)
let timer: number | undefined

// Moment (en ticks) où chaque palette se fige sur sa lettre définitive.
const arrivee = props.departs.map((_, r) =>
  colonnes.map((col, c) =>
    Array.from({ length: largeurs[col] }, (_, i) => r * 2 + c * 3 + Math.floor(i * 0.5) + Math.floor(Math.random() * 5)),
  ),
)
const dernierTick = Math.max(...arrivee.flat(2))

function pad(texte: string, n: number) {
  return texte.toUpperCase().padEnd(n, ' ').slice(0, n).split('')
}

const lignes = computed(() =>
  props.departs.map((d, r) =>
    colonnes.map((col, c) =>
      pad(d[col], largeurs[col]).map((lettre, i) => {
        if (fini.value || lettre === ' ' || tick.value >= arrivee[r][c][i]) return lettre
        return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
      }),
    ),
  ),
)

onMounted(() => {
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduit) {
    fini.value = true
    return
  }
  timer = window.setInterval(() => {
    tick.value++
    if (tick.value > dernierTick) {
      fini.value = true
      window.clearInterval(timer)
    }
  }, 45)
})

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <figure class="board">
    <figcaption class="board-title">
      <span class="board-name">Départs</span>
      <span class="board-sub">Mon parcours, du plus récent au plus ancien. En vert : mes postes actuels.</span>
    </figcaption>

    <table>
      <thead>
        <tr>
          <th scope="col">Année</th>
          <th scope="col">Poste</th>
          <th scope="col" class="col-lieu">Lieu</th>
          <th scope="col" class="col-statut">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ligne, r) in lignes" :key="r" :class="{ actif: departs[r].statut === 'EN VOL' }">
          <td v-for="(cellule, c) in ligne" :key="c" :class="['col-' + colonnes[c]]">
            <span class="sr-only">{{ departs[r][colonnes[c]] }}</span>
            <span class="flaps" aria-hidden="true">
              <span v-for="(lettre, i) in cellule" :key="i" class="flap">{{ lettre }}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>

<style scoped>
.board {
  margin: 0;
  background: var(--board);
  color: var(--signal);
  border-radius: 10px;
  padding: clamp(1rem, 2.5vw, 1.75rem);
  overflow-x: auto;
}

.board-title {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.25rem 1rem;
  margin-bottom: 1rem; padding-bottom: 0.85rem;
  border-bottom: 1px solid color-mix(in srgb, var(--signal) 25%, transparent);
}
.board-name { font: 700 2rem/1 var(--font-display); color: #fff; }
.board-sub { font-size: 0.95rem; color: #b8c2cf; }

table { border-collapse: separate; border-spacing: 0 0.35rem; }

th {
  text-align: left; font: 500 0.95rem/1 var(--font-display);
  color: #b8c2cf; padding: 0 1rem 0.35rem 0; letter-spacing: 0.04em;
}

td { padding: 0 1rem 0 0; white-space: nowrap; }
td:last-child, th:last-child { padding-right: 0; }

.flaps { display: inline-flex; gap: 2px; }

.flap {
  position: relative;
  display: inline-grid; place-items: center;
  width: 1.15em; height: 1.55em;
  font: 600 clamp(0.9rem, 1.6vw, 1.15rem)/1 var(--font-display);
  background: var(--board-cell);
  border-radius: 2px;
}
.flap::after {
  content: ''; position: absolute; left: 0; right: 0; top: 50%;
  height: 1px; background: rgb(0 0 0 / 0.45);
}

.actif .flap { color: var(--board-ok); }

@media (max-width: 760px) {
  .col-lieu, .col-statut { display: none; }
  .flap { width: 0.92em; height: 1.4em; font-size: 0.8rem; }
  .flaps { gap: 1px; }
  td, th { padding-right: 0.5rem; }
}
</style>
