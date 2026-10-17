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

    <div class="grid">
      <article v-for="country in countries" :key="country.code" class="card">
        <button
          v-if="country.photos"
          type="button"
          class="cover"
          :aria-label="`Open ${country.name} photos`"
          @click="openGallery(country)"
        >
          <img :src="coverUrl(country)!" :alt="`${country.name}`" loading="lazy">
          <span class="badge">
            <UIcon name="i-mdi-image-multiple-outline" />
            {{ country.photos }}
          </span>
        </button>
        <div v-else class="cover cover--empty" aria-hidden="true">
          <span>{{ country.code }}</span>
        </div>

        <div class="body">
          <div class="head">
            <span class="code">{{ country.code }}</span>
            <h2 class="name">{{ country.name }}</h2>
            <span class="since">Since {{ country.since }}</span>
          </div>
          <p class="cities">{{ country.cities.join(' · ') }}</p>
        </div>
      </article>
    </div>

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
  font-family: var(--v2-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--v2-accent);
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: var(--v2-display);
  font-size: clamp(2.2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  color: rgb(var(--v2-ink-rgb) / 0.95);
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgb(var(--v2-ink-rgb) / 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  max-width: 34rem;
}

.stat-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
  font-family: var(--v2-display);
  font-size: 0.78rem;
  color: rgb(var(--v2-ink-rgb) / 0.35);

  b {
    font-weight: 600;
    color: rgb(var(--v2-ink-rgb) / 0.7);
    font-variant-numeric: tabular-nums;
  }
}

.stat-dot {
  color: rgb(var(--v2-ink-rgb) / 0.18);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--v2-border);
  border-radius: 1rem;
  background: var(--v2-surface);
  transition: border-color 0.25s ease;

  &:hover {
    border-color: var(--v2-border-strong);
  }
}

.cover {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: none;
  overflow: hidden;
  background: var(--v2-surface-2);
  cursor: zoom-in;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.04);
  }

  &--empty {
    display: grid;
    place-items: center;
    cursor: default;
    background:
      radial-gradient(circle at 30% 20%, rgb(var(--v2-accent-rgb) / 0.08), transparent 60%),
      var(--v2-surface-2);

    span {
      font-family: var(--v2-mono);
      font-size: 2.5rem;
      letter-spacing: 0.2em;
      color: rgb(var(--v2-ink-rgb) / 0.12);
    }
  }
}

.badge {
  position: absolute;
  right: 0.7rem;
  bottom: 0.7rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  background: rgb(var(--v2-bg-rgb) / 0.7);
  backdrop-filter: blur(6px);
  font-family: var(--v2-mono);
  font-size: 0.7rem;
  color: var(--v2-text);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1rem 1.1rem 1.15rem;
}

.head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.code {
  font-family: var(--v2-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--v2-accent);
}

.name {
  margin: 0;
  font-family: var(--v2-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}


.since {
  margin-left: auto;
  font-family: var(--v2-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v2-faint);
  white-space: nowrap;
}

.cities {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--v2-muted);
}

/* Gallery */
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--v2-text);
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
  border: 1px solid var(--v2-border-strong);
  border-radius: 50%;
  background: rgb(var(--v2-bg-rgb) / 0.65);
  backdrop-filter: blur(6px);
  color: var(--v2-text);
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgb(var(--v2-bg-rgb) / 0.9);
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
  color: var(--v2-muted);

  b {
    font-family: var(--v2-display);
    font-weight: 600;
    color: var(--v2-text);
  }
}

.count {
  font-family: var(--v2-mono);
  font-size: 0.75rem;
  color: var(--v2-faint);
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
    border-color: var(--v2-accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo { animation: none; }
  .cover:hover img { transform: none; }
}
</style>
