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
        <div class="text-white logo">ilhandev</div>
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
      <div class="text-white logo">ilhandev</div>
    </div>
    <div 
      v-if="(smAndDown && isMenuClicked) || !smAndDown"
      class="d-flex"
      :class="smAndDown ? 'flex-column justify-center  slideOut' : 'justify-center'"
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
                :color="currentSection === item.sectionName ? 'grey' : 'white'"
                > mdi-chevron-right
              </v-icon>
              <span class="text-overline font-weight-light" :class="currentSection === item.sectionName ? 'text-grey' : 'text-white'">
                {{ item.name }}
              </span>
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
import { useRouter } from "vue-router";

const { smAndDown } = useDisplay();
const clickedButton: Ref<string> = ref("");
const router = useRouter();
const isMenuClicked = ref(false);
const currentSection: any = ref("section1");

const navButtons = [
  { id: "0", name: "Home", sectionName: "section1" },
  { id: "1", name: "About", sectionName: "section2" },
  { id: "2", name: "Experience", sectionName: "section3" },
  { id: "3", name: "Recommendations", sectionName: "section4" },
  { id: "4", name: "Get in Touch", sectionName: "section5" },
  { id: "5", name: "Skills", sectionName: "section6" },
];

const isDataLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    isDataLoaded.value = true;
  }, 1000);
});

const scrollToNextSection = (sectionName: string = "") => {
  const section = document.getElementById(sectionName);

  if (section) {
    window.scrollTo({
      top: section.offsetTop - window.innerHeight * 0.08,
      behavior: "smooth",
    });
    isMenuClicked.value = false;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if(currentSection.value !== '' &&  entry.target.getAttribute('id') !== 'shadow-host-companion')
          currentSection.value = entry.target.getAttribute('id');
      }
    });
  }, {
    root: null,
    // rootMargin: '0px 0px -10% 0px',
    threshold: 0.5
  });

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
});

</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.logo {
  font-family: 'Bebas Neue', sans-serif; 
  font-size: 1.5rem; 
  letter-spacing: 3px;
  text-shadow: 4px 2px rgb(var(--v-theme-primary));
}
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
