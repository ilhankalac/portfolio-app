<template>
  <section v-if="recommendations.length" id="recommendations" class="site-section">
    <div class="site-container">
      <span class="site-eyebrow">Recommendations</span>
      <h2 class="site-heading">Kind words from<br>people I've worked with.</h2>

      <div class="track">
        <figure v-for="rec in recommendations" :key="rec.fullName" class="site-card quote">
          <blockquote class="site-prose text" v-html="rec.textHtml" />
          <figcaption class="author">
            <img v-if="rec.avatarSrc" :src="rec.avatarSrc" :alt="rec.fullName" class="avatar" loading="lazy">
            <span v-else class="avatar avatar--initial">{{ rec.fullName?.charAt(0) }}</span>
            <span>
              <strong>{{ rec.fullName }}</strong>
              <small>{{ rec.role }}</small>
            </span>
          </figcaption>
        </figure>
      </div>

      <NuxtLink to="/write-recommendation" class="write">
        Worked with me? Share a recommendation
        <UIcon name="i-mdi-arrow-right" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IColleagueInfo } from '~/types/models'

defineProps<{ recommendations: IColleagueInfo[] }>()
</script>

<style scoped lang="scss">
.track {
  display: flex;
  gap: 1rem;
  margin-top: 3.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 0.25rem;
}

.quote {
  flex: 0 0 min(26rem, 85vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.75rem;
  margin: 0;
  padding: 1.75rem;
  scroll-snap-align: start;
}

.text {
  margin: 0;
  font-size: 0.95rem;
  /* Long recommendations are clamped so cards stay a similar height. */
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--site-border);

  strong {
    display: block;
    font-family: var(--site-display);
    font-weight: 600;
    font-size: 0.95rem;
  }

  small {
    color: var(--site-faint);
    font-size: 0.8rem;
  }
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(1);

  &--initial {
    display: grid;
    place-items: center;
    background: var(--site-surface-2);
    font-family: var(--site-display);
  }
}

.write {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 2rem;
  font-family: var(--site-display);
  font-size: 0.9rem;
  color: var(--site-muted);
  text-decoration: none;

  &:hover {
    color: var(--site-text);
  }
}
</style>
