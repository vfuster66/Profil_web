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
const survol = ref<number | null>(null)
const heure = ref('')
let timer: number | undefined
let horloge: number | undefined

const arrivee = props.departs.map((_, r) =>
  colonnes.map((col, c) =>
    Array.from({ length: largeurs[col] }, (_, i) => r * 2 + c * 3 + Math.floor(i * 0.5) + Math.floor(Math.random() * 5)),
  ),
)
const dernierTick = Math.max(...arrivee.flat(2))

const pad = (t: string, n: number) => t.toUpperCase().padEnd(n, ' ').slice(0, n).split('')

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

function majHeure() {
  heure.value = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(new Date())
}

function aller(cible: string) {
  const el = document.getElementById(cible)
  if (!el) return
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  el.classList.remove('signale')
  void el.offsetWidth
  el.classList.add('signale')
}

onMounted(() => {
  majHeure()
  horloge = window.setInterval(majHeure, 15000)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

onBeforeUnmount(() => {
  window.clearInterval(timer)
  window.clearInterval(horloge)
})
</script>

<template>
  <figure class="board">
    <figcaption class="board-head">
      <div>
        <span class="board-name">Départs</span>
        <span class="board-sub">Mon parcours, du plus récent au plus ancien. Touchez une ligne pour le détail.</span>
      </div>
      <span class="horloge" aria-label="Heure à Perpignan">PGF {{ heure }}</span>
    </figcaption>

    <table>
      <thead>
        <tr>
          <th scope="col" class="col-annee">Année</th>
          <th scope="col" class="col-poste">Poste</th>
          <th scope="col" class="col-lieu">Lieu</th>
          <th scope="col" class="col-statut">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ligne, r) in lignes"
          :key="r"
          :class="{ actif: departs[r].statut === 'EN VOL', survol: survol === r }"
          @mouseenter="survol = r"
          @mouseleave="survol = null"
          @click="aller(departs[r].cible)"
        >
          <td v-for="(cellule, c) in ligne" :key="c" :class="'col-' + colonnes[c]">
            <a
              v-if="colonnes[c] === 'poste'"
              :href="'#' + departs[r].cible"
              class="ligne-lien"
              @click.prevent.stop="aller(departs[r].cible)"
            >
              <span class="sr-only">{{ departs[r].annee }}, {{ departs[r].poste }}, {{ departs[r].lieu }}, {{ departs[r].statut }}</span>
              <span class="flaps" aria-hidden="true"><span v-for="(l, i) in cellule" :key="i" class="flap">{{ l }}</span></span>
            </a>
            <span v-else class="flaps" aria-hidden="true">
              <span v-for="(l, i) in cellule" :key="i" class="flap">{{ l }}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>

<style scoped>
/* Le tableau se dimensionne sur sa propre largeur (container queries) :
   la taille des palettes est calculée pour que chaque ligne tienne, sans défilement. */
.board {
  container-type: inline-size;
  margin: 0; background: var(--board); color: var(--board-text);
  border-radius: 12px; padding: clamp(0.85rem, 2.5vw, 1.75rem);
  box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.35);
}
.board-head {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;
  margin-bottom: 1rem; padding-bottom: 0.85rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.12);
}
.board-head > div { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.25rem 1rem; }
.board-name { font: 600 2rem/1 var(--font-display); color: var(--board-text); }
.board-sub { font-size: 0.95rem; color: var(--board-muted); }
.horloge { font: 600 1.35rem/1 var(--font-display); color: var(--board-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }

/* Largeur : 41 palettes + 37 espaces de 2px + 3 colonnes de 1rem */
table {
  --gap: 2px;
  --col: 1rem;
  --t: min(1.45rem, calc((100cqi - 37 * var(--gap) - 3 * var(--col)) / 41));
  border-collapse: separate; border-spacing: 0 0.35rem; width: 100%;
}
th { text-align: left; font: 500 0.95rem/1 var(--font-display); color: var(--board-muted); padding: 0 var(--col) 0.35rem 0; letter-spacing: 0.04em; }
td { padding: 0 var(--col) 0 0; white-space: nowrap; }
td:last-child, th:last-child { padding-right: 0; }

tbody tr { cursor: pointer; position: relative; }
.ligne-lien { color: inherit; text-decoration: none; display: inline-block; }
.ligne-lien:focus-visible { outline-offset: 4px; }

.flaps { display: inline-flex; gap: var(--gap); }
.flap {
  position: relative; display: inline-grid; place-items: center;
  width: var(--t); height: calc(var(--t) * 1.36);
  font: 500 calc(var(--t) * 0.8)/1 var(--font-display);
  background: var(--board-cell); border-radius: 2px;
  transition: background-color 0.15s ease;
}
.flap::after { content: ''; position: absolute; inset: 50% 0 auto; height: 1px; background: rgb(0 0 0 / 0.35); }

.actif .flap { color: var(--board-ok); }
.survol .flap { background: var(--board-hover); }

/* Tableau étroit : chaque départ sur deux lignes, toutes les colonnes visibles.
   Ligne 1 : année (4) + poste (19) = 23 palettes. */
@container (max-width: 640px) {
  table {
    --gap: 1px;
    --col: 0.45rem;
    --t: min(1.2rem, calc((100cqi - 21 * var(--gap) - var(--col)) / 23));
    display: block;
  }
  thead { display: none; }
  tbody { display: block; }
  tbody tr {
    display: grid; grid-template-columns: auto auto 1fr; column-gap: var(--col); row-gap: 3px;
    padding-block: 0.45rem; border-bottom: 1px solid rgb(255 255 255 / 0.06);
  }
  td { padding: 0; display: block; }
  .col-annee { grid-column: 1; grid-row: 1 / span 2; }
  .col-poste { grid-column: 2 / span 2; grid-row: 1; }
  .col-lieu { grid-column: 2; grid-row: 2; }
  .col-statut { grid-column: 3; grid-row: 2; }
}
/* Très petit écran : trois lignes (année + statut, poste, lieu), 19 palettes max par ligne. */
@container (max-width: 440px) {
  table { --t: min(1.2rem, calc((100cqi - 18 * var(--gap)) / 19)); }
  tbody tr { grid-template-columns: auto 1fr; }
  .col-annee { grid-column: 1; grid-row: 1; }
  .col-statut { grid-column: 2; grid-row: 1; justify-self: end; }
  .col-poste { grid-column: 1 / -1; grid-row: 2; }
  .col-lieu { grid-column: 1 / -1; grid-row: 3; }
  .board-name { font-size: 1.6rem; }
  .board-sub { font-size: 0.82rem; }
  .horloge { font-size: 1.1rem; }
}
</style>
