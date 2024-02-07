<template>
  <Section
    :header="'Experience'"
    :customStyle="'min-height: 100vh;'"
    :sectionId="'section3'"
  >
    <v-row v-if="!isDataLoaded" class="d-flex flex-column ga-3">
      <v-col>
        <v-skeleton-loader
          color="primary"
          class="mx-auto mb-10"
          type="heading"
          :min-width="smAndDown ? '100px' : '700px'"
        >
        </v-skeleton-loader>
        <v-skeleton-loader
          v-for="index in 5"
          color="primary"
          class="mx-auto border"
          type="list-item-three-line"
          :min-width="smAndDown ? '100px' : '700px'"
        />
      </v-col>
    </v-row>

    <span
      class="text-h5 text-overline mr-2 mb-4"
      style="opacity: 0.5"
      :style="
        smAndDown ? 'font-size: 15px !important' : 'font-size: 16px !important'
      "
    >
      Years of Experience →
      <strong>{{ calculateYearsWithDecimal() }}</strong>
    </span>
    <v-timeline side="end" line-color="secondary">
      <v-timeline-item
        v-for="experience in experiences"
        :key="experience.id"
        dot-color="white"
        size="large"
        density="compact"
        line-inset="15"
      >
        <template v-slot:icon>
          <v-tooltip :text="`${experience.title} Web Page`">
            <template v-slot:activator="{ props }">
              <v-avatar
                v-bind="props"
                :image="experience.logoSrc"
                @click="openCompanyLink(experience.company_link)"
                style="cursor: pointer"
              />
            </template>
          </v-tooltip>
        </template>
        <div
          class="timeline-item pa-3 rounded"
          :class="smAndDown ? 'text-left' : 'text-justify'"
          style="cursor: pointer"
          @click="openDialog(experience)"
        >
          <div class="d-flex justify-space-between align-center">
            <div class="text-h6 font-weight-light">
              {{ experience.title }}
            </div>
            <span class="text-overline font-weight-light" style="opacity: 0.5">
              {{ experience.position }}
            </span>
          </div>
          <div class="text-subtitle-1 font-weight-light" style="opacity: 0.5">
            {{ experience.date }}
          </div>
          <span class="font-weight-light">
            {{ experience.description }}
          </span>
        </div>
      </v-timeline-item>
    </v-timeline>
  </Section>
  <v-dialog v-model="jobDialog" max-width="700">
    <ExperienceCard
      :selected-item="selectedExperience"
      @close="jobDialog = false"
    />
  </v-dialog>
</template>

<script lang="ts" setup>
import BasicInfo from "@/components/BasicInfo.vue";
import ExperienceCard from "@/components/ExperienceCard.vue";
import Section from "@/components/Section.vue";
import { IExperience } from "@/types";
import { onMounted, ref, Ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";

const experiences = ref([]);
const jobDialog = ref(false);
const selectedExperience = ref<IExperience | null>(null);
const isDataLoaded = ref(false);

const openDialog = (experience: IExperience) => {
  jobDialog.value = true;
  selectedExperience.value = experience;
};

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      isDataLoaded.value = true;
      const key = Object.keys(fetchedData);
      experiences.value = fetchedData[key[0]].reverse();
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openCompanyLink = (link: string) => {
  window.open(link);
};

const calculateYearsWithDecimal = (
  startDate: Date = new Date("2019-10-01")
): string => {
  const currentDate: Date = new Date();
  const monthsDiff: number =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth();

  const yearsWithDecimal: number = monthsDiff / 12;

  return yearsWithDecimal.toFixed(2);
};

onMounted(async () => {
  await getData();
});
</script>

<style lang="scss" scoped>
.mdi-close::before {
  color: white;
}
.timeline-item:hover {
  background-color: rgba(180, 180, 180, 0.1) !important;
}
</style>
