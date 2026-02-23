<template>
  <div>
    <BaseNavigation />
    <LandingSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <RecommendationsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import BaseNavigation from '~/components/base/BaseNavigation.vue'
import LandingSection from '~/components/portfolio/sections/LandingSection.vue'
import AboutSection from '~/components/portfolio/sections/AboutSection.vue'
import ExperienceSection from '~/components/portfolio/sections/ExperienceSection.vue'
import ProjectsSection from '~/components/portfolio/sections/ProjectsSection.vue'
import SkillsSection from '~/components/portfolio/sections/SkillsSection.vue'
import RecommendationsSection from '~/components/portfolio/sections/RecommendationsSection.vue'
import ContactSection from '~/components/portfolio/sections/ContactSection.vue'
import Footer from '~/components/common/Footer.vue'
</script>
