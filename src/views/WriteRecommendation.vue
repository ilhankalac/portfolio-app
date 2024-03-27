<template>
  <div class="text-white text-center">
    <EditRecommendation :selectedRecommendation="selectedRecommendation" />
  </div>
</template>

<script lang="ts" setup>
import EditRecommendation from "@/components/EditRecommendation.vue";
import { IColleagueInfo } from "@/types/other";
import { ref } from 'vue';

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