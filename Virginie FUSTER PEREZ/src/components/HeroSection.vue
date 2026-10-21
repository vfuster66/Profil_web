<script setup lang="ts">
import { accroche, identite } from '../data/profil'
import TestRunner from './TestRunner.vue'
import photo from '../assets/virginie.jpg'
</script>

<template>
  <section id="haut" class="hero">
    <div class="wrap grille">
      <div class="texte">
        <div class="identite">
          <img class="photo" :src="photo" width="337" height="421" alt="Portrait de Virginie Fuster Perez" />
          <p class="dispo"><span class="point" aria-hidden="true"></span>Développeuse QA chez UgoFresh</p>
        </div>
        <h1>{{ identite.nom }}</h1>
        <p class="titre">{{ identite.titre }}</p>
        <p v-for="(p, i) in accroche" :key="i" class="para">{{ p }}</p>
        <div class="actions">
          <a class="btn btn-pop" :href="identite.cv" download>Télécharger mon CV</a>
          <a class="btn btn-on-band" href="#contact">Me contacter</a>
        </div>
        <p class="astuce">Astuce : <kbd>Ctrl</kbd> + <kbd>K</kbd> pour naviguer au clavier.</p>
      </div>
      <TestRunner />
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: radial-gradient(50rem 28rem at 90% 0%, rgb(192 38 122 / 0.28), transparent 65%), linear-gradient(160deg, var(--violet-band) 0%, var(--violet-deep) 100%);
  color: var(--on-band); padding-block: clamp(3rem, 7vw, 5.5rem); }
.grille { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.identite { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.4rem; }
.photo { width: 4.5rem; height: 4.5rem; border-radius: 50%; object-fit: cover; object-position: center 20%; border: 3px solid #fff; box-shadow: 0 0 0 3px var(--pop); }
.dispo { display: inline-flex; align-items: center; gap: 0.5rem; font: 400 0.82rem/1 var(--font-mono); color: var(--on-band); background: rgb(255 255 255 / 0.1); border: 1px solid rgb(255 255 255 / 0.25); padding: 0.45rem 0.75rem; border-radius: 999px; }
.point { width: 8px; height: 8px; border-radius: 50%; background: #6ee7a8; box-shadow: 0 0 0 3px rgb(110 231 168 / 0.25); }
h1 { font-size: clamp(3rem, 7.5vw, 5.6rem); font-weight: 600; line-height: 0.92; letter-spacing: -0.01em; }
.titre { font: 500 clamp(1.35rem, 2.6vw, 1.75rem)/1.2 var(--font-display); color: #f7a8d3; margin: 0.9rem 0 1.4rem; }
.para { max-width: 58ch; margin-bottom: 0.85rem; color: var(--on-band-muted); }
.para:first-of-type { font-size: 1.18rem; color: var(--on-band); }
.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.6rem; }
.astuce { margin-top: 1.3rem; font-size: 0.88rem; color: var(--on-band-muted); }
@media (max-width: 960px) {
  .grille { grid-template-columns: 1fr; }
}
@media (hover: none) { .astuce { display: none; } }
</style>
