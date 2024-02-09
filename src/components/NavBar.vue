<template>
  <v-progress-linear
    v-if="!isDataLoaded"
    indeterminate
    color="secondary"
    style="z-index: 1100; position:absolute"
  />

  <div
    class="d-flex justify-space-around align-center nav-bar"
    :class="smAndDown ? 'flex-column' : 'flex-row'"
    style=""
  >
    <div class="text-darkText text-subtitle font-weight-bold">
      I K
    </div>
    <div>
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
import { onMounted, Ref, ref } from 'vue';
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'

const { smAndDown } = useDisplay()
const clickedButton: Ref<string> = ref('')
const router = useRouter()

const isDataLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isDataLoaded.value = true;
  }, 1000);
})
const changeThePage = (buttonNumber: string, pageName: string) => {
  clickedButton.value = buttonNumber;
  router.push({ name: pageName }); 
}

const scrollToNextSection = (sectionName: string = '') => {
  const section = document.getElementById(sectionName);

  if (section) {
    // Scroll to the top of Section 2
    window.scrollTo({
      top: section.offsetTop - window.innerHeight * 0.08,
      behavior: 'smooth', 
    });
  }
};
</script>

<style scoped>
.nav-bar{
  min-height: 8vh; 
  background-color: rgba(255, 255, 255, 1); 
  position:sticky; 
  top:0;
  color: rgb(var(--v-theme-darkText));
  z-index: 1200;
}

</style>