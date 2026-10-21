<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { identite } from '../data/profil'
import { basculerTheme, paletteOuverte } from '../theme'

interface Commande { label: string; groupe: string; action: () => void }

const recherche = ref('')
const index = ref(0)
const champ = ref<HTMLInputElement | null>(null)
const message = ref('')
let retourFocus: HTMLElement | null = null

const aller = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const commandes: Commande[] = [
  { label: 'Aller à la méthode', groupe: 'Navigation', action: aller('methode') },
  { label: 'Aller au parcours', groupe: 'Navigation', action: aller('parcours') },
  { label: 'Aller aux projets', groupe: 'Navigation', action: aller('projets') },
  { label: 'Aller aux compétences', groupe: 'Navigation', action: aller('competences') },
  { label: 'Aller à la formation', groupe: 'Navigation', action: aller('formation') },
  { label: 'Aller au contact', groupe: 'Navigation', action: aller('contact') },
  {
    label: 'Télécharger le CV', groupe: 'Actions',
    action: () => { const a = document.createElement('a'); a.href = identite.cv; a.download = ''; a.click() },
  },
  {
    label: 'Copier l’adresse e-mail', groupe: 'Actions',
    action: () => { navigator.clipboard?.writeText(identite.email).then(() => afficher('Adresse e-mail copiée')).catch(() => afficher(identite.email)) },
  },
  { label: 'Changer de thème', groupe: 'Actions', action: basculerTheme },
  { label: 'Ouvrir LinkedIn', groupe: 'Liens', action: () => window.open(identite.linkedin, '_blank', 'noopener') },
  { label: 'Ouvrir GitHub', groupe: 'Liens', action: () => window.open(identite.github, '_blank', 'noopener') },
]

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const filtrees = computed(() => commandes.filter((c) => norm(c.label).includes(norm(recherche.value))))

function afficher(t: string) {
  message.value = t
  window.setTimeout(() => (message.value = ''), 2200)
}

function executer(c: Commande | undefined) {
  if (!c) return
  paletteOuverte.value = false
  c.action()
}

function clavierGlobal(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOuverte.value = !paletteOuverte.value
  } else if (e.key === 'Escape' && paletteOuverte.value) {
    paletteOuverte.value = false
  }
}

function clavierListe(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') { e.preventDefault(); index.value = (index.value + 1) % Math.max(filtrees.value.length, 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); index.value = (index.value - 1 + filtrees.value.length) % Math.max(filtrees.value.length, 1) }
  else if (e.key === 'Enter') { e.preventDefault(); executer(filtrees.value[index.value]) }
}

watch(recherche, () => (index.value = 0))
watch(paletteOuverte, async (ouverte) => {
  if (ouverte) {
    retourFocus = document.activeElement as HTMLElement | null
    recherche.value = ''
    index.value = 0
    await nextTick()
    champ.value?.focus()
  } else {
    retourFocus?.focus?.()
  }
})

onMounted(() => window.addEventListener('keydown', clavierGlobal))
onBeforeUnmount(() => window.removeEventListener('keydown', clavierGlobal))
</script>

<template>
  <Transition name="palette">
    <div v-if="paletteOuverte" class="fond" @click.self="paletteOuverte = false">
      <div class="palette" role="dialog" aria-modal="true" aria-label="Palette de commandes">
        <div class="saisie">
          <span class="prompt" aria-hidden="true">›</span>
          <input
            ref="champ"
            v-model="recherche"
            type="text"
            placeholder="Tapez une commande…"
            role="combobox"
            aria-expanded="true"
            aria-controls="liste-commandes"
            :aria-activedescendant="filtrees.length ? 'cmd-' + index : undefined"
            autocomplete="off"
            spellcheck="false"
            @keydown="clavierListe"
          />
          <kbd>Échap</kbd>
        </div>
        <ul id="liste-commandes" role="listbox">
          <li
            v-for="(c, i) in filtrees"
            :id="'cmd-' + i"
            :key="c.label"
            role="option"
            :aria-selected="i === index"
            :class="{ actif: i === index }"
            @mouseenter="index = i"
            @click="executer(c)"
          >
            <span>{{ c.label }}</span><span class="groupe">{{ c.groupe }}</span>
          </li>
          <li v-if="!filtrees.length" class="aucun">Aucune commande pour « {{ recherche }} ».</li>
        </ul>
        <p class="aide"><kbd>↑</kbd> <kbd>↓</kbd> pour choisir, <kbd>Entrée</kbd> pour valider</p>
      </div>
    </div>
  </Transition>
  <p v-if="message" class="toast" role="status">{{ message }}</p>
</template>

<style scoped>
.fond { position: fixed; inset: 0; z-index: 50; background: rgb(30 28 26 / 0.35); backdrop-filter: blur(3px); display: grid; justify-items: center; align-items: start; padding: 14vh 1rem 1rem; }
.palette { width: min(100%, 34rem); background: var(--surface); border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.4); overflow: hidden; }
.saisie { display: flex; align-items: center; gap: 0.6rem; padding: 0.9rem 1rem; border-bottom: 1px solid var(--line); }
.prompt { font: 600 1.1rem/1 var(--font-mono); color: var(--accent); }
.saisie input { flex: 1; border: 0; background: transparent; font: 400 1rem/1.4 var(--font-mono); color: var(--ink); outline: none; }
ul { list-style: none; margin: 0; padding: 0.4rem; max-height: 50vh; overflow-y: auto; }
li { display: flex; justify-content: space-between; gap: 1rem; padding: 0.65rem 0.75rem; border-radius: 8px; cursor: pointer; }
li.actif { background: var(--accent-soft); color: var(--ink); }
.groupe { font: 400 0.78rem/1.6 var(--font-mono); color: var(--muted); }
.aucun { color: var(--muted); cursor: default; }
.aide { padding: 0.6rem 1rem; border-top: 1px solid var(--line); font-size: 0.8rem; color: var(--muted); }
.toast { position: fixed; bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px)); left: 50%; transform: translateX(-50%); z-index: 60; background: var(--term); color: var(--term-text); font: 400 0.85rem/1 var(--font-mono); padding: 0.8rem 1.1rem; border-radius: 8px; }
.palette-enter-active, .palette-leave-active { transition: opacity 0.15s ease; }
.palette-enter-from, .palette-leave-to { opacity: 0; }
</style>
