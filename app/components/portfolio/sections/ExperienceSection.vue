<template>
  <SectionWrapper
    class="experience-section"
    label="What I've done"
    header="Experience"
    :customStyle="`min-height: auto; background: rgb(var(--color-primary-rgb))`"
    sectionId="experience"
  >
    <div class="flex flex-col gap-4 w-full">
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="experience-card"
        :class="{ 'expanded': expandedId === index }"
        @click="toggleCard(index)"
      >
        <div class="flex items-center gap-5">
          <div class="shrink-0">
            <img
              :src="experience.logoSrc"
              :alt="experience.title"
              class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/10 object-cover transition-all duration-300"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[0.925rem] font-semibold text-white/90 mb-0.5 leading-tight">{{ experience.title }}</div>
            <div class="text-[0.8rem] text-white/55 mb-1.5">{{ experience.position }}</div>
            <div class="flex items-center gap-3 text-[0.75rem] text-white/40 flex-wrap">
              <span>{{ experience.date }}</span>
              <span class="flex items-center gap-1">
                <UIcon name="i-mdi-map-marker" class="text-xs" />
                {{ experience.location }}
              </span>
            </div>
          </div>
          <div class="shrink-0 text-white/40">
            <UIcon
              name="i-mdi-chevron-down"
              class="text-2xl transition-transform duration-300"
              :class="{ 'rotate-180': expandedId === index }"
            />
          </div>
        </div>

        <Transition name="expand">
          <div v-if="expandedId === index" class="mt-5 pt-5 border-t border-white/10 animate-[fadeIn_0.4s_ease]">
            <div v-html="experience.description" class="text-white/55 leading-relaxed mb-5 text-[0.8rem]" />
            <ExperienceCard :selected-item="experience" @close="expandedId = null" />
          </div>
        </Transition>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import ExperienceCard from '~/components/portfolio/ExperienceCard.vue'
import type { IExperience } from '~/types/models'

const props = defineProps<{
  experiences: IExperience[]
}>()

const expandedId = ref<number | null>(null)

const toggleCard = (index: number) => {
  expandedId.value = expandedId.value === index ? null : index
}
</script>

<style lang="scss" scoped>
.experience-section {
  background: rgb(var(--color-primary-rgb));
  color: white;
  padding-bottom: 60px;
}

.experience-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  &.expanded {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

@media screen and (max-width: 699px) {
  .experience-card { padding: 16px; border-radius: 16px; }
}
</style>
