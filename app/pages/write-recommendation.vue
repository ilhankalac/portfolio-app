<template>
  <div class="v2">
    <V2Nav />
    <div class="max-w-2xl mx-auto px-4 pt-28 pb-10">
      <RecommendationEditor
        :selected-recommendation="selectedRecommendation"
        origin="write-recommendation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import V2Nav from '~/components/v2/V2Nav.vue'
import RecommendationEditor from '~/components/common/RecommendationEditor.vue'
import type { IColleagueInfo } from '~/types/models'

const selectedRecommendation = ref<IColleagueInfo>({
  fullName: '',
  role: '',
  avatarSrc: '',
  textHtml: '',
  githubLink: '',
  linkedinLink: '',
})
</script>
