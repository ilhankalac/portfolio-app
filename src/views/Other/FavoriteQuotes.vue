<template>
  <div class="px-2">
    <div class="font-weight-light text-white" :class="smAndDown ? 'text-h6' : 'text-h5'">
      The list of my favorite quotes
    </div>
    <div class="font-weight-light text-white" style="opacity: 0.6">
      I maintain a collection of my favorite quotes, arranged by the emotional impact they evoke upon reflection.
    </div>
    <div
      v-for="quote in quotes"
      class="text-justify font-weight-light text-white"
    >
      <blockquote
        class="otro-blockquote font-weight-light mb-8 mt-4"
        :style="
          smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'
        "
      >
        <div v-html="quote.text"></div>
        <div class="d-flex justify-space-between align-center">
          <div class="pa-0 mt-5 d-flex align-center">
            <v-avatar size="30" color="white">
              <v-img :src="quote.imageSrc" alt="avatar" />
            </v-avatar>
            <div class="d-flex flex-column ml-3 text-white">
              <div class="text-white">{{ quote.author }}</div>
            </div>
          </div>
          <div class="d-flex ga-1 mt-3 text-white">
            <!-- <v-btn
              v-if="recommendation.githubLink"
              flat
              variant="text"
              icon="mdi-github"
              @click="openLink(recommendation.githubLink)"
            /> -->
          </div>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/landingPage/Section.vue";
import { onMounted, Ref, ref } from "vue";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";
import { useRouter } from "vue-router";


const quotes: Ref<any> = ref([]);
const isDataLoaded = ref(false);

const getData = async () => {
  await getVal("blog/favorite-quotes").then((fetchedData) => {
    if (fetchedData) {
      let result: any = [];
      Object.keys(fetchedData).forEach((key, index) => {
        result.push(fetchedData[key]);
      });
      quotes.value = result;
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


onMounted(async () => {
  await getData();
});
</script>


<style lang="scss" scoped>
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
