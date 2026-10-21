<script setup lang="ts">
import { identite } from '../data/profil'
const tel = identite.telephone.replace(/\s/g, '')
</script>

<template>
  <section id="contact" class="contact">
    <div class="wrap">
      <div class="billet" v-reveal>
        <div class="principal">
          <p class="etiquette">Carte d’embarquement</p>
          <h2>Contact</h2>
          <p class="intro">Un poste en QA, un projet web ou une question sur ProxyGirl’s : écrivez-moi.</p>
          <a class="email" :href="'mailto:' + identite.email">{{ identite.email }}</a>
        </div>
        <div class="talon">
          <dl>
            <div><dt>Départ</dt><dd>{{ identite.ville }}</dd></div>
            <div><dt>Téléphone</dt><dd><a :href="'tel:' + tel">{{ identite.telephone }}</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a :href="identite.linkedin" target="_blank" rel="noopener">virginie-fuster-perez</a></dd></div>
            <div><dt>GitHub</dt><dd><a :href="identite.github" target="_blank" rel="noopener">vfuster66</a></dd></div>
          </dl>
        </div>
      </div>
    </div>
    <footer class="wrap pied">© {{ new Date().getFullYear() }} {{ identite.nom }}</footer>
  </section>
</template>

<style scoped>
.contact {
  background: linear-gradient(160deg, var(--violet-band) 0%, var(--violet-deep) 100%); color: var(--on-band); padding-block: clamp(4rem, 9vw, 7rem) 1.5rem;
}
.billet {
  display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  background: var(--surface); color: var(--ink); border-radius: 16px; overflow: hidden;
  border: 1px solid var(--line); box-shadow: 0 20px 44px -30px rgb(0 0 0 / 0.35);
}
.principal { padding: clamp(1.75rem, 4vw, 3rem); }
.etiquette { font: 600 1.05rem/1 var(--font-display); color: var(--pop); margin-bottom: 0.6rem; letter-spacing: 0.03em; }
h2 { font-size: clamp(2.4rem, 5.5vw, 3.6rem); font-weight: 600; }
.intro { color: var(--muted); margin: 0.8rem 0 1.6rem; }
.email {
  display: inline-block; font: 600 clamp(1.5rem, 4.6vw, 2.7rem)/1.1 var(--font-display);
  text-decoration-color: var(--pop); text-decoration-thickness: 3px; text-underline-offset: 0.15em;
  overflow-wrap: anywhere;
}
.talon {
  position: relative; padding: clamp(1.75rem, 4vw, 3rem); background: var(--accent-soft);
  border-left: 2px dashed var(--line);
}
.talon::before, .talon::after {
  content: ''; position: absolute; left: -15px; width: 28px; height: 28px; border-radius: 50%;
  background: var(--violet-band); border: 0;
}
.talon::before { top: -15px; } .talon::after { bottom: -15px; background: var(--violet-deep); }
dl { margin: 0; display: grid; gap: 1rem; }
dt { font: 500 0.95rem/1 var(--font-display); letter-spacing: 0.04em; color: var(--muted); }
dd { margin: 0.25rem 0 0; font-weight: 700; overflow-wrap: anywhere; }
.pied { margin-top: clamp(3rem, 7vw, 4.5rem); padding-top: 1.25rem; border-top: 1px solid rgb(255 255 255 / 0.18); color: var(--on-band-muted); font-size: 0.9rem; }

@media (max-width: 760px) {
  .billet { grid-template-columns: 1fr; }
  .talon { border-left: 0; border-top: 2px dashed var(--line); }
  .talon::before, .talon::after { top: -15px; left: auto; }
  .talon::before { left: -15px; } .talon::after { right: -15px; bottom: auto; }
}
</style>
