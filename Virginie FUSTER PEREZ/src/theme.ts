import { ref } from 'vue'

// Thème clair / sombre partagé entre l’en-tête et la palette de commandes.
export const sombre = ref(false)

function appliquer(valeur: boolean) {
  sombre.value = valeur
  document.documentElement.dataset.theme = valeur ? 'dark' : 'light'
}

export function basculerTheme() {
  appliquer(!sombre.value)
  try { localStorage.setItem('theme', sombre.value ? 'dark' : 'light') } catch { /* stockage indisponible */ }
}

export function initTheme() {
  let enregistre: string | null = null
  try { enregistre = localStorage.getItem('theme') } catch { /* stockage indisponible */ }
  if (enregistre) appliquer(enregistre === 'dark')
  else sombre.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const paletteOuverte = ref(false)
