<template>
  <Section
    :id="'freetime-projects'"
    :header="'Freetime Projects'"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :textColor="'white'"
    :colsNumber="12"
  >
    <div v-for="(project, index) in projects" :key="index">
      <v-card outlined color="primary" elevation="0" class="mt-2">
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
          <v-icon class="mb-1">{{ project.icon }}</v-icon>
          <span class="ml-2">{{ project.title }}</span>
        </v-card-title>
        <v-card-subtitle
          class="font-weight-light text-greyText pa-0"
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
          <div class="font-weight-light text-greyText" style="flex: 1;" v-html="project.description" />
          
          <div style="flex: 1;">
            <img
              :src="project.image"
              alt="Project Image"
              class="content-item"
              style="border-radius: 5px; width: 100%; height: auto;"
            />
          </div>
        </div>
        <v-card-actions
          class="d-flex justify-space-between ma-0 pa-0 pt-2"
          :class="{
            'flex-column ga-3': smAndDown,
            'flex-row': !smAndDown,
            'flex-row-reverse': index % 2 === 1 && !smAndDown
          }"
        >
          <div class="text-white">
            <template v-for="tech in project.technologies" :key="tech.id">
              <v-chip label link size="small" class="my-1 mr-1 text-greyText">
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
      </v-card><br>
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
    title: "Personal Portfolio",
    description:
      `<p>I've built my personal portfolio with Vue 3 and Vuetify, aiming to show my technical skills and capabilities through the application itself. Utilizing the Vuetify library, I've ensured a responsive and accessible design that highlights my expertise in web development. </p> <br>
      <p>  Within my portfolio, I've integrated my personal achievements, such as a blog featuring my favorite quotes and reflections on films I've watched. </p> <br>
      <p>  My intention is to progressively integrate all my life achievements into this app, creating a dynamic archive of my journey. </p> <br>
      <p>  The portfolio is hosted on Firebase, providing a secure and reliable environment for my personal projects. </p>`,
    icon: "mdi-code-tags",
    image: "https://i.ibb.co/K05P98m/Screenshot-from-2024-03-03-14-59-39.png",
    technologies: [
      { id: 1, icon: "vuejs", name: "Vue.js" },
      { id: 2, icon: "vuetify", name: "Vuetify" },
      { id: 3, icon: "firebase", name: "Firebase" }
    ],
    source_code: "",
    live_demo: "https://ilhankalac.com/",
    dateOfCreation: "January 2024.",
  },
  {
    title: 'Trash points for my hometown',
    description: `<p> I've collaborated with  <a href='https://www.facebook.com/ocistimorozaje' alt='Scraper' style='color: white;' target='_blank'>local ecological volunteers</a> to develop an app where they can upload trash data and display it on a map for users to see online. </p> <br>
    <p> I developed the frontend of the app using Vue 3, taking advantage of its reactivity and component-based structure. </p> <br>
    <p>Firebase powers the backend of the app, providing features such as Firestore for database storage and Authentication for user management. </p>
    <p>The interactive maps in the app are created using Leaflet, a lightweight JavaScript library known for its ease of use and extensive plugin support.</p>`,
    icon: "mdi-trash-can",
    image: "https://i.ibb.co/tZzdHZf/Screenshot-from-2024-03-02-18-59-29.png",
    technologies: [
      { id: 1, icon: "vuejs", name: "Vue.js" },
      { id: 2, icon: "firebase", name: "Firebase" },
      { id: 3, icon: "code-tags", name: "Leaflet" }
    ],
    source_code: "https://github.com/ilhankalac/rozaje-trash-points",
    live_demo: "https://prod-rozaje-trash-points.web.app/",
    dateOfCreation: "August 2021.",
  },
  {
    title: "Covid-19 Statistic tracker for my hometown",
    description:
      "<p> I made a straightforward app with Angular and Firebase that shows COVID-19 stats for my hometown. It was a quick and easy way to stay updated on the pandemic situation locally during the Covid-19 pandemic.<br /> <br /> To complement this, I developed a <a href='https://github.com/ilhankalac/covid-19-scraper' alt='Scraper' style='color: white;' target='_blank'>web scraper</a> using the Puppeteer library to fetch data from ijzcg.me since it doesn't have an API for this purpose, to achieve this I created a <a href='https://github.com/ilhankalac/covid-19-scraper/blob/main/.github/workflows/integrated.yml' alt='Scraper' style='color: white;' target='_blank'>YML script</a> that runs daily at a specific time to automate the scraping of data from ijzcg.me. </p>",
    icon: "mdi-virus",
    image: "https://i.ibb.co/dsTPST3/Screenshot-from-2024-03-01-21-31-07.png",
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
.content-item {
  flex: 1;
}
</style>
