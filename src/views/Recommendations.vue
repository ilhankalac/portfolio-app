<template>
  <Section
    :sectionId="'#recommendations'"
    :class="'recommendations-section'"
    header="Recommendations"
    :textColor="'white'"
  >
    <div
      v-for="recommendation in recommendations"
      class="text-justify font-weight-light text-white"
    >
      <blockquote class="otro-blockquote font-weight-light mb-8 mt-4" :style="smAndDown ? 'padding:1.2em 30px 1.2em 38px;' : 'padding:1.2em 30px 1.2em 75px;'">
        <div v-html="recommendation.textHtml"></div>
        <div class="d-flex justify-space-between align-center">
          <div class="pa-0 mt-5 d-flex align-center">
            <v-avatar size="60" color="white">
              <v-img :src="recommendation.avatarSrc" alt="avatar" />
            </v-avatar>
            <div class="d-flex flex-column ml-3">
              <div>{{ recommendation.fullName }}</div>
              <div style="opacity: 0.5">{{ recommendation.role }}</div>
            </div>
          </div>
          <div class="d-flex ga-1 mt-3">
            <v-btn
              flat
              variant="text"
              icon="mdi-github"
              @click="openLink(recommendation.githubLink)"
            />
            <v-btn
              flat
              variant="text"
              icon="mdi-linkedin"
              @click="openLink(recommendation.linkedinLink)"
            />
          </div>
        </div>
      </blockquote>
    </div>
  </Section>
</template>
<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/Section.vue";
import { onMounted, Ref, ref } from "vue";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";

const recommendations: Ref<IColleagueInfo[]> = ref([]);

const getData = async () => {
  await getVal("recommendations").then((fetchedData) => {
    if (fetchedData) {
      recommendations.value = fetchedData;
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openLink = (link: string) => {
  window.open(link);
};

onMounted(async () => {
  await getData();
});
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

.otro-blockquote span{
  display:block;
  color:white;
  font-style: italic;
  font-weight: bold;
  margin-top:1em;
}


.otro-blockquote::before{
  font-family:Arial;
  content: "\201C";
  color:white;
  font-size:4em;
  position: absolute;
  left: 10px;
  top:-10px;
}

.otro-blockquote{
  color: white;
  border-left:4px solid white ;
  line-height:1.6;
  position: relative;
  background: rgb(var(--v-theme-primary));
}
</style>
