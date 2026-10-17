<template>
  <div class="v2">
    <V2Nav />
    <main>
      <V2Hero />
      <V2Strengths :skills="skills ?? []" />
      <V2Projects :projects="projects ?? []" />
      <V2Story :description="aboutDescription ?? ''" />
      <V2Experience :experiences="experiences ?? []" />
      <V2Recommendations :recommendations="recommendations ?? []" />
      <V2Beyond />
      <V2Contact />
    </main>
    <V2Footer />
  </div>
</template>

<script setup lang="ts">
import V2Nav from '~/components/v2/V2Nav.vue'
import V2Hero from '~/components/v2/V2Hero.vue'
import V2Strengths from '~/components/v2/V2Strengths.vue'
import V2Projects from '~/components/v2/V2Projects.vue'
import V2Story from '~/components/v2/V2Story.vue'
import V2Experience from '~/components/v2/V2Experience.vue'
import V2Recommendations from '~/components/v2/V2Recommendations.vue'
import V2Beyond from '~/components/v2/V2Beyond.vue'
import V2Contact from '~/components/v2/V2Contact.vue'
import V2Footer from '~/components/v2/V2Footer.vue'
import type { IExperience, ISkill, IFreeProject, IColleagueInfo } from '~/types/models'

useHead({
  title: 'Ilhan Kalač',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ilhan Kalač',
        url: 'https://ilhan.io',
        jobTitle: 'Software Engineer',
        description: 'Software engineer building multilingual web products with Nuxt, Vue, TypeScript and ASP.NET Core.',
        sameAs: [],
      }),
    },
  ],
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

// Fade each block in as it scrolls into view. Classes are added only after
// mount, so server-rendered content is never hidden if JS is slow or off.
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const targets = document.querySelectorAll<HTMLElement>('.v2-section .v2-container > *')
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('v2-reveal--in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )

  targets.forEach((el) => {
    el.classList.add('v2-reveal')
    observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>
