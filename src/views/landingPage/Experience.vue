<template>
  <Section
    :class="'experience-section'"
    :header="'Experience'"
    :customStyle="smAndDown ? 'min-height: 1700px; background: rgb(var(--v-theme-primary))' : 'min-height: 1450px; background: rgb(var(--v-theme-primary))'" 
    :sectionId="'experience'"
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
      class="text-h5 text-overline mr-2 text-greyText"
      style="opacity: 0.5"
      :style="
        smAndDown ? 'font-size: 15px !important' : 'font-size: 16px !important'
      "
    >
      Years of Experience →
      <strong>{{ calculateYearsWithDecimal() }}</strong>
    </span>
    <v-timeline 
      align="start"
      side="end" 
      line-color="secondary" 
      class="mt-10"
      :line-inset="20"
      :line-thickness="smAndDown ? '0': '2'"
    >
      <v-timeline-item
        v-for="experience in experiences"
        :key="experience.id"
        dot-color="white"
        density="compact"
        :size="smAndDown ? 'small' : 'large'"
        :hide-dot="smAndDown"
        :hide-opposite="smAndDown"
      >
        <template v-slot:icon>
          <v-tooltip :text="`${experience.title} Web Page`">
            <template v-slot:activator="{ props }">
              <v-avatar
                v-bind="props"
                :image="experience.logoSrc"
                @click="openCompanyLink(experience.company_link)"
              />
            </template>
          </v-tooltip>
        </template>
        <div :class="smAndDown ? 'text-left' : 'text-justify'">
          <v-card 
            class="text-justify"
            color="primary"
            flat
          >
            <div class="d-flex justify-space-between align-center">
              <div class="text-left font-weight-bold text-white">
                {{ experience.title!.toUpperCase() }}
              </div>
              <span class="text-right font-weight-light text-greyText" style="opacity: 0.5">
                {{ experience.position!.toUpperCase() }}
              </span>
            </div>
            <div class="d-flex justify-space-between mb-2 text-greyText" style="font-size: 14px !important;">
              <div class="font-weight-light">
                {{ experience.date }}
              </div> 
              <div>
                <v-icon> mdi-map-marker </v-icon> {{ experience.location }}
              </div>
            </div>
            <span v-html="experience.description" class="font-weight-light text-greyText" />
            <ExperienceCard
              :selected-item="experience"
              @close="jobDialog = false"
            />
          </v-card>
        </div>
      </v-timeline-item>
    </v-timeline>
  </Section>
</template>

<script lang="ts" setup>
import ExperienceCard from '@/components/landingPage/ExperienceCard.vue'
import Section from '@/components/landingPage/Section.vue'
import { onMounted, Ref, ref } from 'vue'
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
import { getVal } from '@/services/DataService'
import { IExperience } from '@/types/other';

const experiences: Ref<IExperience[]> = ref([])
const jobDialog = ref(false)
const isDataLoaded: Ref<boolean> = ref(false)

const getData = async () => {
  await getVal('working-experience').then((fetchedData) => {
    if (fetchedData) {
      isDataLoaded.value = true
      const key = Object.keys(fetchedData)
      experiences.value = fetchedData[key[0]].reverse()
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error('Error fetching data from Firebase.')
    }
  })
}

const openCompanyLink = (link: string = '') => {
  window.open(link)
}

const calculateYearsWithDecimal = (startDate: Date = new Date('2019-10-01')): string => {
  const currentDate: Date = new Date()
  const monthsDiff: number =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth()

  const yearsWithDecimal: number = monthsDiff / 12
  return yearsWithDecimal.toFixed(2)
}

onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.mdi-close::before {
  color: white;
}
// .timeline-item:hover {
//   background-color: rgba(180, 180, 180, 0.1) !important;
// }

.experience-section {
  background: var(--v-theme-primary);
  color: white;
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 20%;
}

// @keyframes fade {
//   from {
//     opacity: 0
//   }
//   to {
//     opacity: 1
//   }
// }

@media screen and (max-width: 699px) {
  :deep(.v-timeline-item) .v-timeline-item__body {
    padding-left: 0px !important;
  }
}

@media screen and (min-width: 700px) {
  :deep(.v-timeline-item) .v-timeline-item__body {
    padding-left: 15px !important;
  }
}
</style>
