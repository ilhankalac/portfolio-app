<template>
  <div class="d-flex justify-space-between">
    <div class="font-weight-light text-black" style="opacity: 0.7;">
      Collection of films I have seen since 2016.
    </div>
    <div>
      <div class="d-flex flex-column">
        <v-btn
          @click="openStatsDialog"
          class="ml-auto"
          color="primary"
          icon="mdi-chart-bar"
          size="small"
          variant="outlined"
        />
        <span class="text-black text-center font-weight-light small-font">Stats</span>
      </div>
    </div>
  </div>
  <div class="d-flex ga-2">
    <v-text-field
      v-model="searchTerm"
      variant="outlined"
      density="comfortable"
      label="Search criteria..."
      color="primary"
      bg-color="grey-lighten-4"
      clearable
      @click:clear="getFilms"
      @keyup.enter="debouncedGetFilmsBySearchTerm"
    />
    <v-date-input
      v-model="model"
      label="Select range"
      multiple="range"
      density="comfortable"
      variant="outlined"
      color="primary"
      clearable
      @update:modelValue="getFilmsByDateRange"
      @click:clear="getFilms"
    />
  </div>
  <div v-if="!isDataLoaded">
    <v-skeleton-loader 
      v-for="index in 5" 
      class="my-2" 
      color="primary" 
      type="article" 
    />
  </div>
  <v-container class="ma-0 pa-0" fluid>
    <div v-if="isSearchInvoked && films.length === 0" class="text-black text-left font-weight-light">
      There are no films with the title "{{ searchTerm }}".
    </div>
     <div v-if="isSearchInvoked && films.length > 0" class="text-black text-left font-weight-light">
      There are <strong style="text-decoration: underline;">{{ films.length }}</strong> {{ model.length > 0 ? 'films found within the selected date range.' : `films found by search ${searchTerm}.` }}
    </div>
    <v-row>
      <v-col
        v-for="(film, key) in films"
        class="pa-0 pb-3"
        :class="key % 2 !== 0 && !smAndDown && films.length > 1 ? 'pl-3' : ''"
        :cols="smAndDown ? 12 : 6"
        :key="key"
      >
        <div class="film-card">
          <div
            class="film-header"
            :style="`background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url(${film?.still_url});`"
          >
            <div class="film-overlay">
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="rating-stars">
                  <template v-for="index in 5">
                    <v-icon
                      v-if="index <= film.overall"
                      class="star-icon"
                      size="small"
                    >
                      mdi-star
                    </v-icon>
                    <v-icon v-else class="star-icon star-outline" size="small">
                      mdi-star-outline
                    </v-icon>
                  </template>
                </div>
                <div class="duration-badge">
                  <v-icon size="small">mdi-clock-outline</v-icon>
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
                  <template v-for="(director, key) in film.directors">
                    <span class="director-name">
                      {{ director ? director.toUpperCase() : ''}}{{ key < film.directors.length - 1 ? ', ' : '' }}
                    </span>
                  </template>
                  <span class="meta-separator">•</span>
                  <template v-for="(country, key) in film.historic_countries">
                    <span class="country-name">
                      {{ country ? country.toUpperCase() : '' }}{{ key < film.historic_countries.length - 1 ? ', ' : '' }}
                    </span>
                  </template>
                  <span class="meta-separator">•</span>
                  <span class="year">{{ film?.year }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="film-footer">
            <p class="synopsis">{{ film?.short_synopsis }}</p>
            <div class="footer-meta">
              <span class="watched-date">
                <v-icon size="x-small" class="mr-1">mdi-calendar</v-icon>
                {{ new Date(film?.created_at).toLocaleDateString("en-GB") }}
              </span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="isStatsDialogOpen" max-width="800">
    <FilmStats
      :filmStatsData="filmStatsData"
      :isStatsDataLoaded="isStatsDataLoaded"
      @close="isStatsDialogOpen = false"
    />
  </v-dialog>
  <div  class="text-center mt-5">
    <v-progress-circular v-if="!isSearchInvoked" :value="isBottomReached" indeterminate color="primary" />
  </div>
  <div class="bottom-spacer"></div>
  <div ref="bottomElement" />
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";
import { debounce } from "lodash";
import { getVal, getValWithSearchTerm } from "@/services/DataService";
import FilmStats from "@/components/blogs/FilmStats.vue";
import { VDateInput } from 'vuetify/labs/VDateInput'
import { IFilm, IFilmStatsData, IDirectorStats } from "@/types/other";
// Display properties
const { smAndDown } = useDisplay();

// Reactive state variables
const isDataLoaded: Ref<boolean> = ref(false);
const films: Ref<IFilm[]> = ref([]);  // Use the Film interface here
const isStatsDialogOpen: Ref<boolean> = ref(false);
const searchTerm: Ref<string> = ref("");
const bottomElement = ref(null);
const isBottomReached: Ref<boolean> = ref(false);

const filmStatsData: Ref<IFilmStatsData> = ref({ totalFilms: 0, directorStats: [] });
const isStatsDataLoaded: Ref<boolean> = ref(false);
const isSearchInvoked: Ref<boolean> = ref(false);
const model = ref<string[]>([]);

// Fetch functions
const getFilms = () => {
  isSearchInvoked.value = false;
  getVal("listOfSeenfilms", 10).then((val) => {
    if (val) {
      isDataLoaded.value = true;
      films.value = val;
    }
  });
};

const getFilmsStats = () => {
  getVal("filmStats").then((val) => {
    if (val) {
      filmStatsData.value = val as IFilmStatsData;
      filmStatsData.value.directorStats = filmStatsData.value.directorStats.sort(
        (a: IDirectorStats, b: IDirectorStats) => b.count - a.count
      );
      isStatsDataLoaded.value = true;
    }
  });
};

const getFilmsBySearchTerm = () => {
  if (searchTerm.value && searchTerm.value.length > 1) {
    model.value = []
    isSearchInvoked.value = true;
    isDataLoaded.value = false;
    getValWithSearchTerm("listOfSeenfilms", searchTerm.value).then((val) => {
      if (val) {
        films.value = Object.values(val) as IFilm[];
        // Sort search results by date (newest first)
        films.value.sort((a: IFilm, b: IFilm) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        isDataLoaded.value = true;
      }
    });
  } else {
    getFilms();
  }
};

const debouncedGetFilmsBySearchTerm = debounce(getFilmsBySearchTerm, 500);

const getFilmsByDateRange = () => {
  searchTerm.value = ''
  const firstDate = new Date(model.value[0])
  const lastDate = new Date(model.value[model.value.length - 1])
  isSearchInvoked.value = true;
  isDataLoaded.value = false;

  getVal("listOfSeenfilms").then((val) => {
    if (val) {
      films.value = val;
      films.value = films.value.filter((film: IFilm) => {
        const filmDate = new Date(film.created_at)
        return filmDate >= firstDate && filmDate <= lastDate
      });
      // Sort filtered results by date (newest first)
      films.value.sort((a: IFilm, b: IFilm) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      isDataLoaded.value = true;
    }
  });
};

// Scroll and load more functionality
const onBottomReached = () => {
  if (searchTerm.value || isSearchInvoked.value) return;

  isBottomReached.value = true;
  getVal("listOfSeenfilms", 10, films.value.length.toString()).then((val) => {
    if (val && Array.isArray(val)) {
      films.value = films.value.concat(val);
      isBottomReached.value = false;
    }
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      onBottomReached();
    }
  });
});

// Dialog open function
const openStatsDialog = () => {
  getFilmsStats();
  isStatsDialogOpen.value = true;
};

onMounted(() => {
  getFilms();
  getFilmsStats();
  window.scrollTo(0, 0);
  if (bottomElement.value) {
    observer.observe(bottomElement.value);
  }
});

onBeforeUnmount(() => {
  if (bottomElement.value) {
    observer.unobserve(bottomElement.value);
  }
});
</script>


<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-secondary));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-greyText));
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

:deep(.v-input__prepend) {
  display: none !important;
}
</style>
