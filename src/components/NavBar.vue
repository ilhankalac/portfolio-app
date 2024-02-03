<template>
  <v-progress-linear
    v-if="!isDataLoaded"
    indeterminate
    color="secondary"
    style="z-index: 1100; position:absolute"
  />
  <div
    class="d-flex justify-end align-center"
    :class="smAndDown ? 'flex-column' : 'flex-row'"
    style="min-height: 10vh; background-color: rgba(0, 0, 0, 0.3); position:sticky; top:0; z-index: 1000;"
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
      top: section.offsetTop,
      behavior: 'smooth', 
    });
  }
};
</script>