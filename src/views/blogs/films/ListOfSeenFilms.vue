<template>
  <div class="d-flex justify-space-between">
    <div>
      <div
        class="font-weight-light text-white"
        :class="smAndDown ? 'text-h6' : 'text-h5'"
      >
        List of seen films
      </div>
      <div class="font-weight-light text-white" style="opacity: 0.6">
        Collection of films I have seen since 2016.
      </div>
    </div>
    <div>
      <v-btn
        @click="openStatsDialog"
        class="ml-auto"
        color="white"
        style="border-color: white"
        icon="mdi-chart-bar"
        variant="outlined"
      />
    </div>
  </div>
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader v-for="index in 5" color="primary" type="article" />
      </v-col>
    </v-row>
  </v-container>
  <v-row class="d-flex justify-center">
    <v-col class="pa-0 my-2" cols="12" v-for="(film, key) in films" :key="key" style="box-shadow: 0 0 0 0.1px white; border-radius: 5px;">
      <div
        color="primary"
        class="pa-4 d-flex flex-column justify-space-between"
        style="border-top-right-radius: 5px; border-top-left-radius: 5px;"
        :style="`min-height: 200px; background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.film?.still_url}); background-size: cover; background-position: center;`"
      >
        <div>
          <template v-for="index in 5">
            <v-icon v-if="index <= film.overall" color="yellow" class="mr-1">mdi-star</v-icon>
            <v-icon v-else color="white" class="mr-1">mdi-star-outline</v-icon>
          </template>
        </div>
        <div
          class="text-white mt-auto d-flex flex-column"
          style="
            text-shadow: 1px 1px rgb(var(--v-theme-primary));
            text-align: start;
          "
        >
          <span class="font-weight-bold" style="font-size: 0.9rem">
            #{{ 1148 - key }}
          </span>
          <span class="text-h5 font-weight-bold">
            {{ film?.film?.title ? film.film.title.toUpperCase() : "" }}
          </span>
          <div>
            <template v-for="(director, key) in film.film.directors">
              <span style="font-size: 0.8rem" class="font-weight-regular">
                {{ director.name ? director.name.toUpperCase() : ""
                }}{{ key < film.film.directors.length - 1 ? ", " : "" }}
              </span> </template
            >&nbsp;
            <template v-for="(country, key) in film.film.historic_countries">
              <span style="font-size: 0.8rem" class="font-weight-light">
                {{ country ? country.toUpperCase() : ""
                }}{{
                  key < film.film.historic_countries.length - 1 ? ", " : ""
                }}
              </span>
            </template>
            <span class="font-weight-light" style="font-size: 0.8rem"
              >&nbsp;{{ film?.film?.year }}</span
            >
          </div>
        </div>
      </div>
      <div 
        style="background: rgb(var(--v-theme-secondary)); font-size: small; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;" 
        class="text-white pa-3 font-weight-light text-justify d-flex flex-column"
      >
        <span>{{ film?.film?.short_synopsis }}</span>
        <span class="font-weight-light" style="font-size: 0.7rem; opacity: 0.6;">
          <!-- format created_at for dd.mm.yyyy  -->
          {{ new Date(film?.created_at).toLocaleDateString("en-GB") }}
        </span>
      </div>
    </v-col>
  </v-row>

  <!-- Dialog -->
  <v-dialog v-model="isStatsDialogOpen" max-width="700">
    <FilmStats 
      :filmStatsData="filmStatsData"
      :isStatsDataLoaded="isStatsDataLoaded"
      @close="isStatsDialogOpen = false"
    />
  </v-dialog>
  <div class="text-center mt-5">
    <v-progress-circular :value="isBottomReached" indeterminate color="white" />
  </div>
  <div style="height: 100px;"></div>
  <div ref="bottomElement" />
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import { useDisplay } from "vuetify";
import FilmStats from "@/components/blogs/FilmStats.vue";

const { smAndDown } = useDisplay();

const isDataLoaded: Ref<Boolean> = ref(false);
const films: any = ref([]);
const isStatsDialogOpen: Ref<Boolean> = ref(false)

const getFilms = () => {
  getVal("ratings", 10).then((val) => {
    if (val) {
      isDataLoaded.value = true;
      films.value = val;
    }
  });
};
const bottomElement = ref(null);
const isBottomReached = ref(false);
const onBottomReached = () => {
  isBottomReached.value = true;
  getVal("ratings", 10, films.value.length.toString()).then((val) => {
    if (val) {
      const newFilms = Object.values(val);
      films.value = films.value.concat(newFilms);
      isBottomReached.value = false;
    }
  });
};
// Initialize Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onBottomReached();
      }
    });
  },
);

const filmStatsData: any = ref({});
const isStatsDataLoaded: Ref<Boolean> = ref(false);
const getFilmsStats = () => {
  getVal("filmStats").then((val) => {
    if (val) {
      filmStatsData.value = val;

      // sort director stats by count
      filmStatsData.value.directorStats = filmStatsData.value.directorStats.sort(
        (a: any, b: any) => b.count - a.count
      );
      isStatsDataLoaded.value = true;
    }
  });
};

const openStatsDialog = () => {
  getFilmsStats();
  isStatsDialogOpen.value = true;
};

onMounted(() => {
  getFilms();
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

</style>