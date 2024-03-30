<template>
  <div class="card-container ma-2">
    <template v-for="(recommendation, key) in recommendations" :key="index">
      <v-card class="card ma-2" color="secondary" @click="openDialog(recommendation, key)">
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
    </template>
  </div>
  <v-dialog v-model="editRecommendationDialog" max-width="800">
    <EditRecommendation 
      :selectedRecommendation="selectedRecommendation" 
      :selectedRecommendationIndex="selectedRecommendationIndex"
      :origin="'configure'"
      @close="editRecommendationDialog = false"
    />
  </v-dialog>
</template>

<script lang="ts" setup>
import { getVal, setVal } from "@/services/DataService";
import { IColleagueInfo } from "@/types/other";
import { onMounted, ref, Ref } from "vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDisplay } from "vuetify";
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
  box-sizing: border-box;
  flex: 1 0 300px;
  margin: 1rem;
  border: 1px solid #000;
  border-radius: 5px;
}
</style>