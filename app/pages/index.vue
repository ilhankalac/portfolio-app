<template>
  <div>
    <BaseNavigation />
    <LandingSection />
    <AboutSection :description="aboutDescription" :skills="skills ?? []" />
    <ExperienceSection :experiences="experiences" />
    <ProjectsSection :projects="projects" />

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

import RecommendationsSection from '~/components/portfolio/sections/RecommendationsSection.vue'
import ContactSection from '~/components/portfolio/sections/ContactSection.vue'
import Footer from '~/components/common/Footer.vue'
import type { IExperience, ISkill, IFreeProject, IColleagueInfo } from '~/types/models'

const sectionTitles: Record<string, string> = {
  'initial': 'Ilhan Kalač',
  'about': 'About Me — Ilhan Kalač',
  'experience': 'Experience — Ilhan Kalač',
  'freetime-projects': 'Projects — Ilhan Kalač',
  'recommendations': 'Recommendations — Ilhan Kalač',
  'get-in-touch': 'Contact — Ilhan Kalač',
}

const activeSection = ref('initial')
const pageTitle = computed(() => sectionTitles[activeSection.value] || 'Ilhan Kalač')

useHead({ title: pageTitle })

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id && id in sectionTitles) {
            activeSection.value = id
          }
        }
      })
    },
    { threshold: 0.3 }
  )

  document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))

  onUnmounted(() => observer.disconnect())
})

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
