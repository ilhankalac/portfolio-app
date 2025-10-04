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
        <div
          class="pa-2 d-flex flex-column justify-space-between film-header film-col"
          color="primary"
          :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.still_url});`"
        >
          <div class="d-flex justify-space-between align-center">
            <div>
              <template v-for="index in 5">
                <v-icon 
                  v-if="index <= film.overall" 
                  class="mr-1"
                  color="yellow" 
                >
                  mdi-star
                </v-icon>
                <v-icon v-else class="mr-1" color="white">
                  mdi-star-outline
                </v-icon>
              </template>
            </div>
            <div class="text-white font-weight-light small-font text-shadow-primary">
              <v-icon>mdi-clock-time-four-outline</v-icon> {{ film?.duration }}
            </div>
          </div>
          <div class="text-white mt-auto d-flex flex-column text-shadow-primary text-start">
            <span
              v-if="!isSearchInvoked" 
              class="font-weight-bold small-rem"
            >
              {{ `#${filmStatsData.totalFilms - key}` }}
            </span>
            <span class="text-h5 font-weight-bold">
              {{ film?.title ? film.title.toUpperCase() : '' }}</span>
            <div>
              <template v-for="(director, key) in film.directors">
                <span class="font-weight-regular small-rem">
                  {{ director ? director.toUpperCase() : ''}} {{ key < film.directors.length - 1 ? ', ' : '' }}
                </span> 
              </template>
                &nbsp;
              <template v-for="(country, key) in film.historic_countries">
                <span class="font-weight-light small-rem">
                  {{ country ? country.toUpperCase() : '' }}{{ key < film.historic_countries.length - 1 ? ', ' : '' }}
                </span>
              </template>
              <span class="font-weight-light small-rem">
                &nbsp;{{ film?.year }}
              </span>
            </div>
          </div>
        </div>
        <div 
          style="min-height: 120px; max-height: 120px;"  
          class="film-footer text-white pa-2 font-weight-light text-justify d-flex flex-column justify-space-between"
        >
          <span>{{ film?.short_synopsis }}</span>
          <span class="font-weight-light smallest-font opacity-60">
            {{ new Date(film?.created_at).toLocaleDateString("en-GB") }}
          </span>
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

.opacity-60 {
  opacity: 0.6;
}

.white-border {
  border-color: white;
}

.small-font {
  font-size: small;
}

.small-rem {
  font-size: 0.9rem;
}

.text-shadow-primary {
  text-shadow: 1px 1px rgb(var(--v-theme-primary));
}

.film-col {
  box-shadow: 0 0 0 0.1px white;
  border-radius: 5px;
}

.film-header {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  min-height: 200px;
  background-size: cover;
  background-position: center;
}

.film-footer {
  background: rgb(var(--v-theme-secondary));
  font-size: small;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.smallest-font {
  font-size: 0.7rem;
}

.bottom-spacer {
  height: 100px;
}

:deep(.v-input__prepend) {
  display:none !important;
}
</style>
