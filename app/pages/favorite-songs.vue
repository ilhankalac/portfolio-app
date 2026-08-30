<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Collection</span>
      <h1 class="list-title">Favorite Songs</h1>
      <p class="list-subtitle">
        Tracks I keep coming back to — from film scores to prog rock, whatever the mood calls for.
      </p>

      <div class="stat-strip">
        <span class="stat"><b>{{ topSongs.length }}</b> in the top 10</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ totalSongs }}</b> total</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ genres.length }}</b> genres</span>
      </div>
    </div>

    <!-- Top 10 -->
    <section class="top-section">
      <span class="section-eyebrow">
        <UIcon name="i-mdi-trophy-outline" class="eyebrow-icon" />
        Top 10
      </span>

      <div class="top-rail">
        <div v-for="(song, index) in topSongs" :key="`${song.title}-${song.artist}`" class="top-card">
          <span class="top-rank">{{ String(index + 1).padStart(2, '0') }}</span>
          <SongCover :song="song" :fallback-icon="'i-mdi-star-outline'" class="top-cover" />
          <div class="top-info">
            <span class="top-title">{{ song.title }}</span>
            <span class="top-artist">{{ song.artist }}</span>
          </div>
          <a v-if="song.link" :href="song.link" target="_blank" rel="noopener noreferrer" class="top-link" :aria-label="`Watch ${song.title} on YouTube`">
            <UIcon name="i-mdi-youtube" />
          </a>
        </div>
      </div>
    </section>

    <!-- Genre filter -->
    <div class="lens-row">
      <button
        class="lens-pill"
        :class="{ 'lens-pill--active': activeGenre === 'all' }"
        @click="activeGenre = 'all'"
      >
        Sve
        <span class="lens-count">{{ totalSongs }}</span>
      </button>
      <button
        v-for="genre in genres"
        :key="genre.id"
        class="lens-pill"
        :class="{ 'lens-pill--active': activeGenre === genre.id }"
        @click="activeGenre = genre.id"
      >
        <UIcon :name="genre.icon" class="lens-icon" />
        {{ genre.label }}
        <span class="lens-count">{{ genre.songs.length }}</span>
      </button>
    </div>

    <!-- Genre grid -->
    <div class="song-grid">
      <div v-for="entry in filteredSongs" :key="`${entry.song.title}-${entry.song.artist}`" class="song-card">
        <SongCover :song="entry.song" :fallback-icon="entry.genre.icon" class="song-cover" />
        <div class="song-body">
          <span class="song-genre-tag">
            <UIcon :name="entry.genre.icon" class="tag-icon" />
            {{ entry.genre.label }}
          </span>
          <span class="song-title">{{ entry.song.title }}</span>
          <span class="song-artist">{{ entry.song.artist }}</span>
          <span v-if="entry.song.note" class="song-note">{{ entry.song.note }}</span>
        </div>
        <a v-if="entry.song.link" :href="entry.song.link" target="_blank" rel="noopener noreferrer" class="song-link" :aria-label="`Watch ${entry.song.title} on YouTube`">
          <UIcon name="i-mdi-youtube" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SongCover from '~/components/common/SongCover.vue'
import { topSongs, genres, type Genre } from '~/data/music'

definePageMeta({ layout: 'blog' })

useHead({
  title: 'Favorite Songs — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/favorite-songs' }],
})

useSeoMeta({
  description: 'A collection of favorite songs curated by Ilhan Kalač, arranged by genre.',
  ogType: 'website',
  ogTitle: 'Favorite Songs — Ilhan Kalač',
  ogDescription: 'A collection of favorite songs curated by Ilhan Kalač, arranged by genre.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/favorite-songs',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Favorite Songs — Ilhan Kalač',
  twitterDescription: 'A collection of favorite songs curated by Ilhan Kalač, arranged by genre.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

const activeGenre = ref<string>('all')

const totalSongs = computed(() => genres.reduce((sum, genre) => sum + genre.songs.length, 0))

const filteredSongs = computed(() => {
  const relevantGenres: Genre[] = activeGenre.value === 'all'
    ? genres
    : genres.filter(genre => genre.id === activeGenre.value)

  return relevantGenres.flatMap(genre => genre.songs.map(song => ({ song, genre })))
})

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped lang="scss">
/* Section header */
.list-header {
  padding-bottom: 1.5rem;
}

.list-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  max-width: 34rem;
}

.stat-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.35);

  b {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    font-variant-numeric: tabular-nums;
  }
}

.stat-dot {
  color: rgba(255, 255, 255, 0.18);
}

/* Top 10 */
.top-section {
  margin-top: 0.5rem;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.9rem;
}

.eyebrow-icon {
  color: #818cf8;
}

.top-rail {
  display: flex;
  gap: 0.9rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.top-card {
  flex: 0 0 auto;
  width: 12.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0.9rem;
  position: relative;
  transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.3);
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }
}

.top-rank {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  padding: 0.15rem 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 0.4rem;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.top-cover {
  width: 100%;
  aspect-ratio: 1;
}

.top-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.top-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.3;
}

.top-artist {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
}

.top-link {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 0;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #a5b4fc;
    transform: scale(1.08);
  }
}

/* Genre filter */
.lens-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 2rem;
}

.lens-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.16);
  }

  &--active {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.35);

    .lens-count { color: rgba(165, 180, 252, 0.6); }
  }
}

.lens-icon {
  font-size: 0.9rem;
}

.lens-count {
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.28);
}

/* Song grid */
.song-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.song-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.9rem;
  position: relative;
  transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.25);
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
}

.song-cover {
  width: 100%;
  aspect-ratio: 16 / 10;
}

.song-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.song-genre-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #818cf8;
  margin-bottom: 0.15rem;
}

.tag-icon {
  font-size: 0.8rem;
}

.song-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.3;
}

.song-artist {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
}

.song-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.32);
  margin-top: 0.2rem;
}

.song-link {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 0;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #a5b4fc;
    transform: scale(1.08);
  }
}

@media (max-width: 900px) {
  .song-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .song-grid {
    grid-template-columns: 1fr;
  }

  .top-card {
    width: 10.5rem;
  }
}
</style>
