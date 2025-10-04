<template>
  <v-card color="primary pa-4">
    <v-container v-if="!isStatsDataLoaded" fluid>
      <v-row>
        <v-col class="d-flex flex-column ga-3">
          <v-skeleton-loader
            v-for="index in 2"
            color="primary"
            type="article"
          />
        </v-col>
      </v-row>
    </v-container>
    <template v-else>
      <div
        class="stats-container"
        :class="smAndDown ? 'flex-column align-center' : ''"
      >
       
        <div class="stat-item">
          <span class="stat-value" :style="smAndDown ? 'font-size: 17px !important' : ''">{{ filmStatsData?.totalFilms }}</span>
          <span class="stat-label text-overline"
            ><v-icon>mdi-movie-open-outline</v-icon> Total</span
          >
        </div>
        <v-divider v-if="!smAndDown" vertical />
        <div v-else class="divider-container w-100">
          <v-divider />
        </div>
        <div class="stat-item">
          <span class="stat-value" :style="smAndDown ? 'font-size: 17px !important' : ''">{{ filmStatsData?.totalWatchTime }}</span>
          <span class="stat-label text-overline"
            ><v-icon>mdi-clock-time-eight-outline</v-icon> Hours</span
          >
        </div>
        <v-divider v-if="!smAndDown" vertical />
        <div v-else class="divider-container w-100">
          <v-divider />
        </div>
        <div class="stat-item">
          <span class="stat-value" :style="smAndDown ? 'font-size: 17px !important' : ''">{{ filmStatsData?.averageFilmYear }}</span>
          <span class="stat-label text-overline"
            ><v-icon>mdi-calendar-badge</v-icon> Average year</span
          >
        </div>
        <v-divider v-if="!smAndDown" vertical />
        <div v-else class="divider-container w-100">
          <v-divider />
        </div>
        <div class="stat-item">
          <span class="stat-value" :style="smAndDown ? 'font-size: 17px !important' : ''">{{ filmStatsData?.averageRating }}</span>
          <span class="stat-label text-overline"
            ><v-icon>mdi-star-outline</v-icon> Average rating</span
          >
        </div>
      </div>
      <v-divider />
      <div class="mb-8">
        <div class="text-white mt-4 text-overline">
          Count of watched films ordered by directors
        </div>
        <div style="max-height: 200px; overflow-y: auto" class="pr-2">
          <template v-for="(director, index) in filmStatsData?.directorStats">
            <div class="d-flex justify-space-between text-greyText" style="font-size: smaller">
              <span class="font-weight-light"
                >{{ `${index + 1}. ${director?.name}` }}
              </span>
              <div class="text-white">
                <v-icon class="mr-1">mdi-eye-outline</v-icon>
                <span>{{ director?.count }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <v-divider />
      <div class="mb-8">
        <div class="text-white mt-4 text-overline">
          Count of watched films ordered by countries
        </div>
        <div style="max-height: 200px; overflow-y: auto" class="pr-2">
          <template v-for="(country, index) in filmStatsData?.countries">
            <div class="d-flex justify-space-between" style="font-size: smaller">
              <span class="font-weight-light text-greyText"
                >{{ `${index + 1}. ${country?.name}` }}
              </span>
              <span class="d-flex align-center">
                <v-icon class="mr-1">mdi-eye-outline</v-icon> {{ country?.count }}</span
              >
            </div>
          </template>
        </div>
      </div>
      <v-divider />
      <div>
        <div class="text-white mt-4 text-overline">
          Top 20 Longest Films I've Watched
        </div>
        <div style="max-height: 200px; overflow-y: auto" class="pr-2">
          <template v-for="(longFilm, index) in filmStatsData?.longestFilm">
            <div class="d-flex justify-space-between" style="font-size: smaller">
              <span class="font-weight-light text-greyText"
                >{{ `${index + 1}. ${longFilm?.title || 'Unknown Title'}` }}
              </span>
              <span class="d-flex align-center">
                <v-icon class="mr-1">mdi-clock-time-four-outline</v-icon> {{ longFilm?.duration || 0 }}</span
              >
            </div>
          </template>
        </div>
      </div>
     
    </template>
    <v-card-actions class="pa-0 mt-2">
      <v-btn variant="outlined" block @click="emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps<{
  filmStatsData: any;
  isStatsDataLoaded: boolean;
}>();
const emit = defineEmits(["close"]);
</script>

<style scoped>
.stats-container {
  display: flex;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: lighter;
  width: 200px;
  padding-top: 5px
}

.stat-value {
  font-size: x-large;
  font-weight: bold;
}

.stat-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgb(var(--v-theme-greyText));
}
</style>
