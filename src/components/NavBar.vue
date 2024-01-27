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
    style="height: 10vh; background-color: rgba(0, 0, 0, 0.3); position:sticky; top:0; z-index: 1000;"
  >   
    <v-btn 
      :variant="clickedButton === '0' ? 'tonal' : 'text'" 
      @click="scrollToNextSection"
    >   
      Experience 
    </v-btn> 
    <v-btn 
      :variant="clickedButton === '1' ? 'tonal' : 'text'" 
    >
      PERSONAL INTERESTS
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

const scrollToNextSection = () => {
  const section2 = document.getElementById('section2');

  if (section2) {
    // Scroll to the top of Section 2
    window.scrollTo({
      top: section2.offsetTop,
      behavior: 'smooth', // Use smooth scrolling for a smoother transition
    });
  }
};
</script>