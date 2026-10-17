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

    <!-- Thinking about -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-palette-outline" class="section-icon" />
        Thinking about
      </h2>
      <p class="now-prose">{{ thinkingAbout }}</p>
    </section>

    <!-- Goals -->
    <section class="now-section">
      <h2 class="section-title">
        <UIcon name="i-mdi-target" class="section-icon" />
        Goals this quarter (Oct–Dec 2026)
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

import type { WorkStatus } from '~/data/now'
import { lastUpdated, location, workingOn, learning, reading, goals, thinkingAbout } from '~/data/now'

const statusLabel = (s: WorkStatus) => {
  if (s === 'shipping') return 'Shipping'
  if (s === 'shipped') return 'Live'
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
  font-family: var(--v2-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--v2-accent);
  margin-bottom: 0.4rem;
}

.now-title {
  font-family: var(--v2-display);
  font-size: clamp(2.2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  color: rgb(var(--v2-ink-rgb) / 0.95);
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.now-subtitle {
  font-size: 0.9375rem;
  color: rgb(var(--v2-ink-rgb) / 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
}

.now-link {
  color: rgb(var(--v2-accent-rgb) / 0.85);
  text-decoration: none;
  border-bottom: 1px dashed rgb(var(--v2-accent-rgb) / 0.4);
  transition: all 0.2s ease;

  &:hover {
    color: rgb(var(--v2-accent-rgb) / 1);
    border-bottom-color: rgb(var(--v2-accent-rgb) / 0.8);
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
  font-family: var(--v2-display);
  font-size: 0.8125rem;
  color: rgb(var(--v2-ink-rgb) / 0.5);
}

.now-meta-icon {
  font-size: 0.95rem;
  color: rgb(var(--v2-accent-rgb) / 0.75);
}

/* Sections */
.now-section {
  margin-top: 2.25rem;
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--v2-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--v2-ink-rgb) / 0.9);
  margin: 0 0 0.85rem;
  letter-spacing: -0.01em;
}

.section-icon {
  font-size: 1rem;
  color: var(--v2-accent);
}

/* Working on cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
}

.now-card {
  padding: 1rem 1.1rem;
  background: rgb(var(--v2-ink-rgb) / 0.03);
  border: 1px solid rgb(var(--v2-ink-rgb) / 0.05);
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(var(--v2-ink-rgb) / 0.045);
    border-color: rgb(var(--v2-ink-rgb) / 0.08);
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
  font-family: var(--v2-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(var(--v2-ink-rgb) / 0.92);
  margin: 0;
  line-height: 1.4;
}

.card-status {
  flex-shrink: 0;
  font-family: var(--v2-mono);
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

  &.status-shipped {
    color: var(--v2-accent);
    background: rgb(var(--v2-accent-rgb) / 0.1);
    border: 1px solid rgb(var(--v2-accent-rgb) / 0.2);
  }

  &.status-wip {
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.2);
  }

  &.status-paused {
    color: rgb(var(--v2-ink-rgb) / 0.45);
    background: rgb(var(--v2-ink-rgb) / 0.05);
    border: 1px solid rgb(var(--v2-ink-rgb) / 0.08);
  }
}

.card-text {
  font-family: var(--v2-body);
  font-size: 0.825rem;
  line-height: 1.6;
  color: rgb(var(--v2-ink-rgb) / 0.5);
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
    font-family: var(--v2-body);
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgb(var(--v2-ink-rgb) / 0.7);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55rem;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--v2-accent);
    }
  }
}

/* Prose block (Thinking about) */
.now-prose {
  font-family: var(--v2-body);
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgb(var(--v2-ink-rgb) / 0.7);
  margin: 0;
  max-width: 42rem;
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
  font-family: var(--v2-body);
  font-size: 0.875rem;
  line-height: 1.6;
}

.book-title {
  color: rgb(var(--v2-ink-rgb) / 0.85);
  font-weight: 500;
}

.book-author {
  color: rgb(var(--v2-ink-rgb) / 0.4);
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
  font-family: var(--v2-display);
  font-size: 0.875rem;
  color: rgb(var(--v2-ink-rgb) / 0.8);
}

.goal-progress {
  font-family: var(--v2-display);
  font-size: 0.75rem;
  color: rgb(var(--v2-ink-rgb) / 0.45);
  font-variant-numeric: tabular-nums;
}

.goal-bar {
  width: 100%;
  height: 4px;
  background: rgb(var(--v2-ink-rgb) / 0.06);
  border-radius: 9999px;
  overflow: hidden;
}

.goal-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #8f7d60, var(--v2-accent));
  border-radius: 9999px;
  transition: width 0.4s ease;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* Status colours are tuned for the dark theme; deepen them on light. */
html.light .card-status {
  &.status-shipping { color: #047857; }
  &.status-wip { color: #b45309; }
}
</style>
