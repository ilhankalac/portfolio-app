<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <NavBar />
    </v-app-bar>
    <v-main>
      <Initial />
      <About />
      <Experience />
      <Recommendations />
      <Skills />
      <GetInTouch />
      <Footer />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';
import Initial from '@/views/Initial.vue';
import About from '@/views/About.vue';
import Experience from '@/views/Experience.vue';
import Recommendations from '@/views/Recommendations.vue';
import Skills from '@/views/Skills.vue';
import GetInTouch from '@/views/GetInTouch.vue';
import Footer from '@/components/Footer.vue';
</script>