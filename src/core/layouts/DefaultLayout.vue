<template>
  <v-layout class="rounded rounded-md">
    <!-- <v-app-bar title="Application bar">
    </v-app-bar> -->
    <v-main>
      <NavBar />
      <Initial />
      <About />
      <Experience />
      <FreeTimeProjects />
      <Recommendations />
      <Skills />
      <GetInTouch />
      <Footer />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import NavBar from '@/core/components/base/BaseNavigation.vue'
import Initial from '@/features/portfolio/views/LandingView.vue'
import About from '@/features/portfolio/views/sections/AboutSection.vue'
import Experience from '@/features/portfolio/views/sections/ExperienceSection.vue'
import Recommendations from '@/features/portfolio/views/sections/RecommendationsSection.vue'
import Skills from '@/features/portfolio/views/sections/SkillsSection.vue'
import GetInTouch from '@/features/portfolio/views/sections/ContactSection.vue'
import Footer from '@/core/components/common/Footer.vue'
import FreeTimeProjects from '@/features/portfolio/views/sections/ProjectsSection.vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePageLoad } from '@/core/composables'

const route = useRoute()
const { initializeSections, allSectionsLoaded, reset } = usePageLoad()

// Initialize the sections we expect to load
const expectedSections = ['initial', 'about', 'experience', 'freetime-projects', 'recommendations', 'explore', 'get-in-touch']

onMounted(() => {
  // Initialize the expected sections
  initializeSections(expectedSections)

  // Watch for all sections to be loaded, then scroll to hash if present
  const unwatch = watch(allSectionsLoaded, (loaded) => {
    if (loaded && route.hash) {
      // All sections have loaded their data, now we can safely scroll
      const element = document.getElementById(route.hash.slice(1))
      if (element) {
        const top = element.offsetTop - 60 // 60px offset for navbar
        window.scrollTo({ top, behavior: 'smooth' })
      }
      // Stop watching after first successful scroll
      unwatch()
    }
  }, { immediate: true })
})
</script>