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
import NavBar from '@/components/NavBar.vue';
import Initial from '@/views/landingPage/Initial.vue';
import About from '@/views/landingPage/About.vue';
import Experience from '@/views/landingPage/Experience.vue';
import Recommendations from '@/views/landingPage/Recommendations.vue';
import Skills from '@/views/landingPage/Skills.vue';
import GetInTouch from '@/views/landingPage/GetInTouch.vue';
import Footer from '@/components/Footer.vue';
import FreeTimeProjects from '@/views/landingPage/FreeTimeProjects.vue';
</script>