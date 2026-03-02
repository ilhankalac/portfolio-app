<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Cinema</span>
      <h1 class="list-title">Films I've Watched</h1>
      <div class="list-header-row">
        <p class="list-subtitle">
          Collection of films I have seen since 2016.
        </p>
        <button class="stats-btn" @click="openStatsDialog">
          <UIcon name="i-mdi-chart-bar" class="stats-icon" />
          Stats
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="search-wrap">
      <UInput
        v-model="searchTerm"
        placeholder="Search films..."
        size="lg"
        class="flex-1"
        :ui="{ base: 'bg-transparent text-white placeholder-white/30' }"
        @keyup.enter="debouncedGetFilmsBySearchTerm"
      >
        <template v-if="searchTerm" #trailing>
          <UButton
            icon="i-mdi-close"
            color="neutral"
            variant="link"
            size="xs"
            @click="searchTerm = ''; getFilms()"
          />
        </template>
      </UInput>
    </div>

    <!-- Loading skeleton -->
    <div v-if="!isDataLoaded" class="film-grid mt-5">
      <div v-for="i in 4" :key="i" class="skeleton-card">
        <div class="skeleton-image" />
        <div class="skeleton-body">
          <div class="skeleton-line skeleton-line--title" />
          <div class="skeleton-line skeleton-line--text" />
          <div class="skeleton-line skeleton-line--short" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-4">
      <div v-if="isSearchInvoked && films.length === 0" class="search-info">
        There are no films with the title "{{ searchTerm }}".
      </div>
      <div v-if="isSearchInvoked && films.length > 0" class="search-info mb-3">
        There are <strong>{{ films.length }}</strong> films found by search "{{ searchTerm }}".
      </div>

      <div class="film-grid">
        <div
          v-for="(film, key) in films"
          :key="key"
          class="film-card"
          :style="{ '--delay': `${key * 80}ms` }"
        >
          <div
            class="film-header"
            :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(${film?.still_url});`"
          >
            <div class="film-overlay">
              <div class="flex justify-between items-center mb-2">
                <div class="rating-stars">
                  <template v-for="index in 5" :key="index">
                    <UIcon
                      v-if="index <= film.overall"
                      name="i-mdi-star"
                      class="star-icon"
                      size="16"
                    />
                    <UIcon
                      v-else
                      name="i-mdi-star-outline"
                      class="star-icon star-outline"
                      size="16"
                    />
                  </template>
                </div>
                <div class="duration-badge">
                  <UIcon name="i-mdi-clock-outline" size="16" />
                  <span>{{ film?.duration }}</span>
                </div>
              </div>

              <div class="film-info">
                <span v-if="!isSearchInvoked" class="film-number">
                  #{{ filmStatsData.totalFilms - key }}
                </span>
                <h3 class="film-title">
                  {{ film?.title ? film.title.toUpperCase() : '' }}
                </h3>
                <div class="film-meta">
                  <template v-for="(director, dKey) in film.directors" :key="dKey">
                    <span class="director-name">
                      {{ director ? director.toUpperCase() : '' }}{{ dKey < film.directors.length - 1 ? ', ' : '' }}
                    </span>
                  </template>
                  <span class="meta-separator">&bull;</span>
                  <template v-for="(country, cKey) in film.historic_countries" :key="cKey">
                    <span class="country-name">
                      {{ country ? country.toUpperCase() : '' }}{{ cKey < film.historic_countries.length - 1 ? ', ' : '' }}
                    </span>
                  </template>
                  <span class="meta-separator">&bull;</span>
                  <span class="year">{{ film?.year }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="film-footer">
            <p class="synopsis">{{ film?.short_synopsis }}</p>
            <div class="footer-meta">
              <span class="watched-date">
                <UIcon name="i-mdi-calendar" size="12" class="mr-1" />
                {{ new Date(film?.created_at).toLocaleDateString('en-GB') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UModal v-model:open="isStatsDialogOpen">
      <template #content>
        <FilmStats
          :film-stats-data="filmStatsData"
          :is-stats-data-loaded="isStatsDataLoaded"
          @close="isStatsDialogOpen = false"
        />
      </template>
    </UModal>

    <div v-if="!isSearchInvoked" class="text-center mt-5">
      <UIcon name="i-mdi-loading" class="animate-spin text-2xl text-white/30" />
    </div>
    <div class="bottom-spacer" />
    <div ref="bottomElement" />
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import FilmStats from '~/components/common/FilmStats.vue'
import type { IFilm, IFilmStatsData, IDirectorStats } from '~/types/models'

definePageMeta({ layout: 'blog' })

useHead({
  title: 'Films I\'ve Watched — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/list-of-seen-films' }],
})

useSeoMeta({
  description: 'Collection of films watched by Ilhan Kalač since 2016.',
  ogType: 'website',
  ogTitle: 'Films I\'ve Watched — Ilhan Kalač',
  ogDescription: 'Collection of films watched by Ilhan Kalač since 2016.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/list-of-seen-films',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Films I\'ve Watched — Ilhan Kalač',
  twitterDescription: 'Collection of films watched by Ilhan Kalač since 2016.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

const { getVal, getValWithSearchTerm } = useFirebase()

const isDataLoaded = ref(false)
const films = ref<IFilm[]>([])
const isStatsDialogOpen = ref(false)
const searchTerm = ref('')
const bottomElement = ref<HTMLElement | null>(null)
const isBottomReached = ref(false)

const filmStatsData = ref<IFilmStatsData>({ totalFilms: 0, directorStats: [] })
const isStatsDataLoaded = ref(false)
const isSearchInvoked = ref(false)

const getFilms = () => {
  isSearchInvoked.value = false
  getVal('listOfSeenfilms', 10).then((val: any) => {
    if (val) {
      isDataLoaded.value = true
      films.value = val
    }
  })
}

const getFilmsStats = () => {
  getVal('filmStats').then((val: any) => {
    if (val) {
      filmStatsData.value = val as IFilmStatsData
      filmStatsData.value.directorStats = filmStatsData.value.directorStats.sort(
        (a: IDirectorStats, b: IDirectorStats) => b.count - a.count
      )
      isStatsDataLoaded.value = true
    }
  })
}

const getFilmsBySearchTerm = () => {
  if (searchTerm.value && searchTerm.value.length > 1) {
    isSearchInvoked.value = true
    isDataLoaded.value = false
    getValWithSearchTerm('listOfSeenfilms', searchTerm.value).then((val: any) => {
      if (val) {
        films.value = Object.values(val) as IFilm[]
        films.value.sort((a: IFilm, b: IFilm) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        isDataLoaded.value = true
      }
    })
  } else {
    getFilms()
  }
}

const debouncedGetFilmsBySearchTerm = debounce(getFilmsBySearchTerm, 500)

const onBottomReached = () => {
  if (searchTerm.value || isSearchInvoked.value) return

  isBottomReached.value = true
  getVal('listOfSeenfilms', 10, films.value.length.toString()).then((val: any) => {
    if (val && Array.isArray(val)) {
      films.value = films.value.concat(val)
      isBottomReached.value = false
    }
  })
}

let observer: IntersectionObserver | null = null

const openStatsDialog = () => {
  getFilmsStats()
  isStatsDialogOpen.value = true
}

onMounted(() => {
  getFilms()
  getFilmsStats()
  window.scrollTo(0, 0)

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onBottomReached()
      }
    })
  })

  if (bottomElement.value) {
    observer.observe(bottomElement.value)
  }
})

onBeforeUnmount(() => {
  if (observer && bottomElement.value) {
    observer.unobserve(bottomElement.value)
  }
})
</script>

<style scoped lang="scss">
/* Section header */
.list-header {
  padding-bottom: 1.25rem;
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

.list-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  line-height: 1.6;
}

.stats-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.stats-icon {
  font-size: 0.85rem;
  color: #818cf8;
}

/* Search */
.search-wrap {
  display: flex;
  gap: 0.5rem;
}

.search-info {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Grid */
.film-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

/* Film Card */
.film-card {
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
  }
}

.film-header {
  position: relative;
  min-height: 200px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.film-overlay {
  position: absolute;
  inset: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Rating Stars */
.rating-stars {
  display: flex;
  gap: 2px;
}

.star-icon {
  color: #fbbf24;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.star-outline {
  color: rgba(255, 255, 255, 0.5);
}

/* Duration Badge */
.duration-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  color: white;
  font-size: 0.85rem;
  font-weight: 300;
}

/* Film Info */
.film-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.film-number {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.film-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.film-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.875rem;
  line-height: 1.4;
}

.director-name {
  font-weight: 500;
}

.country-name,
.year {
  font-weight: 300;
}

.meta-separator {
  color: rgba(255, 255, 255, 0.5);
}

/* Footer */
.film-footer {
  padding: 1rem 1.25rem;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.synopsis {
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.6;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer-meta {
  display: flex;
  align-items: center;
  padding-top: 8px;
}

.watched-date {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.7rem;
  font-weight: 400;
}

/* Skeleton */
.skeleton-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
}

.skeleton-image {
  min-height: 200px;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-body {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 0.75rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;

  &--title { width: 70%; height: 0.85rem; }
  &--text { width: 100%; }
  &--short { width: 35%; }
}

/* Utility */
.bottom-spacer {
  height: 100px;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
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
