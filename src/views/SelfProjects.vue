<template>
  <Section
    :header="'Freetime Projects'"
    :customStyle="'background: rgb(var(--v-theme-secondary)); min-height: 33vh'"
    :textColor="'white'"
    :colsNumber="12"
  >
    <div>
      <v-card outlined color="primary" class="pa-2">
        <v-card-title 
          class="text-overline"
          :style="
            smAndDown ? 'font-size: 15px !important' : 'font-size: 16px !important'
          "
        >
          <v-icon left>mdi-virus</v-icon>
          <span class="ml-2">Covid-19 Statistic tracker for my hometown</span>
        </v-card-title>
        <div 
          class="d-flex justify-space-between pa-4 text-justify ga-14"
          :class="smAndDown ? 'flex-column flex-column-reverse' : 'flex-row'"
        >
          <div class="font-weight-light">
            I made a straightforward app with Angular and Firebase that shows COVID-19 stats for my hometown. It was a quick and easy way to stay updated on the pandemic situation locally during the Covid-19 pandemic. <br /> <br /> To complement this, I developed a web scraper using the Puppeteer library to fetch data from ijzcg.me since it doesn't have an API for this purpose, to achieve this I created a YAML script that runs daily at a specific time to automate the scraping of data from ijzcg.me.
          </div>
          <div style="width: 1000px; height: 200px; overflow: hidden;">
            <img src="https://i.ibb.co/s6BzzcF/Screenshot-from-2024-02-24-19-32-56.png" alt="" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
        <v-card-actions 
          class="d-flex justify-space-between pa-4"
          :class="smAndDown ? 'flex-column ga-3' : 'flex-row'"
        >
          <div class="text-white">
            <template v-for="tech in technologies" :key="tech.id" color="secondary" class="">
              <v-chip label  link size="small" class="my-1 mr-1">
                <v-icon start :icon="`mdi-${tech.icon}`"></v-icon>
                {{ tech.name }}
              </v-chip>
            </template>
          </div>
          <div class="d-flex ga-2">
            <div>
              <v-btn class="text-none"> 
                Live Demo
                <v-icon class="mr-1">mdi-open-in-new</v-icon> 
              </v-btn>
            </div>
            <v-btn
              class="text-none"
              variant="text"
            >
              Source code
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/Section.vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const technologies = [
  { id: 1, name: "Angular", icon: "angular" },
  { id: 2, name: "Firebase", icon: "firebase" },
  { id: 3, name: "Puppeteer", icon: "code-tags" },
  { id: 4, name: "YAML", icon: "code-tags" },
];
</script>
