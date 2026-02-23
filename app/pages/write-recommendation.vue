<template>
  <div style="background-color: rgb(var(--color-primary-rgb)); min-height: 100vh;">
    <BaseNavigation origin="configure" />
    <div class="max-w-2xl mx-auto px-4 pt-20 pb-10">
      <RecommendationEditor
        :selected-recommendation="selectedRecommendation"
        origin="write-recommendation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseNavigation from '~/components/base/BaseNavigation.vue'
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
