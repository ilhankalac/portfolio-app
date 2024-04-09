<template>
    <div v-if="!isReady">
      <v-row>
        <v-col style="height: 100vh;" class="d-flex flex-column align-center justify-center">
          <div class="text-center">
            <span class="text-white">
              Loading your experience...
            </span><br>
            <v-skeleton-loader
              color="secondary"
              class="mx-auto border"
              type="heading"
              :min-width="smAndDown ? '400px' : '700px'"
            />
          </div>
        </v-col>
      </v-row>
    </div>
	  <router-view v-else />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();
const isReady = ref(false);

onMounted(() => {
  document.onreadystatechange = () => { 
    if (document.readyState == "complete") { 
      setTimeout(() => {
        isReady.value = true;
      }, 1000);
    } 
  }
})
</script>

<style>
:root {
  height: 100%;
}
body {
	background-color: rgba(var(--v-theme-primary));
  font-size: 1rem !important;
  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.9rem !important;
  }
}
</style>