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
import Section from "@/components/landingPage/Section.vue";
import { getVal } from "@/services/DataService";
import { onMounted, ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const projects: any = ref([]);

const openLink = (link: string) => {
  window.open(link, "_blank");
};

onMounted(() => {
    getVal('free-time-projects').then((val) => {
    if (val) {
      Object.keys(val).forEach((key) => {
        projects.value.push({ ...val[key], key });
      });
    }
  });
});
</script>

<style scoped>
.content-item {
  flex: 1;
}
</style>
