<script setup lang="ts">
import { identite } from '../data/profil'
const tel = identite.telephone.replace(/\s/g, '')
</script>

<template>
  <section id="contact" class="section contact">
    <div class="wrap">
      <h2>Contact</h2>
      <p class="intro">Un poste en QA, un projet web ou une question sur ProxyGirl’s : écrivez-moi.</p>
      <a class="email" :href="'mailto:' + identite.email">{{ identite.email }}</a>
      <ul class="autres">
        <li><a :href="identite.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a :href="identite.github" target="_blank" rel="noopener">GitHub</a></li>
        <li><a :href="'tel:' + tel">{{ identite.telephone }}</a></li>
        <li>{{ identite.ville }}</li>
      </ul>
    </div>
    <footer class="wrap pied">© {{ new Date().getFullYear() }} {{ identite.nom }}</footer>
  </section>
</template>

<style scoped>
.contact { padding-bottom: 2rem; }
.intro { color: var(--muted); margin: 0.75rem 0 1.5rem; }
.email {
  display: inline-block; font: 700 clamp(1.6rem, 5vw, 3.25rem)/1.1 var(--font-display);
  text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 0.15em;
  overflow-wrap: anywhere;
}
.autres { list-style: none; margin: 1.75rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.75rem 2rem; }
.pied { margin-top: clamp(3rem, 8vw, 5rem); padding-top: 1.25rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.9rem; }
</style>
