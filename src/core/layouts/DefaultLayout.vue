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
</script>