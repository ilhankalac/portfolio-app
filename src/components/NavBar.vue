<template>
    <div
        class="d-flex justify-end align-center"
        :class="smAndDown ? 'flex-column' : 'flex-row'"
        style="height: 10vh; background-color: rgba(0, 0, 0, 0.3); position:sticky; top:0; z-index: 1000; ;"
    >   
        <v-btn 
            :variant="clickedButton === '0' ? 'tonal' : 'text'" 
            @click="scrollToNextSection"
        >   
            WORK 
        </v-btn> 
        <v-btn 
            :variant="clickedButton === '1' ? 'tonal' : 'text'" 
            @click="changeThePage('1', 'Interests')"
        >
            PERSONAL INTERESTS
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'

const { smAndDown } = useDisplay()
const clickedButton: Ref<string> = ref('0')
const router = useRouter()

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