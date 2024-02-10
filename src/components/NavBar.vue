<template>
  <v-progress-linear
    v-if="!isDataLoaded"
    indeterminate
    color="secondary"
    style="z-index: 1100; position: absolute"
  />

  <nav
    class="nav-bar"
    :style="isMenuClicked && smAndDown ? 'min-height: 42vh' : 'min-height: 6vh'"
    :class="smAndDown ? 'flex-column' : 'd-flex justify-space-around align-center'"
  >
    <div v-if="smAndDown" class="d-flex flex-row justify-space-between pa-5">
      <div class="text-darkText text-subtitle font-weight-bold">
        <v-avatar class="ml-5" :size="smAndDown ? 40 : 50" variant="outlined">
          <v-img src="@/assets/profile_photo.jpg" alt="avatar" />
        </v-avatar>
      </div>
      <div v-show="smAndDown">
        <v-btn color="white" variant="text" @click="isMenuClicked = !isMenuClicked">
          <v-icon>
            {{ isMenuClicked ? "mdi-close" : "mdi-menu" }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="!smAndDown" class="text-darkText text-subtitle font-weight-bold">
      <v-avatar :size="smAndDown ? 20 : 50" variant="outlined">
        <v-img src="@/assets/profile_photo.jpg" alt="avatar" />
      </v-avatar>
    </div>
    <div 
      v-if="(smAndDown && isMenuClicked) || !smAndDown"
      class="d-flex slideOut"
      :class="smAndDown ? 'flex-column justify-center' : 'justify-center'"
    > 
      <v-list :class="smAndDown ? '' : 'd-flex flex-row ga-1'" style="overflow-y: hidden; background-color: rgb(var(--v-theme-secondary));">
        <v-list-item
          v-for="(item, i) in navButtons"
          item-title="name"
          item-value="id"
          style="cursor: pointer"
          tabindex="0"
          class="text-white font-weight-light navbar-item"
          @click="scrollToNextSection(item.sectionName)"
        >
          <template v-slot:prepend>
            <v-list-item-icon>
              <v-icon
                v-if="smAndDown"
                class="text-center"
                color="white"
                > mdi-chevron-right
              </v-icon>
              {{ item.name }}
            </v-list-item-icon>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </nav>
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

const navButtons = [
  { id: "0", name: "Home", sectionName: "section0" },
  { id: "1", name: "About", sectionName: "section2" },
  { id: "2", name: "Experience", sectionName: "section3" },
  { id: "3", name: "Recommendations", sectionName: "section4" },
  { id: "4", name: "Skills", sectionName: "section5" },
];
</script>

<style scoped lang="scss">
.nav-bar {
  min-height: 6vh;
  background-color: rgb(var(--v-theme-secondary));
  position: fixed;
  min-width: 100%;
  top: 0;
  color: rgb(var(--v-theme-darkText));
  z-index: 1200;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
}

.slideOut {
  animation: slideOut 1s ease-in-out;
}

@keyframes slideOut {
  from {
    max-height: 1vh;
  }
  to {
    max-height: 42vh;
  }
}

.navbar-item {
  transition: 0.3s;
  border-radius: 0.5rem;
  &:hover {
    background-color: rgba(77, 84, 128, 0.1);
  }
}
</style>
