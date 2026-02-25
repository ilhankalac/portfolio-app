<template>
  <SectionWrapper
    sectionId="recommendations"
    class="recommendations-section"
    label="What others say"
    header="Recommendations"
    textColor="white"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
  >
    <div class="relative">
      <!-- Carousel -->
      <div ref="track" class="carousel-track" @scroll="onScroll">
        <div
          v-for="recommendation in recommendations"
          :key="recommendation.fullName"
          class="rec-card"
        >
          <div class="flex-1">
            <UIcon name="i-mdi-format-quote-open" class="text-white/10 text-3xl mb-2" />
            <div class="recommendation-text text-white/50 text-[0.78rem] leading-relaxed" v-html="recommendation.textHtml" />
          </div>

          <div class="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
            <div class="flex items-center gap-3 min-w-0">
              <img
                v-if="recommendation.avatarSrc"
                :src="recommendation.avatarSrc"
                :alt="recommendation.fullName"
                class="w-10 h-10 rounded-full object-cover border-2 border-white/10 shrink-0"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-white/10 border-2 border-white/10 shrink-0 flex items-center justify-center text-white/50 font-semibold text-sm"
              >
                {{ recommendation.fullName?.charAt(0) }}
              </div>
              <div class="min-w-0">
                <div class="text-white/90 font-semibold text-[0.8rem] leading-tight truncate">{{ recommendation.fullName }}</div>
                <div class="text-white/35 text-[0.7rem] mt-0.5">{{ recommendation.role }}</div>
              </div>
            </div>

            <div class="flex gap-0.5 shrink-0">
              <button v-if="recommendation.githubLink" class="social-btn" @click.stop="openLink(recommendation.githubLink)">
                <UIcon name="i-mdi-github" class="text-base" />
              </button>
              <button v-if="recommendation.linkedinLink" class="social-btn" @click.stop="openLink(recommendation.linkedinLink)">
                <UIcon name="i-mdi-linkedin" class="text-base" />
              </button>
              <button v-if="recommendation.instagramLink" class="social-btn" @click.stop="openLink(recommendation.instagramLink)">
                <UIcon name="i-mdi-instagram" class="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation arrows -->
      <button
        v-show="canScrollLeft"
        class="nav-btn left-0 -translate-x-1/2"
        @click="scroll(-1)"
      >
        <UIcon name="i-mdi-chevron-left" class="text-xl" />
      </button>
      <button
        v-show="canScrollRight"
        class="nav-btn right-0 translate-x-1/2"
        @click="scroll(1)"
      >
        <UIcon name="i-mdi-chevron-right" class="text-xl" />
      </button>

      <!-- Dots -->
      <div class="flex justify-center gap-1.5 mt-5">
        <button
          v-for="(_, i) in pageCount"
          :key="i"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="currentPage === i ? 'bg-white/70 w-4' : 'bg-white/20 hover:bg-white/30'"
          @click="goToPage(i)"
        />
      </div>
    </div>

    <div class="text-white/30 font-normal text-[0.72rem] mt-6 text-center">
      <p>Collaborated with me? <strong class="font-semibold underline cursor-pointer hover:text-white/55 transition-colors" @click="navigateTo('/write-recommendation')">Share your recommendation</strong></p>
      <p class="mt-0.5">It will appear here after approval.</p>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { IColleagueInfo } from '~/types/models'

const props = defineProps<{
  recommendations: IColleagueInfo[]
}>()

const openLink = (link: string) => { window.open(link) }

const track = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const currentPage = ref(0)

const pageCount = computed(() => {
  if (!props.recommendations.length) return 0
  // Rough estimate: on desktop we show ~2.5 cards, on mobile ~1.1
  return Math.ceil(props.recommendations.length / 2)
})

const onScroll = () => {
  if (!track.value) return
  const { scrollLeft, scrollWidth, clientWidth } = track.value
  canScrollLeft.value = scrollLeft > 4
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 4
  // Calculate current page based on scroll position
  const maxScroll = scrollWidth - clientWidth
  if (maxScroll > 0) {
    currentPage.value = Math.round((scrollLeft / maxScroll) * (pageCount.value - 1))
  }
}

const scroll = (dir: number) => {
  if (!track.value) return
  const cardWidth = track.value.querySelector('.rec-card')?.clientWidth || 300
  track.value.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' })
}

const goToPage = (page: number) => {
  if (!track.value) return
  const { scrollWidth, clientWidth } = track.value
  const maxScroll = scrollWidth - clientWidth
  track.value.scrollTo({ left: (page / (pageCount.value - 1)) * maxScroll, behavior: 'smooth' })
}

onMounted(() => {
  nextTick(onScroll)
})
</script>

<style lang="scss" scoped>
.carousel-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 4px 0;

  &::-webkit-scrollbar { display: none; }
}

.rec-card {
  flex: 0 0 calc(40% - 10px);
  min-width: 280px;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  &.left-0 { left: 0; transform: translateY(-50%) translateX(-50%); }
  &.right-0 { right: 0; transform: translateY(-50%) translateX(50%); }
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.35);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
  }
}

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

@media screen and (max-width: 699px) {
  .rec-card {
    flex: 0 0 85%;
    min-width: 260px;
    padding: 18px;
    border-radius: 16px;
  }

  .nav-btn { display: none; }
}
</style>
