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
        class="pa-4 d-flex justify-space-between flex-column"
        style="min-height: 100px;"
      >
        <div>
          <span class="text-white text-h6">{{ film?.film?.title }}</span> 
        </div>
        <div class="text-greyText d-flex justify-space-between" style="font-size: smaller;">
          <span>
            {{ (films.length - key) + '. ' +  film?.film.genres[0] }}
          </span>
          <span>
            {{ film?.film?.year }}
          </span>
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
