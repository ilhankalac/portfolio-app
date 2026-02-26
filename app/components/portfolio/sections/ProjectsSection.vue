<template>
  <SectionWrapper
    sectionId="freetime-projects"
    label="Side projects"
    header="Freetime Projects"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
    textColor="white"
  >
    <div class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        :style="{ '--delay': `${index * 120}ms` }"
      >
        <!-- Image with hover overlay -->
        <div class="card-image-wrap">
          <img
            :src="project.image"
            :alt="project.title"
            class="card-image"
          />
          <div class="card-image-gradient" />
          <div class="card-image-overlay">
            <UButton
              v-if="project.live_demo"
              variant="solid"
              size="sm"
              color="white"
              @click="openLink(project.live_demo)"
            >
              <UIcon name="i-mdi-open-in-new" class="mr-1" />
              Live Demo
            </UButton>
            <UButton
              v-if="project.source_code"
              variant="outline"
              size="sm"
              color="white"
              @click="openLink(project.source_code)"
            >
              <UIcon name="i-mdi-github" class="mr-1" />
              Source
            </UButton>
          </div>
        </div>

        <!-- Card body -->
        <div class="card-body">
          <div class="card-header">
            <div class="card-title-row">
              <UIcon
                :name="project.icon?.startsWith('mdi-') ? `i-${project.icon}` : `i-mdi-${project.icon}`"
                class="card-icon"
              />
              <h3 class="card-title">{{ project.title }}</h3>
            </div>
            <span class="card-date">{{ project.dateOfCreation }}</span>
          </div>

          <div
            class="card-description"
            v-html="project.description"
          />

          <div class="card-footer">
            <div class="card-techs">
              <span
                v-for="tech in project.technologies"
                :key="tech.id"
                class="tech-pill"
              >
                <UIcon :name="`i-mdi-${tech.icon}`" class="tech-icon" />
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { IFreeProject } from '~/types/models'

defineProps<{
  projects: IFreeProject[]
}>()

const openLink = (link: string) => { window.open(link, '_blank') }
</script>

<style scoped lang="scss">
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease;
  animation: cardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);

    .card-image {
      transform: scale(1.05);
    }

    .card-image-overlay {
      opacity: 1;
    }
  }
}

.card-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(15, 23, 42, 0.8) 100%
  );
  pointer-events: none;
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.card-icon {
  font-size: 1.1rem;
  color: #818cf8;
  flex-shrink: 0;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-date {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  flex-shrink: 0;
}

.card-description {
  font-size: 0.78rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);

  :deep(p) {
    margin: 0;
  }

  :deep(a) {
    color: #818cf8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.card-footer {
  margin-top: auto;
  padding-top: 0.5rem;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.3);
    color: rgba(255, 255, 255, 0.7);
  }
}

.tech-icon {
  font-size: 0.75rem;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
