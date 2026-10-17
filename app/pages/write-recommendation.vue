<template>
  <div class="site">
    <SiteNav />
    <div class="max-w-2xl mx-auto px-4 pt-28 pb-10">
      <RecommendationEditor
        :selected-recommendation="selectedRecommendation"
        origin="write-recommendation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SiteNav from '~/components/base/SiteNav.vue'
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
