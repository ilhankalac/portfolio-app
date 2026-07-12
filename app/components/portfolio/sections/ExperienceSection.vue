<template>
  <SectionWrapper
    class="experience-section"
    label="What I've done"
    header="Experience"
    :customStyle="`min-height: auto; background: rgb(var(--color-primary-rgb))`"
    sectionId="experience"
  >
    <div class="timeline">
      <div
        v-for="(experience, index) in reversedExperiences"
        :key="index"
        class="timeline-item"
        :style="{ '--delay': `${index * 150}ms` }"
      >
        <!-- Timeline connector -->
        <div class="timeline-track">
          <div class="timeline-dot" />
          <div v-if="index < reversedExperiences.length - 1" class="timeline-line" />
        </div>

        <!-- Card -->
        <div
          class="exp-card"
          :class="{ 'exp-card--expanded': expandedId === index }"
          @click="toggleCard(index)"
        >
          <!-- Company header row -->
          <div class="exp-header">
            <img
              :src="experience.logoSrc"
              :alt="experience.title"
              class="exp-logo"
            />
            <div class="exp-info">
              <div class="exp-company-row">
                <h3 class="exp-company">{{ experience.title }}</h3>
                <a
                  v-if="experience.company_link"
                  class="exp-link"
                  :href="experience.company_link"
                  target="_blank"
                  @click.stop
                >
                  <UIcon name="i-mdi-open-in-new" />
                </a>
              </div>
              <div class="exp-position">{{ experience.position }}</div>
              <div class="exp-meta">
                <span class="exp-meta-item">
                  <UIcon name="i-mdi-calendar-outline" />
                  {{ experience.date }}
                </span>
                <span class="exp-meta-item">
                  <UIcon name="i-mdi-map-marker-outline" />
                  {{ experience.location }}
                </span>
                <span v-if="experience.projects?.length" class="exp-meta-item exp-meta-projects">
                  <UIcon name="i-mdi-folder-outline" />
                  {{ experience.projects.length }} {{ experience.projects.length === 1 ? 'project' : 'projects' }}
                </span>
              </div>
            </div>
            <div class="exp-chevron" :class="{ 'exp-chevron--open': expandedId === index }">
              <UIcon name="i-mdi-chevron-down" />
            </div>
          </div>

          <!-- Expanded content -->
          <Transition name="slide">
            <div v-if="expandedId === index" class="exp-expanded">
              <!-- Description -->
              <div
                v-if="experience.description"
                v-html="experience.description"
                class="exp-description"
              />

              <!-- Projects -->
              <ExperienceCard :selected-item="experience" />
            </div>
          </Transition>
        </div>
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

const reversedExperiences = computed(() => [...props.experiences].reverse())

const expandedId = ref<number | null>(null)

const toggleCard = (index: number) => {
  expandedId.value = expandedId.value === index ? null : index
}
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
  animation: fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;

  @media (max-width: 640px) {
    gap: 1rem;
  }
}

.timeline-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
  padding-top: 28px;

  @media (max-width: 640px) {
    width: 14px;
    padding-top: 22px;
  }
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #818cf8;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.15);
  flex-shrink: 0;
  z-index: 1;

  @media (max-width: 640px) {
    width: 8px;
    height: 8px;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
  }
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, rgba(129, 140, 248, 0.25), rgba(129, 140, 248, 0.05));
  margin-top: 4px;
}

.exp-card {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.055);
    border-color: rgba(255, 255, 255, 0.12);
  }

  &--expanded {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(129, 140, 248, 0.2);
    box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 640px) {
    padding: 1rem 1.1rem;
    margin-bottom: 1rem;
    border-radius: 0.875rem;
  }
}

.exp-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
}

.exp-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: contain;
  background: #fff;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
  }
}

.exp-info {
  flex: 1;
  min-width: 0;
}

.exp-company-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exp-company {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.93);
  margin: 0;
  line-height: 1.3;
}

.exp-link {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #818cf8;
  }
}

.exp-position {
  font-size: 0.8rem;
  color: #818cf8;
  font-weight: 500;
  margin-top: 0.15rem;
}

.exp-meta {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.exp-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
}

.exp-meta-projects {
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.1rem 0.5rem;
  border-radius: 9999px;
}

.exp-chevron {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.25rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  margin-top: 0.2rem;

  &--open {
    transform: rotate(180deg);
  }
}

.exp-expanded {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.exp-description {
  font-size: 0.8rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.25rem;

  :deep(p) {
    margin: 0 0 0.5rem;
  }
}

// Slide transition
.slide-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 2000px;
  overflow: hidden;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
