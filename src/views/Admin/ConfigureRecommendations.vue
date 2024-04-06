<template>
  <div class="card-container ma-2">
    <template v-for="(recommendation, key, index) in recommendations" :key="index">
      <v-card 
        class="card ma-2" 
        color="secondary" 
        style="border: 1px solid #000;"
        @click="openDialog(recommendation, key)"
      >
        <v-card-title>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="font-weight-light">{{ recommendation.fullName }}</p>
              <p class="text-subtitle-1 font-weight-light">{{ recommendation.role }}</p>
            </div>
            <v-avatar size="50" color="white">
              <v-img :src="recommendation.avatarSrc" alt="avatar" />
            </v-avatar>
          </div>
        </v-card-title>
      </v-card>
      <div class="card ma-2" v-if="index === Object.keys(recommendations).length - 1 && Object.keys(recommendations).length % 2 === 1" />
    </template>
  </div>
  <v-dialog v-model="editRecommendationDialog" max-width="800" height="90vh">
    <EditRecommendation 
      :selectedRecommendation="selectedRecommendation" 
      :selectedRecommendationIndex="selectedRecommendationIndex"
      :origin="'configure'"
      @close="editRecommendationDialog = false"
    />
  </v-dialog>
</template>

<script lang="ts" setup>
import { getVal } from "@/services/DataService";
import { IColleagueInfo } from "@/types/other";
import { onMounted, ref, Ref } from "vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import EditRecommendation from "@/components/EditRecommendation.vue";

const recommendations: Ref<IColleagueInfo[]> = ref([]);
const isDataLoaded = ref(false);
const editRecommendationDialog = ref(false);
const selectedRecommendation = ref<IColleagueInfo>({
  fullName: "",
  role: "",
  avatarSrc: "",
  textHtml: "",
  githubLink: "",
  linkedinLink: "",
});
const selectedRecommendationIndex = ref(0);

const getData = async () => {
  await getVal("recommendations").then((fetchedData) => {
    if (fetchedData) {
      recommendations.value = fetchedData;
      isDataLoaded.value = true;
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openDialog = (element: any, key:any) => {
  selectedRecommendation.value = element;
  selectedRecommendationIndex.value = key;
  editRecommendationDialog.value = true;
};

onMounted(async () => {
  await getData();
});
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  flex: 1 0 47%;
  margin: 1rem;
  border-radius: 5px;
}
</style>