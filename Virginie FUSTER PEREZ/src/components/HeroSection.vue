<script setup lang="ts">
import { accroche, departs, identite } from '../data/profil'
import DepartureBoard from './DepartureBoard.vue'
import photo from '../assets/virginie.jpg'
</script>

<template>
  <section id="haut" class="hero">
    <div class="wrap">
      <div class="intro">
        <div class="texte">
          <h1>{{ identite.nom }}</h1>
          <p class="titre">{{ identite.titre }}</p>
          <p v-for="(p, i) in accroche" :key="i" class="para">{{ p }}</p>
          <div class="actions">
            <a class="btn btn-primary" :href="identite.cv" download>Télécharger mon CV</a>
            <a class="btn btn-ghost" href="#contact">Me contacter</a>
          </div>
        </div>
        <img class="photo" :src="photo" width="337" height="421" alt="Portrait de Virginie Fuster Perez" />
      </div>
      <DepartureBoard :departs="departs" />
    </div>
  </section>
</template>

<style scoped>
.hero { padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(3rem, 7vw, 5rem); }
.intro {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1.5rem, 4vw, 3.5rem); align-items: end;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}
h1 { font-size: clamp(3.2rem, 9vw, 6.5rem); font-weight: 700; line-height: 0.92; letter-spacing: -0.01em; }
.titre { font: 500 clamp(1.35rem, 2.6vw, 1.75rem)/1.2 var(--font-display); color: var(--accent); margin: 0.9rem 0 1.5rem; }
.para { max-width: 60ch; margin-bottom: 0.9rem; }
.para:first-of-type { font-size: 1.2rem; }
.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.6rem; }
.photo {
  width: clamp(11rem, 22vw, 17rem); height: auto; aspect-ratio: 337 / 421; object-fit: cover;
  border-radius: 10px;
}
@media (max-width: 760px) {
  .intro { grid-template-columns: 1fr; }
  .photo { order: -1; width: 9rem; }
}
</style>
