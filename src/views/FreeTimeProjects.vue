<template>
  <Section
    :id="'freetime-projects'"
    :header="'Freetime Projects'"
    :customStyle="'background: rgb(var(--v-theme-secondary)); min-height: 33vh'"
    :textColor="'white'"
    :colsNumber="12"
  >
    <div v-for="(project, index) in projects" :key="index" class="mb-10">
      <v-card outlined color="secondary" elevation="0">
        <v-card-title
          class="text-overline ma-0 pa-0"
          :class="{
            'text-center': smAndDown,
            'text-left': !smAndDown,
            'text-right': index % 2 === 1
          }"
          :style="
            smAndDown
              ? 'font-size: 14px !important'
              : 'font-size: 16px !important'
          "
        >
          <v-icon left>{{ project.icon }}</v-icon>
          <span class="ml-2">{{ project.title }}</span>
        </v-card-title>
        <v-card-subtitle
          :class="{
            'text-center mb-2': smAndDown,
            'text-left': !smAndDown,
            'text-right': index % 2 === 1
          }"
        >
          Date of creation: {{ project.dateOfCreation }}
        </v-card-subtitle>
        <div
          class="d-flex justify-space-between text-justify ga-6 align-center"
          :class="{
            'flex-column flex-column-reverse': smAndDown,
            'flex-row': !smAndDown,
            'flex-row-reverse': index % 2 === 1
          }"
        >
          <div class="font-weight-light" v-html="project.description" />
           
          <img
            :src="project.image"
            alt="Project Image"
            class="fixed-size-image"
            :style="smAndDown ? 'width: 400px' : 'width: 450px'"
          />
        </div>
        <v-card-actions
          class="d-flex justify-space-between pa-4"
          :class="{
            'flex-column ga-3': smAndDown,
            'flex-row': !smAndDown,
            'flex-row-reverse': index % 2 === 1
          }"
        >
          <div class="text-white">
            <template v-for="tech in project.technologies" :key="tech.id">
              <v-chip label link size="small" class="my-1 mr-1">
                <v-icon start :icon="`mdi-${tech.icon}`"></v-icon>
                {{ tech.name }}
              </v-chip>
            </template>
          </div>
          <div class="d-flex ga-2">
            <v-btn class="text-none" @click="openLink(project.source_code)">
              Code
              <v-icon class="ml-2">mdi-github</v-icon>
            </v-btn>
            <v-btn class="text-none" @click="openLink(project.live_demo)">
              Live Demo
              <v-icon class="mr-1 ml-2">mdi-open-in-new</v-icon>
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

const projects = [
  {
    title: "Covid-19 Statistic tracker for my hometown",
    description:
      "<p> I made a straightforward app with Angular and Firebase that shows COVID-19 stats for my hometown. It was a quick and easy way to stay updated on the pandemic situation locally during the Covid-19 pandemic.<br /> <br /> To complement this, I developed a <a href='https://github.com/ilhankalac/covid-19-scraper' alt='Scraper' style='color: grey;' target='_blank'>web scraper</a> using the Puppeteer library to fetch data from ijzcg.me since it doesn't have an API for this purpose, to achieve this I created a <a href='https://github.com/ilhankalac/covid-19-scraper/blob/main/.github/workflows/integrated.yml' alt='Scraper' style='color: grey;' target='_blank'>YML script</a> that runs daily at a specific time to automate the scraping of data from ijzcg.me. </p>",
    icon: "mdi-virus",
    image: "https://i.ibb.co/s6BzzcF/Screenshot-from-2024-02-24-19-32-56.png",
    technologies: [
      { id: 1, icon: "angular", name: "Angular" },
      { id: 2, icon: "firebase", name: "Firebase" },
      { id: 3, icon: "code-tags", name: "Puppeteer" },
      { id: 4, icon: "code-tags", name: "YML" },
    ],
    source_code: "https://github.com/ilhankalac/covid-19-rozaje",
    live_demo: "https://covid-19-rozaje.web.app/",
    dateOfCreation: "January 2021.",
  },
];

const openLink = (link: string) => {
  window.open(link, "_blank");
};
</script>

<style scoped>
.fixed-size-image {
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
}
</style>
