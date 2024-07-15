<template>
  <v-divider color="white" thickness="1" />
  <Section
    :class="'about-section'"
    :sectionId="'about'"
    header="About Me"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :textColor="'white'"
  > 
    <div class="font-weight-light text-justify">
      <div
        :class="smAndDown ? 'd-flex flex-column ga-5' : 'd-flex align-center ga-10'"
      >
        <div>
          <BasicInfo /> <br>
        </div>
        <v-divider :thickness="2" vertical color="white"/>
        <v-sheet style="background: linear-gradient(rgb(var(--v-theme-primary)));" class="text-greyText">
          <div v-html="aboutDescription" />
        </v-sheet>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import Section from '@/components/landingPage/Section.vue'
import BasicInfo from '@/components/landingPage/BasicInfo.vue'
import { getVal } from '@/services/DataService'
import { onMounted, Ref, ref } from 'vue'
const { smAndDown } = useDisplay()

const aboutDescription: Ref<string> = ref('')
onMounted(() => {
  getVal('about').then((val) => {
    if (val) {
      aboutDescription.value = val
    }
  })
})
</script>

<style  scoped>
/* .about-section {
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 50%;
} */

/* @keyframes fade {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
} */
</style>