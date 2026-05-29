<template>
  <div>
    <!-- Section header -->
    <div class="now-header">
      <span class="now-label">What I'm up to</span>
      <h1 class="now-title">Now</h1>
      <p class="now-subtitle">
        A snapshot of where my time and attention are going right now —
        inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="now-link">nownownow.com</a>.
      </p>

      <div class="now-meta">
        <span class="now-meta-item">
          <UIcon name="i-mdi-clock-outline" class="now-meta-icon" />
          Last updated {{ lastUpdated }}
        </span>
        <span class="now-meta-item">
          <UIcon name="i-mdi-map-marker-outline" class="now-meta-icon" />
          {{ location }}
        </span>
      </div>
    </div>

    <!-- Working on -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-hammer-wrench" class="section-icon" />
        Working on
      </h2>
      <div class="card-grid">
        <article
          v-for="item in workingOn"
          :key="item.title"
          class="now-card"
        >
          <div class="card-head">
            <h3 class="card-title">{{ item.title }}</h3>
            <span class="card-status" :class="`status-${item.status}`">
              {{ statusLabel(item.status) }}
            </span>
          </div>
          <p class="card-text">{{ item.description }}</p>
        </article>
      </div>
    </section>

    <!-- Learning -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-school-outline" class="section-icon" />
        Learning
      </h2>
      <ul class="bullet-list">
        <li v-for="item in learning" :key="item">{{ item }}</li>
      </ul>
    </section>

    <!-- Reading -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-book-open-page-variant-outline" class="section-icon" />
        Reading
      </h2>
      <ul class="book-list">
        <li
          v-for="book in reading"
          :key="book.title"
          class="book-item"
        >
          <span class="book-title">{{ book.title }}</span>
          <span class="book-author">— {{ book.author }}</span>
        </li>
      </ul>
    </section>

    <!-- Goals -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-target" class="section-icon" />
        Goals this quarter
      </h2>
      <div class="goal-list">
        <div
          v-for="goal in goals"
          :key="goal.label"
          class="goal-item"
        >
          <div class="goal-row">
            <span class="goal-label">{{ goal.label }}</span>
            <span class="goal-progress">{{ goal.progress }}%</span>
          </div>
          <div class="goal-bar">
            <div class="goal-bar-fill" :style="{ width: `${goal.progress}%` }" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'blog' })

useHead({
  title: 'Now — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/now' }],
})

useSeoMeta({
  description: 'A snapshot of what Ilhan Kalač is currently working on, learning, reading, and aiming for.',
  ogType: 'website',
  ogTitle: 'Now — Ilhan Kalač',
  ogDescription: 'A snapshot of what Ilhan Kalač is currently working on, learning, reading, and aiming for.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/now',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Now — Ilhan Kalač',
  twitterDescription: 'A snapshot of what Ilhan Kalač is currently working on, learning, reading, and aiming for.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

type WorkStatus = 'shipping' | 'wip' | 'paused'

const lastUpdated = 'May 2026'
const location = 'Podgorica, Montenegro'

const workingOn: { title: string; description: string; status: WorkStatus }[] = [
  {
    title: 'Day job — frontend engineering',
    description: 'Building product features and shipping polished UI in a Vue / Nuxt stack.',
    status: 'shipping',
  },
  {
    title: 'ViaLuxury — Luxury travel platform',
    description: 'Where most of my time goes — building the customer-facing frontend in Nuxt 4 & Vue 3: booking flow, holiday-package offers, payments, accounts, and a fully multilingual (i18n) experience.',
    status: 'shipping',
  },
  {
    title: 'Infinitydrive.lu — Premium car dealership',
    description: 'Built the web platform for a Luxembourg-based premium used-car dealership — vehicle catalogue, financing requests, and a French-localized customer experience.',
    status: 'shipping',
  },
  {
    title: 'Personal portfolio — Nuxt 4 migration',
    description: 'Migrating this site from Nuxt 3 to Nuxt 4 — new app/ directory structure, updated data fetching, and refreshing the content/blog setup along the way.',
    status: 'wip',
  },
]

const learning: string[] = [
  'Fullstackopen.com — comprehensive modern web development course',
  'Core Web Vitals concepts and optimization techniques',
  'ASP.NET Core',
]

const reading: { title: string; author: string }[] = [
  { title: 'Jadnici I', author: 'Viktor Igo'}
]

const goals: { label: string; progress: number }[] = [
  { label: 'Read 3 books', progress: 100 },
  { label: 'Finish 5th Fullstack Open module', progress: 0 },
]

const statusLabel = (s: WorkStatus) => {
  if (s === 'shipping') return 'Shipping'
  if (s === 'wip') return 'In progress'
  return 'Paused'
}
</script>

<style scoped lang="scss">
/* Header */
.now-header {
  padding-bottom: 1.5rem;
}

.now-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.now-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.now-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
}

.now-link {
  color: rgba(129, 140, 248, 0.85);
  text-decoration: none;
  border-bottom: 1px dashed rgba(129, 140, 248, 0.4);
  transition: all 0.2s ease;

  &:hover {
    color: rgba(129, 140, 248, 1);
    border-bottom-color: rgba(129, 140, 248, 0.8);
  }
}

.now-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 1rem;
}

.now-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.now-meta-icon {
  font-size: 0.95rem;
  color: rgba(129, 140, 248, 0.75);
}

/* Sections */
.now-section {
  margin-top: 2.25rem;
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 0.85rem;
  letter-spacing: -0.01em;
}

.section-icon {
  font-size: 1rem;
  color: #818cf8;
}

/* Working on cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
}

.now-card {
  padding: 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.045);
    border-color: rgba(255, 255, 255, 0.08);
  }
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  line-height: 1.4;
}

.card-status {
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;

  &.status-shipping {
    color: #34d399;
    background: rgba(52, 211, 153, 0.1);
    border: 1px solid rgba(52, 211, 153, 0.2);
  }

  &.status-wip {
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.2);
  }

  &.status-paused {
    color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}

.card-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.825rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Bullet list (Learning) */
.bullet-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  li {
    position: relative;
    padding-left: 1.1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55rem;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #818cf8;
    }
  }
}

/* Reading list */
.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.book-item {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
}

.book-title {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.book-author {
  color: rgba(255, 255, 255, 0.4);
  margin-left: 0.25rem;
}

/* Goals */
.goal-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.goal-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.35rem;
}

.goal-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.goal-progress {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  font-variant-numeric: tabular-nums;
}

.goal-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 9999px;
  overflow: hidden;
}

.goal-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #818cf8);
  border-radius: 9999px;
  transition: width 0.4s ease;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
