<template>
  <v-divider thickness="2" />
  <v-container 
    id="section4"
    class="pa-10 pt-5 ma-0 d-flex"
    fluid
    style="background-color: rgb(var(--v-theme-secondary));"
  >
    <v-row class="d-flex justify-center ">
      <v-col 
        :cols="smAndDown ? 12 : 9"
        :class="{ 'pa-5': smAndDown }"
        class="d-flex flex-column align-center ga-4"
      >
        <p 
          class="text-center text-overline pb-2" 
          :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
        > 
          My Skills 
        </p>
        <v-row class="d-flex justify-center">
          <v-sheet
            v-for="skill in skills"
            :key="skill.id"
            color="secondary"
          >

              <v-chip
                label
                class="ma-2"
                link
                :size="smAndDown ? 'default' : 'large'"
              >
                <v-icon start :icon="`mdi-${skill.icon}`"></v-icon>
                {{ skill.name }}
              </v-chip>
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();

import { ref } from 'vue';
const skills = ref([
  {
    id: 1,
    name: 'Vue.js',
    icon: 'vuejs'
  },
  {
    id: 2,
    name: 'TypeScript',
    icon: 'language-typescript'
  },
  {
    id: 3,
    name: 'JavaScript',
    icon: 'language-javascript'
  },
  {
    id: 4,
    name: 'HTML5',
    icon: 'language-html5'
  },
  {
    id: 5,
    name: 'CSS3',
    icon: 'language-css3'
  },
  {
    id: 6,
    name: 'Vuetify',
    icon: 'vuetify'
  },
  {
    id: 7,
    name: 'Firebase',
    icon: 'firebase'
  },
  {
    id: 8,
    name: 'C Sharp',
    icon: 'language-csharp'
  },
  {
    id: 10,
    name: 'SQL',
    icon: 'database'
  },
  {
    id: 11,
    name: 'Git',
    icon: 'git'
  },
  {
    id: 12,
    name: 'Linux/Bash scripting',
    icon: 'linux'
  },
  {
    id: 13,
    name: 'Photoshop',
    icon: 'image'
  },
  {
    id: 14,
    name: 'Video Editing',
    icon: 'video'
  },
  {
    id: 15,
    name: 'UI/UX Design',
    icon: 'palette'
  },
  {
    id: 16,
    name: 'Social Media Marketing',
    icon: 'instagram'
  }

]);
</script>

<style lang="scss" scoped>
</style>