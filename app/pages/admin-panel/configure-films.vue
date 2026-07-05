<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Films</h3>
      <div class="flex gap-2">
        <UButton
          icon="i-mdi-chart-bar"
          color="neutral"
          variant="outline"
          @click="generateStats"
        >
          Generate Stats
        </UButton>
        <UButton
          icon="i-mdi-download"
          color="neutral"
          variant="outline"
          @click="exportFilmsData"
        >
          Export Films Data
        </UButton>
      </div>
    </div>

    <!-- Stats summary -->
    <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-slate-800 border border-white/10 rounded-lg p-4 text-center">
        <p class="text-white/40 text-xs uppercase tracking-wider">Total Films</p>
        <p class="text-white text-2xl font-light mt-1">{{ stats.totalFilms }}</p>
      </div>
      <div class="bg-slate-800 border border-white/10 rounded-lg p-4 text-center">
        <p class="text-white/40 text-xs uppercase tracking-wider">Directors</p>
        <p class="text-white text-2xl font-light mt-1">{{ stats.directorStats?.length || 0 }}</p>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <UInput
        v-model="searchQuery"
        icon="i-mdi-magnify"
        placeholder="Search films..."
        class="max-w-md"
      />
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="bg-slate-800 border border-white/10 rounded-lg overflow-hidden">
        <USkeleton class="h-48 w-full" />
        <div class="p-3">
          <USkeleton class="h-4 w-32 mb-2" />
          <USkeleton class="h-3 w-24" />
        </div>
      </div>
    </div>

    <!-- Films grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(film, index) in filteredFilms"
        :key="index"
        class="bg-slate-800 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-colors"
      >
        <div
          class="h-48 bg-cover bg-center relative"
          :style="film.still_url ? { backgroundImage: `url(${film.still_url})` } : {}"
        >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-3">
            <span class="text-white/60 text-xs">#{{ index + 1 }}</span>
            <h4 class="text-white font-medium text-sm leading-tight">{{ film.title }}</h4>
          </div>
          <div v-if="film.overall" class="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
            {{ film.overall }}/10
          </div>
        </div>
        <div class="p-3">
          <p class="text-white/60 text-xs">
            <span v-if="film.directors">{{ Array.isArray(film.directors) ? film.directors.join(', ') : film.directors }}</span>
          </p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-white/40 text-xs">
              {{ film.year }}
              <span v-if="film.historic_countries"> &mdash; {{ Array.isArray(film.historic_countries) ? film.historic_countries.join(', ') : film.historic_countries }}</span>
            </span>
            <span v-if="film.duration" class="text-white/30 text-xs">{{ film.duration }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Load more -->
    <div v-if="!loading && films.length > 0" class="flex justify-center mt-6">
      <UButton
        v-if="hasMore"
        variant="outline"
        color="neutral"
        @click="loadMore"
      >
        Load More
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFilm, IFilmStatsData } from '~/types/models'

const { getVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const films = ref<IFilm[]>([])
const searchQuery = ref('')
const stats = ref<IFilmStatsData | null>(null)
const hasMore = ref(true)

const filteredFilms = computed(() => {
  if (!searchQuery.value) return films.value
  const query = searchQuery.value.toLowerCase()
  return films.value.filter(film => {
    const title = film.title?.toLowerCase() || ''
    const directors = Array.isArray(film.directors) ? film.directors.join(' ').toLowerCase() : ''
    const countries = Array.isArray(film.historic_countries) ? film.historic_countries.join(' ').toLowerCase() : ''
    return title.includes(query) || directors.includes(query) || countries.includes(query)
  })
})

const fetchFilms = async () => {
  loading.value = true
  try {
    const data = await getVal('listOfSeenfilms')
    if (data) {
      films.value = Array.isArray(data) ? data : Object.values(data)
    }
  } finally {
    loading.value = false
    hasMore.value = false
  }
}

const loadMore = async () => {
  // Films are loaded all at once from this composable
  hasMore.value = false
}

const generateStats = () => {
  if (!films.value.length) return

  const directorMap = new Map<string, number>()
  films.value.forEach(film => {
    if (film.directors) {
      const dirs = Array.isArray(film.directors) ? film.directors : [film.directors]
      dirs.forEach((d: string) => {
        directorMap.set(d, (directorMap.get(d) || 0) + 1)
      })
    }
  })

  const directorStats = Array.from(directorMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  stats.value = {
    totalFilms: films.value.length,
    directorStats,
  }
}

const exportFilmsData = () => {
  const json = JSON.stringify(films.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'films-data.json'
  link.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  fetchFilms()
})
</script>
