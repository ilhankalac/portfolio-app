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
// import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
// import router from '@/router';

// const currentComponent: any = ref('');

// const updateURL = () => {
//   // Determine which component is currently in view based on scroll position
//   // Update the URL accordingly (e.g., router.push(`/page/${currentComponent.value}`))
//   if(currentComponent.value)
//     router.push({ hash: currentComponent.value });

// };



// onMounted(() => {
//   // Detect scroll events and update URL
//   window.addEventListener('scroll', updateURL);

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         currentComponent.value = entry.target.getAttribute('id');
//       }
//     });
//   }, {
//     threshold: 0.25
//   });

//   document.querySelectorAll('section').forEach((section) => {
//     observer.observe(section);
//   });
// });

// onBeforeUnmount(() => {
//   window.removeEventListener('scroll', updateURL);
// });
</script>