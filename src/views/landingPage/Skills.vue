<template>
  <Section
    class="skills-section"
    :header="'My skills'"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :sectionId="'explore'"
    :textColor="'white'"
  >
    <div class="text-center text-white">
      <template v-for="skill in skills" :key="skill.id" color="primary">
        <v-chip label class="ma-2 text-greyText" link :size="smAndDown ? 'default' : 'large'">
          <v-icon start :icon="`mdi-${skill.icon}`"></v-icon>
          {{ skill.name }}
        </v-chip>
      </template>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/landingPage/Section.vue";
import { useDisplay } from "vuetify";
import { onMounted, Ref, ref } from "vue";
import { getVal } from "@/services/DataService";
import { ISkill } from "@/types/other";

const { smAndDown } = useDisplay();
const skills: Ref<ISkill[]> = ref([]);

onMounted(() => {
  getVal('skills').then((val) => {
    if (val) {
      skills.value = val;
    }
  });
});
</script>

<style lang="scss" scoped>
// .skills-section {
//   animation: fade linear both;
//   animation-timeline: view();
//   animation-range: entry 15%;
// }

// @keyframes fade {
//   from {
//     opacity: 0
//   }
//   to {
//     opacity: 1
//   }
// }
</style>
