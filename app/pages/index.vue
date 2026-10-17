<template>
  <div class="site">
    <SiteNav />
    <main>
      <HomeHero />
      <HomeStrengths :skills="skills ?? []" />
      <HomeProjects :projects="projects ?? []" />
      <HomeStory :description="aboutDescription ?? ''" />
      <HomeExperience :experiences="experiences ?? []" />
      <HomeRecommendations :recommendations="recommendations ?? []" />
      <HomeBeyond />
      <HomeContact />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/base/SiteNav.vue'
import HomeHero from '~/components/home/HomeHero.vue'
import HomeStrengths from '~/components/home/HomeStrengths.vue'
import HomeProjects from '~/components/home/HomeProjects.vue'
import HomeStory from '~/components/home/HomeStory.vue'
import HomeExperience from '~/components/home/HomeExperience.vue'
import HomeRecommendations from '~/components/home/HomeRecommendations.vue'
import HomeBeyond from '~/components/home/HomeBeyond.vue'
import HomeContact from '~/components/home/HomeContact.vue'
import SiteFooter from '~/components/base/SiteFooter.vue'
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

  const targets = document.querySelectorAll<HTMLElement>('.site-section .site-container > *')
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('site-reveal--in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )

  targets.forEach((el) => {
    el.classList.add('site-reveal')
    observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>
