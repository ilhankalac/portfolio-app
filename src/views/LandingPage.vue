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
      <div
        style="bottom: 0 !important; position: absolute; left: 50%; transform: translateX(-50%); z-index: 1000;"
        class="d-flex justify-center mb-5"
      >
        <svg
          :width="smAndDown ? '20' : '25'"
          :height="smAndDown ? '38.5' : '50'"
          viewBox="0 0 40 77"
          style="transform: translate(0px, 0px); opacity: 1; cursor: pointer;"
          @click="scrollToNextSection"
        >
          <g id="scroll" transform="translate(-253 -787)">
          <g
            id="Rectangle_12"
            data-name="Rectangle 12"
            transform="translate(253 787)"
            fill="none"
            stroke="#fff"
            stroke-width="4"
          >
            <rect width="40" height="77" rx="20" stroke="none"></rect>
            <rect
              x="2"
              y="2"
              width="36"
              height="73"
              rx="18"
              fill="none"
            ></rect>
          </g>
          <circle
            class="circle"
            id="Ellipse_1"
            data-name="Ellipse 1"
            cx="11"
            cy="11"
            r="11"
            transform="translate(262 798)"
            fill="#fff"
          ></circle>
          </g>
      </svg>
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

.circle {
  animation: circleAnim 1s infinite alternate-reverse;
}

@-webkit-keyframes circleAnim {
  from {
    -webkit-transform: translate(262px, 798px);
    transform: translate(262px, 798px);
    z-index: 5;
  }
  to {
    -webkit-transform: translate(262px, 830px);
    transform: translate(262px, 830px);
  }
}

@keyframes circleAnim {
  from {
    -webkit-transform: translate(262px, 798px);
    transform: translate(262px, 798px);
    z-index: 5;
  }
  to {
    -webkit-transform: translate(262px, 830px);
    transform: translate(262px, 830px);
  }
}
</style>
