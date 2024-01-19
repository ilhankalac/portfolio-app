<template>
    <div class="container">
        <div 
            class="content" 
            :style="smAndDown ? 'font-size: 15px' : 'font-size:19px'"
        >
            <!-- Your text goes here -->
            <div :class="smAndDown ? 'text-center' : 'text-left'">
                <span 
                    class="font-weight-bold"
                    style="font-family: 'Be Vietnam Pro', sans-serif;"
                    :style="smAndDown ? 'font-size: 30px' : 'font-size:70px'"
                >
                    Ilhan Kalač
                </span>
                <p 
                    style="opacity:0.6; font-family: 'Bebas Neue', sans-serif;"
                    :style="smAndDown ? 'font-size: 15px' : 'font-size:30px'"
                    class="text-center"
                >
                   Frontend Developer
                </p>
                <div class="d-flex justify-center mt-4 ga-1">
                    <v-btn
                        flat
                        variant="text"
                        icon="mdi-github"
                        @click="openLink('https://github.com/ilhankalac')"
                    />
                    <v-btn
                        flat
                        variant="text"
                        icon="mdi-linkedin"
                        @click="openLink('https://www.linkedin.com/in/ilhankalac/')"
                    />
                </div>
            </div>
        </div>
        <div style="min-height: 100vh;">
            <img src="@/assets/landing-image.jpg" alt="Background Image" class="background-image" />
            <NavBar />
        </div>
    </div>
</template>


<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const openLink = (link: string) => {
    window.open(link);
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500&display=swap');
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6; /* Adjust the opacity as needed */
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white; /* Adjust the text color as needed */
  z-index: 1;
}
</style>
