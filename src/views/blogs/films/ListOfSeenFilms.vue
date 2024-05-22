<template>
  <div class="font-weight-light text-white" :class="smAndDown ? 'text-h6' : 'text-h5'">
    List of seen films
  </div>
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader
          v-for="index in 5"
          color="primary"
          type="article"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-row class="d-flex justify-center">
    <v-col class="pa-0 my-2" cols="12" v-for="(film, key) in films" :key="key">
      <v-card
        color="primary"
        class="pa-4 d-flex flex-column justify-space-between"
        :style="`min-height: 200px; background-image: url(${film?.film?.still_url}); background-size: cover; background-position: center;`"
      >
        <div 
          class="text-white mt-auto d-flex flex-column"
          style="text-shadow: 1px 1px rgb(var(--v-theme-primary)); text-align:start;"
        >
          <span class="font-weight-bold" style="font-size: 0.9rem;">
            #{{ films.length - key }}
          </span>
          <span class="text-h5 font-weight-bold">
            {{ film?.film?.title ? film.film.title.toUpperCase() : '' }} 
          </span>
          <div>
            <template v-for="(director, key) in film.film.directors">
              <span style="font-size: 0.8rem" class="font-weight-regular">
                {{ director.name ? director.name.toUpperCase() : '' }}{{ key < film.film.directors.length - 1 ? ', ' : '' }}
              </span>
            </template>&nbsp;
            <template v-for="(country, key) in film.film.historic_countries">
              <span style="font-size: 0.8rem" class="font-weight-light">
                {{ country ? country.toUpperCase() : '' }}{{ key < film.film.historic_countries.length - 1 ? ', ' : '' }}
              </span>
            </template>
            <span class="font-weight-light" style="font-size: 0.8rem">&nbsp;{{ film?.film?.year }}</span>
          </div>
        </div> 
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import router from "@/router";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const isDataLoaded: Ref<Boolean> = ref(false);
const films: any = ref([]);
const getFilms = () => {
  getVal("ratings").then((val) => {
    if (val) {
      isDataLoaded.value = true;
      films.value = val;
    }
  });
};


onMounted(() => {
  getFilms();
});
</script>
