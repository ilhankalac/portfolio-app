<template>
  <NavBar />
  <Initial />
  <About />
  <Experience />
  <Recommendations />
	<Skills />
  <GetInTouch />
  <Footer />
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
</script>