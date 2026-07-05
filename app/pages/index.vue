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

useHead({
  title: pageTitle,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ilhan Kalač',
        url: 'https://ilhan.io',
        jobTitle: 'Software Engineer',
        description: 'Software Engineer specializing in web development.',
        sameAs: [],
      }),
    },
  ],
})

onMounted(() => {
  const sections = Array.from(document.querySelectorAll('section[id]')).filter(
    (s) => s.id in sectionTitles
  ) as HTMLElement[]

  const updateTitle = () => {
    const offset = 100
    let currentId = 'initial'

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) {
        currentId = section.id
      }
    }

    activeSection.value = currentId
  }

  window.addEventListener('scroll', updateTitle, { passive: true })
  updateTitle()

  onUnmounted(() => window.removeEventListener('scroll', updateTitle))
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
