<template>
  <div class="bg-slate-900 text-white p-4 rounded-lg">
    <div v-if="!isStatsDataLoaded" class="flex flex-col gap-3">
      <USkeleton v-for="i in 2" :key="i" class="h-24 w-full" />
    </div>
    <template v-else>
      <!-- Stats overview -->
      <div class="flex flex-col md:flex-row">
        <div class="stat-item">
          <span class="text-2xl md:text-3xl font-bold">{{ filmStatsData?.totalFilms }}</span>
          <span class="stat-label text-xs uppercase tracking-wider">
            <UIcon name="i-mdi-movie-open-outline" /> Total
          </span>
        </div>
        <hr class="border-white/10 md:hidden my-2" />
        <div class="hidden md:block w-px bg-white/10" />
        <div class="stat-item">
          <span class="text-2xl md:text-3xl font-bold">{{ filmStatsData?.totalWatchTime }}</span>
          <span class="stat-label text-xs uppercase tracking-wider">
            <UIcon name="i-mdi-clock-time-eight-outline" /> Hours
          </span>
        </div>
        <hr class="border-white/10 md:hidden my-2" />
        <div class="hidden md:block w-px bg-white/10" />
        <div class="stat-item">
          <span class="text-2xl md:text-3xl font-bold">{{ filmStatsData?.averageFilmYear }}</span>
          <span class="stat-label text-xs uppercase tracking-wider">
            <UIcon name="i-mdi-calendar-badge" /> Average year
          </span>
        </div>
        <hr class="border-white/10 md:hidden my-2" />
        <div class="hidden md:block w-px bg-white/10" />
        <div class="stat-item">
          <span class="text-2xl md:text-3xl font-bold">{{ filmStatsData?.averageRating }}</span>
          <span class="stat-label text-xs uppercase tracking-wider">
            <UIcon name="i-mdi-star-outline" /> Average rating
          </span>
        </div>
      </div>
      <hr class="border-white/10 my-4" />

      <!-- Director stats -->
      <div class="mb-8">
        <div class="text-white mt-4 text-xs uppercase tracking-wider">
          Count of watched films ordered by directors
        </div>
        <div class="max-h-[200px] overflow-y-auto pr-2 mt-2">
          <div v-for="(director, index) in filmStatsData?.directorStats" :key="index" class="flex justify-between text-white/60 text-sm">
            <span class="font-light">{{ `${index + 1}. ${director?.name}` }}</span>
            <div class="text-white">
              <UIcon name="i-mdi-eye-outline" class="mr-1" />
              <span>{{ director?.count }}</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-white/10 my-4" />

      <!-- Country stats -->
      <div class="mb-8">
        <div class="text-white mt-4 text-xs uppercase tracking-wider">
          Count of watched films ordered by countries
        </div>
        <div class="max-h-[200px] overflow-y-auto pr-2 mt-2">
          <div v-for="(country, index) in filmStatsData?.countries" :key="index" class="flex justify-between text-sm">
            <span class="font-light text-white/60">{{ `${index + 1}. ${country?.name}` }}</span>
            <span class="flex items-center">
              <UIcon name="i-mdi-eye-outline" class="mr-1" /> {{ country?.count }}
            </span>
          </div>
        </div>
      </div>
      <hr class="border-white/10 my-4" />

      <!-- Longest films -->
      <div>
        <div class="text-white mt-4 text-xs uppercase tracking-wider">
          Top 20 Longest Films I've Watched
        </div>
        <div class="max-h-[200px] overflow-y-auto pr-2 mt-2">
          <div v-for="(longFilm, index) in filmStatsData?.longestFilm" :key="index" class="flex justify-between text-sm">
            <span class="font-light text-white/60">{{ `${index + 1}. ${longFilm?.title || 'Unknown Title'}` }}</span>
            <span class="flex items-center">
              <UIcon name="i-mdi-clock-time-four-outline" class="mr-1" /> {{ longFilm?.duration || 0 }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <div class="mt-4">
      <UButton variant="outline" color="neutral" block @click="emit('close')">Close</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filmStatsData: any
  isStatsDataLoaded: boolean
}>()
const emit = defineEmits(['close'])
</script>

<style scoped>
.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: lighter;
  width: 200px;
  padding-top: 5px;
}

.stat-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
