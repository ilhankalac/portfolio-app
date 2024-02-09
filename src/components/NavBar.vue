<template>
  <v-progress-linear
    v-if="!isDataLoaded"
    indeterminate
    color="secondary"
    style="z-index: 1100; position: absolute"
  />

  <div
    class="nav-bar"
    :style="isMenuClicked && smAndDown ? 'min-height: 22vh' : 'min-height: 8vh'"
    :class="smAndDown ? 'flex-column' : 'd-flex justify-space-around align-center'"
  >
    <div v-if="smAndDown" class="d-flex flex-row justify-space-between pa-5">
      <div class="text-darkText text-subtitle font-weight-bold mt-2">I K</div>
      <div v-show="smAndDown">
        <v-btn variant="text" @click="isMenuClicked = !isMenuClicked">
          <v-icon>
            {{ isMenuClicked ? "mdi-close" : "mdi-menu" }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="!smAndDown" class="text-darkText text-subtitle font-weight-bold">I K</div>
    <div 
      v-if="(smAndDown && isMenuClicked) || !smAndDown"
      class="d-flex align-center"
      :class="smAndDown ? 'flex-column justify-center' : 'justify-center'"
    >
      <v-btn
        :variant="clickedButton === '0' ? 'tonal' : 'text'"
        @click="scrollToNextSection('section2')"
      >
        About Me
      </v-btn>
      <v-btn
        :variant="clickedButton === '1' ? 'tonal' : 'text'"
        @click="scrollToNextSection('section3')"
      >
        Experience
      </v-btn>
      <v-btn
        :variant="clickedButton === '1' ? 'tonal' : 'text'"
        @click="scrollToNextSection('section4')"
      >
        Skills
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useDisplay } from "vuetify";
import { useRoute, useRouter } from "vue-router";

const { smAndDown } = useDisplay();
const clickedButton: Ref<string> = ref("");
const router = useRouter();

const isDataLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    isDataLoaded.value = true;
  }, 1000);
});
const isMenuClicked = ref(false);

const changeThePage = (buttonNumber: string, pageName: string) => {
  clickedButton.value = buttonNumber;
  router.push({ name: pageName });
};

const scrollToNextSection = (sectionName: string = "") => {
  const section = document.getElementById(sectionName);

  if (section) {
    // Scroll to the top of Section 2
    window.scrollTo({
      top: section.offsetTop - window.innerHeight * 0.08,
      behavior: "smooth",
    });
    isMenuClicked.value = false;
  }
};
</script>

<style scoped>
.nav-bar {
  min-height: 8vh;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  min-width: 100%;
  top: 0;
  color: rgb(var(--v-theme-darkText));
  z-index: 1200;
}
</style>
