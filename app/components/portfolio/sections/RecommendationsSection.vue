<template>
  <SectionWrapper
    sectionId="recommendations"
    class="recommendations-section"
    header="Recommendations"
    textColor="white"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
  >
    <div class="flex flex-col gap-8">
      <div
        v-for="recommendation in recommendations"
        :key="recommendation.fullName"
        class="recommendation-item"
      >
        <div class="relative pl-6 border-l-2 border-white/20">
          <div class="absolute -left-[10px] top-0 text-3xl text-white/40 font-serif leading-none">&ldquo;</div>
          <div class="text-white/80 font-light leading-relaxed text-sm recommendation-text" v-html="recommendation.textHtml" />
        </div>

        <div class="flex justify-between items-center mt-4 pl-6">
          <div class="flex items-center gap-3">
            <img
              :src="recommendation.avatarSrc"
              :alt="recommendation.fullName"
              class="w-12 h-12 rounded-full object-cover bg-white/10 border border-white/20"
            />
            <div>
              <div class="text-white font-medium text-sm">{{ recommendation.fullName }}</div>
              <div class="text-white/50 text-xs">{{ recommendation.role }}</div>
            </div>
          </div>
          <div class="flex gap-1">
            <button v-if="recommendation.githubLink" class="p-2 hover:bg-white/10 rounded-lg transition-colors" @click="openLink(recommendation.githubLink)">
              <UIcon name="i-mdi-github" class="text-white/60 text-lg" />
            </button>
            <button v-if="recommendation.linkedinLink" class="p-2 hover:bg-white/10 rounded-lg transition-colors" @click="openLink(recommendation.linkedinLink)">
              <UIcon name="i-mdi-linkedin" class="text-white/60 text-lg" />
            </button>
            <button v-if="recommendation.instagramLink" class="p-2 hover:bg-white/10 rounded-lg transition-colors" @click="openLink(recommendation.instagramLink)">
              <UIcon name="i-mdi-instagram" class="text-white/60 text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="text-white/40 font-light text-sm mt-8">
      <p>Feel free to share your recommendation if you've collaborated with me by clicking <strong class="font-bold underline cursor-pointer hover:text-white/60 transition-colors" @click="navigateTo('/write-recommendation')">on this link</strong>.</p>
      <p class="mt-1">Note: It will be displayed here after the admin approves it.</p>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { IColleagueInfo } from '~/types/models'
import { recommendations } from '~/data/portfolio'

const openLink = (link: string) => { window.open(link) }
</script>

<style lang="scss" scoped>
.recommendation-text {
  :deep(blockquote) {
    font-style: italic;
    margin: 0 0 0.5rem 0;
  }
  :deep(p) {
    margin-bottom: 0.5rem;
    &:empty { display: none; }
    &:last-child { margin-bottom: 0; }
  }
}
</style>
