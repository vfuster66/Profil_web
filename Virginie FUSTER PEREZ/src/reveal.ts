import type { Directive } from 'vue'

// v-reveal : fait apparaître un bloc quand il arrive à l’écran.
// Un contrôle au défilement complète l’IntersectionObserver, pour ne jamais
// laisser un bloc invisible après un défilement très rapide ou un saut d’ancre.
const enAttente = new Set<HTMLElement>()
let ecoute = false
let prevu = false

function verifier() {
  prevu = false
  const bas = window.innerHeight
  for (const el of enAttente) {
    if (el.getBoundingClientRect().top < bas) {
      el.classList.add('visible')
      enAttente.delete(el)
    }
  }
}

function surDefilement() {
  if (!prevu) {
    prevu = true
    requestAnimationFrame(verifier)
  }
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add('reveal')
    enAttente.add(el)
    if (!ecoute) {
      ecoute = true
      window.addEventListener('scroll', surDefilement, { passive: true })
      window.addEventListener('resize', surDefilement, { passive: true })
    }
    requestAnimationFrame(verifier)
  },
  unmounted(el) {
    enAttente.delete(el)
  },
}
