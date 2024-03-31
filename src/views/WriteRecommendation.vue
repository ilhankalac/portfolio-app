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
import NavBar from "@/components/NavBar.vue";
import EditRecommendation from "@/components/EditRecommendation.vue";
import { IColleagueInfo } from "@/types/other";
import { ref } from 'vue';
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const selectedRecommendation = ref<IColleagueInfo>({
  fullName: "",
  role: "",
  avatarSrc: "",
  textHtml: "",
  githubLink: "",
  linkedinLink: "",
});
</script>

<style scoped lang="scss">

</style>