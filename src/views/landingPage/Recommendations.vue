<template>
  <Section
    :sectionId="'recommendations'"
    :class="'recommendations-section'"
    header="Recommendations"
    :textColor="'white'"
    :customStyle="'min-height: 1000px; background: rgb(var(--v-theme-primary));'"
  >
    <v-row v-if="!isDataLoaded" class="d-flex flex-column ga-3">
      <v-col>
        <v-skeleton-loader
          v-for="index in 5"
          color="primary"
          class="mx-auto border ma-2"
          type="card"
          :min-width="smAndDown ? '100px' : '700px'"
        />
      </v-col>
    </v-row>
    <div
      v-for="recommendation in recommendations"
      class="text-justify font-weight-light text-white"
    >
      <blockquote class="otro-blockquote font-weight-light mb-8 mt-4" :style="smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'">
        <div v-html="recommendation.textHtml"></div>
        <div class="d-flex justify-space-between align-center">
          <div class="pa-0 mt-5 d-flex align-center">
            <v-avatar size="60" color="white">
              <v-img :src="recommendation.avatarSrc" alt="avatar" />
            </v-avatar>
            <div class="d-flex flex-column ml-3 text-white">
              <div>{{ recommendation.fullName }}</div>
              <div class="text-white">{{ recommendation.role }}</div>
            </div>
          </div>
          <div class="d-flex ga-1 mt-3 text-white">
            <v-btn
              v-if="recommendation.githubLink"
              flat
              variant="text"
              icon="mdi-github"
              @click="openLink(recommendation.githubLink)"
            />
            <v-btn
              v-if="recommendation.linkedinLink"
              flat
              variant="text"
              icon="mdi-linkedin"
              @click="openLink(recommendation.linkedinLink)"
            />
            <v-btn
              v-if="recommendation.instagramLink"
              flat
              variant="text"
              icon="mdi-instagram"
              @click="openLink(recommendation.instagramLink)"
            />
          </div>
        </div>
      </blockquote>
    </div>
    <div class="text-greyText font-weight-light" style="font-size: smaller;">
      <p>Feel free to share your recommendation if you've collaborated with me by clicking <strong class="font-weight-bold" style="text-decoration: underline; cursor: pointer; " @click="openWriteRecommendation">on this link</strong>.</p>
      <p>Note: It will be displayed here after the admin approves it.</p>
    </div>
  </Section>
</template>
<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/landingPage/Section.vue";
import { onMounted, Ref, ref } from "vue";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";
import { useRouter } from "vue-router";

const router = useRouter();

const recommendations: Ref<IColleagueInfo[]> = ref([]);
const isDataLoaded = ref(false);

const getData = async () => {
  await getVal("recommendations").then((fetchedData) => {
    if (fetchedData) {
      recommendations.value = fetchedData.filter((recommendation: IColleagueInfo) => recommendation.showPublic);
      isDataLoaded.value = true;
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openLink = (link: string) => {
  window.open(link);
};

const openWriteRecommendation = () => {
  router.push({ name: "WriteRecommendation" });
};

onMounted(async () => {
  await getData();
});
</script>

<style lang="scss" scoped>
// .recommendations-section {
//   animation: fade linear both;
//   animation-timeline: view();
//   animation-range: entry 10% cover 50%;
// }

// @keyframes fade {
//   from {
//     opacity: 0
//   }
//   to {
//     opacity: 1
//   }
// }

.otro-blockquote span{
  display:block;
  color: white;
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
  color: rgb(var(--v-theme-greyText));
  border-left: 4px solid rgb(var(--v-theme-greyText));
  line-height:1.6;
  position: relative;
  background: rgb(var(--v-theme-primary));
}
</style>
