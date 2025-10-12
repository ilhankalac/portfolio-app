<template>
  <NavBar :origin="'configure'"/><br><br>
  <v-container>
    <v-row style="height: 100vh;" class="d-flex justify-center align-center"> 
      <v-col
         :cols="smAndDown ? 12 : 6"
      >
        <EditRecommendation 
          :selectedRecommendation="selectedRecommendation"
          :origin="'write-recommendation'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import NavBar from '@/core/components/base/BaseNavigation.vue'
import EditRecommendation from '@/features/recommendations/components/RecommendationEditor.vue'
import { IColleagueInfo } from '@/core/types/models'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()

const selectedRecommendation = ref<IColleagueInfo>({
  fullName: '',
  role: '',
  avatarSrc: '',
  textHtml: '',
  githubLink: '',
  linkedinLink: '',
})
</script>