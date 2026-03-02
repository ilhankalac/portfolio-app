<template>
  <SectionWrapper
    sectionId="about"
    label="Who am I"
    header="About Me"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
  >
    <div class="about-inner">
      <!-- Profile -->
      <div class="about-profile">
        <img
          src="~/assets/images/profile_photo.jpg"
          alt="Ilhan Kalač"
          class="profile-img"
        />
        <div class="profile-meta">
          <h3 class="profile-name">Ilhan Kalač</h3>
          <p class="profile-role">Software Developer · Podgorica, Montenegro</p>
        </div>
      </div>

      <!-- Description -->
      <div class="about-description">
        <div v-if="description" v-html="description" class="desc-content" />
        <div v-else class="desc-skeleton">
          <div class="skel-line"></div>
          <div class="skel-line"></div>
          <div class="skel-line short"></div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid" ref="statsRef">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon">
            <UIcon :name="stat.icon" class="text-lg" />
          </div>
          <div class="stat-number">{{ animatedStats[stat.key] }}+</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="tech-section" v-if="skills && skills.length">
        <h3 class="tech-title">Tech Stack</h3>
        <div class="tech-grid">
          <span
            v-for="skill in skills"
            :key="skill.key"
            class="tech-chip"
          >
            <UIcon :name="`i-mdi-${skill.icon}`" class="text-sm" />
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- Explore -->
      <div class="explore-row">
        <button class="explore-pill" @click="navigateTo('/blogs')">
          <UIcon name="i-mdi-post" />
          Blog Posts
        </button>
        <button class="explore-pill" @click="navigateTo('/favorite-quotes')">
          <UIcon name="i-mdi-format-quote-close" />
          Quotes
        </button>
        <button class="explore-pill" @click="navigateTo('/list-of-seen-films')">
          <UIcon name="i-mdi-filmstrip" />
          Films
        </button>
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { ISkill } from '~/types/models'

const props = defineProps<{
  description?: string | null
  skills: ISkill[]
}>()

const stats = [
  { key: 'years', value: 5, label: 'Years Experience', icon: 'i-mdi-briefcase-outline' },
  { key: 'projects', value: 20, label: 'Projects', icon: 'i-mdi-rocket-launch-outline' },
  { key: 'technologies', value: 10, label: 'Technologies', icon: 'i-mdi-code-tags' },
  { key: 'companies', value: 3, label: 'Companies', icon: 'i-mdi-office-building-outline' },
]

const animatedStats = reactive<Record<string, number>>({
  years: 0,
  projects: 0,
  technologies: 0,
  companies: 0,
})

const statsRef = ref<HTMLElement | null>(null)
let hasAnimated = false

const animateCount = (key: string, target: number) => {
  const duration = 1500
  const steps = 40
  const stepTime = duration / steps
  let current = 0
  const increment = target / steps
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      animatedStats[key] = target
      clearInterval(timer)
    } else {
      animatedStats[key] = Math.floor(current)
    }
  }, stepTime)
}

onMounted(() => {
  if (!statsRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !hasAnimated) {
        hasAnimated = true
        stats.forEach((s, i) => {
          setTimeout(() => animateCount(s.key, s.value), i * 100)
        })
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(statsRef.value)
})
</script>

<style scoped lang="scss">
.about-inner {
  margin: 0 auto;
}

/* Profile */
.about-profile {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.profile-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.profile-meta {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
}

.profile-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* Description */
.about-description {
  margin-bottom: 2.5rem;
}

.desc-content {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.875rem;
  line-height: 1.75;

  :deep(p) {
    margin-bottom: 0.875rem;
    &:last-child { margin-bottom: 0; }
    &:empty { min-height: 0.5rem; margin: 0.5rem 0; }
  }

  :deep(strong) { color: rgba(255, 255, 255, 0.9); font-weight: 600; }

  :deep(a) {
    color: #a5b4fc;
    text-decoration: underline;
    text-decoration-color: rgba(165, 180, 252, 0.3);
    transition: all 0.3s ease;
    &:hover { color: white; text-decoration-color: white; }
  }
}

.desc-skeleton {
  .skel-line {
    height: 12px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    margin-bottom: 0.75rem;
    animation: skelPulse 1.5s ease-in-out infinite;
    &.short { width: 65%; }
  }
}

@keyframes skelPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1.125rem 0.875rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }
}

.stat-icon {
  color: #818cf8;
  margin-bottom: 0.375rem;
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.2rem;
  font-weight: 500;
}

/* Tech Stack */
.tech-section {
  margin-bottom: 2.5rem;
}

.tech-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 0.75rem 0;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: rgba(79, 70, 229, 0.12);
    border-color: rgba(79, 70, 229, 0.25);
    color: #c7d2fe;
  }
}

/* Explore */
.explore-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.explore-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.875rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
