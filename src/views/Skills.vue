<template>
  <v-divider thickness="2" />
  <Section
    :header="'My skills'"
    :customStyle="'background-color: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :sectionId="'section4'"
  >
    <div class="text-center">
      <template v-for="skill in skills" :key="skill.id" color="secondary">
        <v-chip label class="ma-2" link :size="smAndDown ? 'default' : 'large'">
          <v-icon start :icon="`mdi-${skill.icon}`"></v-icon>
          {{ skill.name }}
        </v-chip>
      </template>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/Section.vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

import { ref } from "vue";
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

<style lang="scss" scoped></style>
