<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { projets } from '../data/profil'

// Visionneuse : ouvre un visuel en grand, se ferme avec Échap ou un clic à côté.
const ouvert = ref<{ src: string; alt: string; legende: string } | null>(null)
const fermer = ref<HTMLButtonElement | null>(null)
let retour: HTMLElement | null = null

async function ouvrir(v: { src: string; alt: string; legende: string }) {
  retour = document.activeElement as HTMLElement | null
  ouvert.value = v
  await nextTick()
  fermer.value?.focus()
}
function clore() {
  ouvert.value = null
  retour?.focus?.()
}
function clavier(e: KeyboardEvent) {
  if (e.key === 'Escape' && ouvert.value) clore()
}
onMounted(() => window.addEventListener('keydown', clavier))
onBeforeUnmount(() => window.removeEventListener('keydown', clavier))
</script>

<template>
  <section id="projets" class="section">
    <div class="wrap">
      <div class="section-head" v-reveal>
        <h2>Projets</h2>
        <p>Une sélection de ce que j’ai conçu et développé.</p>
      </div>
      <ul class="grille">
        <li v-for="p in projets" :key="p.nom" class="projet" v-reveal>
          <a :href="p.lien" target="_blank" rel="noopener" class="fenetre" :aria-label="'Ouvrir le site ' + p.nom">
            <div class="chrome" aria-hidden="true">
              <span class="pt"></span><span class="pt"></span><span class="pt"></span>
              <span class="url">{{ p.lien?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') }}</span>
            </div>
            <div class="ecran">
              <img v-if="p.image" :src="p.image" :alt="'Page d’accueil du site ' + p.nom" loading="lazy" width="1400" height="710" />
              <div v-else class="apercu" :style="{ background: p.apercu.fond, color: p.apercu.texte }" aria-hidden="true">
                <span class="ap-nom">{{ p.nom }}</span>
                <span class="ap-titre">{{ p.apercu.titre }}</span>
                <span class="ap-sous">{{ p.apercu.sousTitre }}</span>
              </div>
            </div>
          </a>
          <div class="infos">
            <div class="titre-ligne">
              <h3>{{ p.nom }}</h3>
              <div v-if="p.visuels?.length" class="vignettes">
                <button v-for="v in p.visuels" :key="v.src" type="button" class="vignette" :title="v.legende" @click="ouvrir(v)">
                  <img :src="v.src" alt="" loading="lazy" />
                  <span class="loupe" aria-hidden="true">+</span>
                  <span class="sr-only">Agrandir : {{ v.legende }}</span>
                </button>
              </div>
            </div>
            <p class="desc">{{ p.description }}</p>
            <p v-if="p.stack" class="stack">
              <span class="sr-only">Technologies : </span>
              <span v-for="t in p.stack" :key="t" class="tag">{{ t }}</span>
            </p>
            <details class="details">
              <summary>Détails techniques</summary>
              <ul>
                <li v-for="d in p.details" :key="d">{{ d }}</li>
              </ul>
            </details>
            <a v-if="p.lien" :href="p.lien" class="lien" target="_blank" rel="noopener">Voir le site</a>
          </div>
        </li>
      </ul>
    </div>

    <Transition name="visio">
      <div v-if="ouvert" class="visionneuse" role="dialog" aria-modal="true" :aria-label="ouvert.legende" @click.self="clore">
        <figure>
          <img :src="ouvert.src" :alt="ouvert.alt" />
          <figcaption>{{ ouvert.legende }}</figcaption>
        </figure>
        <button ref="fermer" type="button" class="fermer" @click="clore">Fermer <kbd>Échap</kbd></button>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.grille { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr)); gap: 2.5rem; }
.projet { display: grid; gap: 1.25rem; align-content: start; }

.fenetre {
  display: block; text-decoration: none; border-radius: 12px; overflow: hidden;
  border: 1px solid var(--line); background: var(--surface);
  box-shadow: 0 14px 34px -22px rgb(0 0 0 / 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.fenetre:hover { transform: translateY(-4px); box-shadow: 0 22px 40px -22px rgb(91 42 134 / 0.55); border-color: var(--accent); }
.chrome { display: flex; align-items: center; gap: 6px; padding: 0.55rem 0.8rem; background: var(--tint); border-bottom: 1px solid var(--line); }
.pt { width: 10px; height: 10px; border-radius: 50%; background: var(--line); }

.url { margin-left: 0.6rem; font-size: 0.85rem; color: var(--muted); background: var(--surface); padding: 0.15rem 0.7rem; border-radius: 999px; }

.ecran { position: relative; aspect-ratio: 1400 / 710; overflow: hidden; background: var(--tint); }
.ecran img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s ease; }
.fenetre:hover .ecran img { transform: scale(1.03); }
.apercu {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 0.5rem; padding: 8% 9%;
}
.ap-nom { font: 600 1rem/1 var(--font-display); letter-spacing: 0.05em; opacity: 0.8; }
.ap-titre { font: 700 clamp(1.8rem, 3.6vw, 2.7rem)/1 var(--font-display); max-width: 16ch; }
.ap-sous { font-size: 1rem; opacity: 0.85; }

.infos { display: grid; gap: 0.55rem; }
.titre-ligne { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.vignettes { display: flex; gap: 0.5rem; }
.vignette {
  position: relative; width: 4.2rem; height: 4.2rem; padding: 0; border-radius: 8px; overflow: hidden; cursor: zoom-in;
  border: 2px solid var(--surface); box-shadow: 0 0 0 1px var(--line), 0 6px 14px -8px rgb(0 0 0 / 0.4);
  background: var(--surface); transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.vignette:hover { transform: rotate(-3deg) scale(1.06); box-shadow: 0 0 0 2px var(--pop), 0 10px 20px -10px rgb(0 0 0 / 0.5); }
.vignette img { width: 100%; height: 100%; object-fit: cover; }
.loupe { position: absolute; right: 3px; bottom: 3px; width: 1.15rem; height: 1.15rem; border-radius: 50%; display: grid; place-items: center; background: var(--pop); color: #fff; font: 700 0.85rem/1 var(--font-body); }

.visionneuse {
  position: fixed; inset: 0; z-index: 60; background: rgb(20 10 32 / 0.82); backdrop-filter: blur(4px);
  display: grid; place-items: center; padding: calc(1rem + env(safe-area-inset-top, 0px)) 1rem calc(1rem + env(safe-area-inset-bottom, 0px));
}
.visionneuse figure { margin: 0; display: grid; gap: 0.75rem; justify-items: center; }
.visionneuse img { max-width: min(92vw, 44rem); max-height: 78vh; border-radius: 12px; box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.7); }
.visionneuse figcaption { color: #fff; font-size: 0.95rem; }
.fermer {
  position: absolute; top: calc(1rem + env(safe-area-inset-top, 0px)); right: 1rem;
  display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.9rem; border-radius: 999px;
  background: #fff; color: #1c1a18; border: 0; font: 600 0.9rem/1 var(--font-body); cursor: pointer;
}
.visio-enter-active, .visio-leave-active { transition: opacity 0.2s ease; }
.visio-enter-from, .visio-leave-to { opacity: 0; }
h3 { font-size: 1.7rem; font-weight: 600; }
.desc { max-width: 58ch; }
.stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag { font-size: 0.85rem; padding: 0.2rem 0.65rem; border-radius: 999px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); }
.details { border: 1px solid var(--line); border-radius: 10px; background: var(--surface); }
.details summary {
  cursor: pointer; list-style: none; padding: 0.7rem 0.95rem; font: 600 0.85rem/1 var(--font-mono); color: var(--muted);
  display: flex; align-items: center; gap: 0.6rem;
}
.details summary::-webkit-details-marker { display: none; }
.details summary::before { content: '+'; width: 1.2rem; height: 1.2rem; display: grid; place-items: center; border-radius: 4px; background: var(--accent); color: var(--on-accent); transition: transform 0.2s ease; }
.details[open] summary::before { content: '−'; }
.details summary:hover { color: var(--ink); }
.details ul { margin: 0; padding: 0 1rem 0.9rem 2.6rem; display: grid; gap: 0.35rem; font-size: 0.95rem; }
.details li::marker { color: var(--pop); }
.lien { font-weight: 700; width: fit-content; color: var(--accent); text-decoration-thickness: 1px; }

@media (prefers-reduced-motion: reduce) {
  .fenetre, .fenetre:hover, .ecran img, .fenetre:hover .ecran img, .vignette, .vignette:hover { transition: none; transform: none; }
}
</style>
