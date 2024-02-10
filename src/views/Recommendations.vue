<template>
  <Section
    :sectionId="'section4'"
    :class="'recommendations-section'"
    header="Recommendations"
    :customStyle="'background-color: rgb(var(--v-theme-secondary)); min-height: 33vh;'"
    :textColor="'white'"
  >
  <div
    v-for="recommendation in recommendations"
    class="text-justify font-weight-light ma-auto text-white" 
  >
    <span class="text-h2">&#x201F;</span> 
    <p>{{ recommendation.text }}</p>
    <v-card-actions>
      <v-avatar size="60">
        <v-img src="@/assets/omar_profile.jpg" alt="avatar" />
      </v-avatar>
      <v-card-title class="text-overline font-weight-light"> 
        <span> {{ recommendation.fullName }} </span> -
        <span style="opacity: 0.7">{{ recommendation.role }}</span>
      </v-card-title> 
    </v-card-actions>
    <v-divider />
  </div>
  </Section>
</template>

<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/Section.vue";
import { Ref, ref } from "vue";
const { smAndDown } = useDisplay();

const recommendations: Ref<IColleagueInfo[]> = ref([{
    id: 1,
    text: "Ilhan is a standout talent in frontend development, with a deep understanding of Vue.js and TypeScript. His ability to craft intuitive and responsive web applications sets him apart as a top-tier engineer in our field. Beyond his technical expertise, Ilhan's approachable nature and collaborative spirit make him a joy to work with. He brings creativity and innovation to every project, making him an invaluable asset to any frontend team.",
    fullName: "Omar Đečević",
    role: "Backend Developer"
},
  {
    id: 2,
    text: "Ilhan is a standout talent in frontend development, with a deep understanding of Vue.js and TypeScript. His ability to craft intuitive and responsive web applications sets him apart as a top-tier engineer in our field. Beyond his technical expertise, Ilhan's approachable nature and collaborative spirit make him a joy to work with. He brings creativity and innovation to every project, making him an invaluable asset to any frontend team.",
    fullName: "Omar Đečević",
    role: "Backend Developer"
  },
])
  
</script>

<style lang="scss" scoped>
.recommendations-section {
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 50%;
}

@keyframes fade {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
</style>
