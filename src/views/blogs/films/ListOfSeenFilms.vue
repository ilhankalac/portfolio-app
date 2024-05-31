<template>
  <div class="d-flex justify-space-between">
    <div>
      <div
        class="font-weight-light text-white"
        :class="smAndDown ? 'text-h6' : 'text-h5'"
      >
        List of seen films
      </div>
      <div class="font-weight-light text-white opacity-60">
        Collection of films I have seen since 2016.
      </div>
    </div>
    <div>
      <div class="d-flex flex-column">
        <v-btn
          @click="openStatsDialog"
          class="ml-auto white-border"
          color="white"
          icon="mdi-chart-bar"
          size="small"
          variant="outlined"
        />
        <span class="text-white text-center font-weight-light small-font"
          >Stats</span
        >
      </div>
    </div>
  </div>
  <v-text-field
    v-model="searchTerm"
    variant="outlined"
    label="Search film by title..."
    color="white"
    bg-color="primary"
    clearable
    @click:clear="getFilms"
    @keyup="debouncedGetFilmsBySearchTerm"
  />
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader v-for="index in 5" color="primary" type="article" />
      </v-col>
    </v-row>
  </v-container>
  <v-row class="d-flex justify-center">
    <v-col
      class="pa-0 my-2 film-col"
      cols="12"
      v-for="(film, key) in films"
      :key="key"
    >
      <div
        color="primary"
        class="pa-2 d-flex flex-column justify-space-between film-header"
        :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.still_url});`"
      >
        <div class="d-flex justify-space-between align-center">
          <div>
            <template v-for="index in 5">
              <v-icon v-if="index <= film.overall" color="yellow" class="mr-1"
                >mdi-star</v-icon
              >
              <v-icon v-else color="white" class="mr-1"
                >mdi-star-outline</v-icon
              >
            </template>
          </div>
          <div
            class="text-white font-weight-light small-font text-shadow-primary"
          >
            <v-icon>mdi-clock-time-four-outline</v-icon> {{ film?.duration }}
          </div>
        </div>
        <div
          class="text-white mt-auto d-flex flex-column text-shadow-primary text-start"
        >
          <span class="font-weight-bold small-rem"
            >#{{ filmStatsData?.totalFilms - key }}</span
          >
          <span class="text-h5 font-weight-bold">{{
            film?.title ? film.title.toUpperCase() : ""
          }}</span>
          <div>
            <template v-for="(director, key) in film.directors">
              <span class="font-weight-regular small-rem">
                {{ director ? director.toUpperCase() : ""
                }}{{ key < film.directors.length - 1 ? ", " : "" }}
              </span> </template
            >&nbsp;
            <template v-for="(country, key) in film.historic_countries">
              <span class="font-weight-light small-rem">
                {{ country ? country.toUpperCase() : ""
                }}{{ key < film.historic_countries.length - 1 ? ", " : "" }}
              </span>
            </template>
            <span class="font-weight-light small-rem"
              >&nbsp;{{ film?.year }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="film-footer text-white pa-2 font-weight-light text-justify d-flex flex-column"
      >
        <span>{{ film?.short_synopsis }}</span>
        <span class="font-weight-light smallest-font opacity-60">
          {{ new Date(film?.created_at).toLocaleDateString("en-GB") }}
        </span>
      </div>
    </v-col>
  </v-row>

  <!-- Dialog -->
  <v-dialog v-model="isStatsDialogOpen" max-width="800">
    <FilmStats
      :filmStatsData="filmStatsData"
      :isStatsDataLoaded="isStatsDataLoaded"
      @close="isStatsDialogOpen = false"
    />
  </v-dialog>
  <div class="text-center mt-5">
    <v-progress-circular :value="isBottomReached" indeterminate color="white" />
  </div>
  <div class="bottom-spacer"></div>
  <div ref="bottomElement" />
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref } from "vue";
import { getVal, getValWithSearchTerm } from "@/services/DataService";
import { useDisplay } from "vuetify";
import FilmStats from "@/components/blogs/FilmStats.vue";
import { debounce } from "lodash";

const { smAndDown } = useDisplay();

const isDataLoaded: Ref<boolean> = ref(false);
const films: any = ref([]);
const isStatsDialogOpen: Ref<boolean> = ref(false);
const searchTerm: Ref<string> = ref("");

const getFilms = () => {
  getVal("listOfSeenfilms", 10).then((val) => {
    if (val) {
      isDataLoaded.value = true;
      films.value = val;
    }
  });
};
const bottomElement = ref(null);
const isBottomReached = ref(false);
const onBottomReached = () => {
  if (searchTerm.value !== "") return;

  isBottomReached.value = true;
  getVal("listOfSeenfilms", 10, films.value.length.toString()).then((val) => {
    if (val) {
      const newFilms = Object.values(val);
      films.value = films.value.concat(newFilms);
      isBottomReached.value = false;
    }
  });
};
// Initialize Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      onBottomReached();
    }
  });
});

const filmStatsData: any = ref({});
const isStatsDataLoaded: Ref<boolean> = ref(false);
const getFilmsStats = () => {
  getVal("filmStats").then((val) => {
    if (val) {
      filmStatsData.value = val;

      filmStatsData.value.directorStats =
        filmStatsData.value.directorStats.sort(
          (a: any, b: any) => b.count - a.count
        );
      isStatsDataLoaded.value = true;
    }
  });
};

const getFilmsBySearchTerm = () => {
  if (searchTerm.value && searchTerm.value.length > 3) {
    getValWithSearchTerm("listOfSeenfilms", searchTerm.value).then((val) => {
      if (val) {
        isDataLoaded.value = true;
        films.value = val;
      }
    });
  } else {
    getFilms();
  }
};

const debouncedGetFilmsBySearchTerm = debounce(getFilmsBySearchTerm, 500);

const openStatsDialog = () => {
  getFilmsStats();
  isStatsDialogOpen.value = true;
};

onMounted(() => {
  getFilms();
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
</style>
