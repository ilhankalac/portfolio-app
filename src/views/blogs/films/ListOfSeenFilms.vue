<template>
  <div
    class="font-weight-light text-white"
    :class="smAndDown ? 'text-h6' : 'text-h5'"
  >
    List of seen films
  </div>
  <div class="font-weight-light text-white" style="opacity: 0.6">
    Collection of films I have seen since 2016.
  </div>
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader v-for="index in 5" color="primary" type="article" />
      </v-col>
    </v-row>
  </v-container>
  <v-row class="d-flex justify-center">
    <v-col class="pa-0 my-2" cols="12" v-for="(film, key) in films" :key="key">
      <v-card
        color="primary"
        class="pa-4 d-flex flex-column justify-space-between"
        :style="`min-height: 200px; background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.film?.still_url}); background-size: cover; background-position: center;`"
      >
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
      </v-card>
    </v-col>
  </v-row>
  <div class="text-center mt-5">
    <v-progress-circular v-model="isBottomReached" indeterminate color="white" />
  </div>
  <div style="height: 100px;"></div>
  <div ref="bottomElement" />
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const isDataLoaded: Ref<Boolean> = ref(false);
const films: any = ref([]);

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
