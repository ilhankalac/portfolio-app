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
            <div>
              <v-avatar size="50" color="white">
                <v-img :src="recommendation.avatarSrc" alt="avatar" />
              </v-avatar>
              <v-b></v-b>
              <v-btn
                color="error"
                class="ml-2"
                variant="plain"
                @click.stop="deleteRecommendation(recommendation, key)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </div>
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
import { deleteVal, getVal } from "@/core/services/firebase.service"
import { IColleagueInfo } from "@/core/types/models"
import { nextTick, onMounted, ref, Ref } from "vue"
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import EditRecommendation from "@/features/recommendations/components/RecommendationEditor.vue"

const recommendations: Ref<IColleagueInfo[]> = ref([])
const isDataLoaded = ref(false)
const editRecommendationDialog = ref(false)
const selectedRecommendation = ref<IColleagueInfo>({
  fullName: "",
  role: "",
  avatarSrc: "",
  textHtml: "",
  githubLink: "",
  linkedinLink: "",
})
const selectedRecommendationIndex = ref(0)

const getData = async () => {
  await getVal("recommendations").then((fetchedData) => {
    if (fetchedData) {
      recommendations.value = fetchedData
      isDataLoaded.value = true
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.")
    }
  })
}

const openDialog = async (element: any, key:any) => {
  editRecommendationDialog.value = true
  await nextTick()
  selectedRecommendationIndex.value = key
  selectedRecommendation.value = element
}

const deleteRecommendation = (recommendation: IColleagueInfo, key: string | number) => {
  if (confirm("Are you sure you want to delete this recommendation?")) {
    deleteVal(`recommendations/${key}`)
      .then(() => {
        recommendations.value = Array.isArray(recommendations.value) ? recommendations.value : Object.values(recommendations.value);
        recommendations.value = recommendations.value.filter((element) => element !== recommendation);
        console.log('Recommendation deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting recommendation:', error);
      });
  }
}

onMounted(async () => {
  await getData()
})
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