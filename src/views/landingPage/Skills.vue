<template>
  <Section
    class="skills-section"
    :header="'My skills'"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :sectionId="'explore'"
    :textColor="'white'"
  >
    <div class="text-center text-white">
      <template v-for="skill in skills" :key="skill.id" color="primary">
        <v-chip label class="ma-2 text-greyText" link :size="smAndDown ? 'default' : 'large'">
          <v-icon start :icon="`mdi-${skill.icon}`"></v-icon>
          {{ skill.name }}
        </v-chip>
      </template>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/landingPage/Section.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";

const { smAndDown } = useDisplay();
const skills = ref([
  {
    id: 1,
    name: "Vue.js",
    icon: "vuejs",
  },
  {
    id: 2,
    name: "TypeScript",
    icon: "language-typescript",
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "language-javascript",
  },
  {
    id: 4,
    name: "HTML5",
    icon: "language-html5",
  },
  {
    id: 5,
    name: "CSS3",
    icon: "language-css3",
  },
  {
    id: 6,
    name: "Vuetify",
    icon: "vuetify",
  },
  {
    id: 7,
    name: "Firebase",
    icon: "firebase",
  },
  {
    id: 8,
    name: "C Sharp",
    icon: "language-csharp",
  },
  {
    id: 10,
    name: "SQL",
    icon: "database",
  },
  {
    id: 11,
    name: "Git",
    icon: "git",
  },
  {
    id: 12,
    name: "Linux/Bash scripting",
    icon: "linux",
  },
  {
    id: 13,
    name: "Photoshop",
    icon: "image",
  },
  {
    id: 14,
    name: "Video Editing",
    icon: "video",
  },
  {
    id: 15,
    name: "UI/UX Design",
    icon: "palette",
  },
  {
    id: 16,
    name: "Social Media Marketing",
    icon: "instagram",
  },
]);
</script>

<style lang="scss" scoped>
// .skills-section {
//   animation: fade linear both;
//   animation-timeline: view();
//   animation-range: entry 15%;
// }

// @keyframes fade {
//   from {
//     opacity: 0
//   }
//   to {
//     opacity: 1
//   }
// }
</style>
