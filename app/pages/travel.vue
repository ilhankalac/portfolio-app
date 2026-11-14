<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Travel</span>
      <h1 class="list-title">Places I've Been</h1>
      <p class="list-subtitle">
        From the Balkans to Tokyo, mapped from the photos I took along the way.
      </p>

      <div class="stat-strip">
        <span class="stat"><b>{{ countries.length }}</b> countries</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ totalCities }}</b> cities</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ continents.length }}</b> continents</span>
      </div>
    </div>

    <ul class="list">
      <li v-for="country in countries" :key="country.code" class="row">
        <button
          v-if="country.photos"
          type="button"
          class="cover"
          :aria-label="`Open ${country.name} photos`"
          @click="openGallery(country)"
        >
          <img :src="coverUrl(country)!" alt="" loading="lazy">
        </button>
        <div v-else class="cover cover--empty" aria-hidden="true">
          <span>{{ country.code }}</span>
        </div>

        <div class="info">
          <h2 class="name">{{ country.name }}</h2>
          <p class="cities">{{ country.cities.join(' · ') }}</p>
        </div>

        <div class="meta">
          <span>{{ country.since }}</span>
          <span v-if="country.photos" class="photos">{{ country.photos }} {{ country.photos === 1 ? 'photo' : 'photos' }}</span>
        </div>
      </li>
    </ul>

    <UModal
      v-model:open="galleryOpen"
      :ui="{
        overlay: 'bg-black/85 backdrop-blur-sm',
        content: 'bg-transparent ring-0 shadow-none divide-y-0 sm:max-w-5xl',
      }"
    >
      <template #content>
        <div v-if="active" class="gallery">
          <div class="stage">
            <img :key="photos[index]" :src="photos[index]" :alt="`${active.name}, photo ${index + 1}`" class="photo">

            <template v-if="photos.length > 1">
              <button type="button" class="nav nav--prev" aria-label="Previous photo" @click="step(-1)">
                <UIcon name="i-mdi-chevron-left" />
              </button>
              <button type="button" class="nav nav--next" aria-label="Next photo" @click="step(1)">
                <UIcon name="i-mdi-chevron-right" />
              </button>
            </template>

            <button type="button" class="close" aria-label="Close" @click="galleryOpen = false">
              <UIcon name="i-mdi-close" />
            </button>
          </div>

          <div class="caption">
            <span><b>{{ active.name }}</b> · {{ active.cities.join(' · ') }}</span>
            <span class="count">{{ index + 1 }} / {{ photos.length }}</span>
          </div>

          <div v-if="photos.length > 1" class="thumbs">
            <button
              v-for="(src, i) in photos"
              :key="src"
              type="button"
              class="thumb"
              :class="{ active: i === index }"
              :aria-label="`Show photo ${i + 1}`"
              @click="index = i"
            >
              <img :src="src" alt="" loading="lazy">
            </button>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { countries, continents, coverUrl, photoUrls, type Country } from '~/data/travel'

definePageMeta({ layout: 'blog' })

useHead({
  title: 'Travel — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/travel' }],
})

useSeoMeta({
  description: 'Countries and cities Ilhan Kalač has visited, from the Balkans to Japan.',
  ogType: 'website',
  ogTitle: 'Travel — Ilhan Kalač',
  ogDescription: 'Countries and cities Ilhan Kalač has visited, from the Balkans to Japan.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Travel — Ilhan Kalač',
  twitterDescription: 'Countries and cities Ilhan Kalač has visited, from the Balkans to Japan.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

const totalCities = countries.reduce((sum, country) => sum + country.cities.length, 0)

const galleryOpen = ref(false)
const active = ref<Country | null>(null)
const index = ref(0)

const photos = computed(() => (active.value ? photoUrls(active.value) : []))

const openGallery = (country: Country) => {
  active.value = country
  index.value = 0
  galleryOpen.value = true
}

const step = (delta: number) => {
  const count = photos.value.length
  index.value = (index.value + delta + count) % count
}

// Arrow keys page through the open gallery.
onMounted(() => {
  const onKey = (event: KeyboardEvent) => {
    if (!galleryOpen.value) return
    if (event.key === 'ArrowLeft') step(-1)
    if (event.key === 'ArrowRight') step(1)
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<style scoped lang="scss">
.list-header {
  padding-bottom: 1.5rem;
}

.list-label {
  display: block;
  font-family: var(--site-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--site-accent);
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: var(--site-display);
  font-size: clamp(2.2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  color: rgb(var(--site-ink-rgb) / 0.95);
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgb(var(--site-ink-rgb) / 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  max-width: 34rem;
}

.stat-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
  font-family: var(--site-display);
  font-size: 0.78rem;
  color: rgb(var(--site-ink-rgb) / 0.35);

  b {
    font-weight: 600;
    color: rgb(var(--site-ink-rgb) / 0.7);
    font-variant-numeric: tabular-nums;
  }
}

.stat-dot {
  color: rgb(var(--site-ink-rgb) / 0.18);
}

.list {
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
  max-width: 44rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--site-border);

  &:last-child {
    border-bottom: none;
  }
}

.cover {
  flex-shrink: 0;
  width: 3.5rem;
  aspect-ratio: 1;
  padding: 0;
  border: none;
  border-radius: 0.6rem;
  overflow: hidden;
  background: var(--site-surface-2);
  cursor: zoom-in;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.25s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img,
  &:focus-visible img {
    opacity: 1;
    transform: scale(1.06);
  }

  &--empty {
    display: grid;
    place-items: center;
    cursor: default;

    span {
      font-family: var(--site-mono);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: rgb(var(--site-ink-rgb) / 0.3);
    }
  }
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  margin: 0;
  font-family: var(--site-display);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.cities {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--site-muted);
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  flex-shrink: 0;
  font-family: var(--site-mono);
  font-size: 0.7rem;
  color: var(--site-faint);
  white-space: nowrap;
}

.photos {
  font-size: 0.65rem;
  opacity: 0.8;
}

/* Gallery */
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--site-text);
}

.stage {
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 0.9rem;
  overflow: hidden;
  background: #000;
}

.photo {
  display: block;
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.nav,
.close {
  position: absolute;
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--site-border-strong);
  border-radius: 50%;
  background: rgb(var(--site-bg-rgb) / 0.65);
  backdrop-filter: blur(6px);
  color: var(--site-text);
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgb(var(--site-bg-rgb) / 0.9);
  }
}

.nav {
  top: 50%;
  transform: translateY(-50%);

  &--prev { left: 0.8rem; }
  &--next { right: 0.8rem; }
}

.close {
  top: 0.8rem;
  right: 0.8rem;
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1.1rem;
}

.caption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--site-muted);

  b {
    font-family: var(--site-display);
    font-weight: 600;
    color: var(--site-text);
  }
}

.count {
  font-family: var(--site-mono);
  font-size: 0.75rem;
  color: var(--site-faint);
  white-space: nowrap;
}

.thumbs {
  display: flex;
  gap: 0.5rem;
}

.thumb {
  width: 5.5rem;
  aspect-ratio: 3 / 2;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  overflow: hidden;
  opacity: 0.55;
  cursor: pointer;
  transition: opacity 0.2s ease, border-color 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover { opacity: 0.85; }

  &.active {
    opacity: 1;
    border-color: var(--site-accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo { animation: none; }
  .cover:hover img,
  .cover:focus-visible img { transform: none; }
}
</style>
