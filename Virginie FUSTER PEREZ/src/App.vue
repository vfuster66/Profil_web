<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MethodeSection from './components/MethodeSection.vue'
import ParcoursSection from './components/ParcoursSection.vue'
import ProjetsSection from './components/ProjetsSection.vue'
import CompetencesSection from './components/CompetencesSection.vue'
import FormationSection from './components/FormationSection.vue'
import ContactSection from './components/ContactSection.vue'
import CommandPalette from './components/CommandPalette.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <MethodeSection />
    <ParcoursSection />
    <ProjetsSection />
    <CompetencesSection />
    <FormationSection />
    <ContactSection />
  </main>
  <CommandPalette />
</template>
