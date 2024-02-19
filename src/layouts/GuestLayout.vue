<template>
  <NavBar />
  <Initial />
  <About />
  <Experience />
  <Recommendations />
	<Skills />
  <GetInTouch />
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';
import Initial from '@/views/Initial.vue';
import About from '@/views/About.vue';
import Experience from '@/views/Experience.vue';
import Recommendations from '@/views/Recommendations.vue';
import Skills from '@/views/Skills.vue';
import GetInTouch from '@/views/GetInTouch.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const currentComponent: any = ref('');

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        const url = sectionId === '#initial' ? '/' : `/${sectionId}`;
        window.history.pushState({}, '', url);
      }
    });
  }, {
    threshold: 0.25
  });

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
});
</script>