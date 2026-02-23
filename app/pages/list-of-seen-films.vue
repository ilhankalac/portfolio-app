<template>
  <div>
    <div class="flex justify-between">
      <div class="font-light text-black opacity-70">
        Collection of films I have seen since 2016.
      </div>
      <div>
        <div class="flex flex-col">
          <UButton
            class="ml-auto"
            color="primary"
            icon="i-mdi-chart-bar"
            size="sm"
            variant="outline"
            @click="openStatsDialog"
          />
          <span class="text-black text-center font-light text-xs">Stats</span>
        </div>
      </div>
    </div>

    <div class="flex gap-2 mt-2">
      <UInput
        v-model="searchTerm"
        placeholder="Search criteria..."
        size="lg"
        class="flex-1"
        :ui="{ base: 'bg-gray-100' }"
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

    <div v-if="!isDataLoaded" class="flex flex-col gap-2 mt-4">
      <USkeleton v-for="i in 5" :key="i" class="h-48 w-full rounded-xl" />
    </div>

    <div class="mt-4">
      <div v-if="isSearchInvoked && films.length === 0" class="text-black text-left font-light">
        There are no films with the title "{{ searchTerm }}".
      </div>
      <div v-if="isSearchInvoked && films.length > 0" class="text-black text-left font-light mb-2">
        There are <strong class="underline">{{ films.length }}</strong> films found by search {{ searchTerm }}.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="(film, key) in films"
          :key="key"
          class="film-card"
        >
          <div
            class="film-header"
            :style="`background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url(${film?.still_url});`"
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
      <UIcon name="i-mdi-loading" class="animate-spin text-2xl" />
    </div>
    <div class="bottom-spacer" />
    <div ref="bottomElement" />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import FilmStats from '~/components/common/FilmStats.vue'
import type { IFilm, IFilmStatsData, IDirectorStats } from '~/types/models'

definePageMeta({ layout: 'blog' })

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

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--color-secondary));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--color-neutral));
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Film Card Styles */
.film-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.film-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.1);
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
  font-size: 0.85rem;
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
  font-size: 0.85rem;
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
  padding: 16px;
  min-height: 120px;
  max-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.synopsis {
  margin: 0;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
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
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 400;
}

/* Utility Classes */
.bottom-spacer {
  height: 100px;
}
</style>
