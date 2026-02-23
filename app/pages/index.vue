<template>
  <div>
    <BaseNavigation />
    <LandingSection />
    <AboutSection :description="aboutDescription" />
    <ExperienceSection :experiences="experiences" />
    <ProjectsSection :projects="projects" />
    <SkillsSection :skills="skills" />
    <RecommendationsSection :recommendations="recommendations" />
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
import type { IExperience, ISkill, IFreeProject, IColleagueInfo } from '~/types/models'

const [
  { data: aboutDescription },
  { data: experiences },
  { data: projects },
  { data: skills },
  { data: recommendations },
] = await Promise.all([
  useFetch<string>('/api/portfolio/about'),
  useFetch<IExperience[]>('/api/portfolio/experiences', { default: () => [] }),
  useFetch<IFreeProject[]>('/api/portfolio/projects', { default: () => [] }),
  useFetch<ISkill[]>('/api/portfolio/skills', { default: () => [] }),
  useFetch<IColleagueInfo[]>('/api/portfolio/recommendations', { default: () => [] }),
])
</script>
