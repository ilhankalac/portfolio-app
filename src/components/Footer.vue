<template>
  <div style="background: rgb(var(--v-theme-primary))">
    <footer class="pa-10">
      <div :class="smAndDown ? 'd-flex flex-column ga-5' : 'd-flex text-white justify-space-around'">
        <div class="d-flex flex-column">
          <div class="text-overline text-white font-weight-bold">
            Navigation
          </div>
          <div class="d-flex text-white foot-links flex-wrap" :class="smAndDown ? 'ga-5' : 'flex-column font-weight-light'" style="font-size:smaller">
            <span>Home</span>
            <span>About</span>
            <span>Experience</span>
            <span>Recommendations</span>
            <span>Skills</span>
            <span>Get in touch</span>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="text-overline text-white font-weight-bold">
            Other interests
          </div>
          <div class="d-flex text-white foot-links" :class="smAndDown ? 'ga-5' : 'flex-column font-weight-light foot-links'" style="font-size:smaller">
            <span>Blog</span>
            <span>Projects</span>
            <span>Resume</span>
          </div>
        </div>
         <div class="d-flex flex-column">
          <div class="text-overline text-white font-weight-bold">
            Social Media
          </div>
          <div class="d-flex text-white foot-links" :class="smAndDown ? 'ga-5' : 'flex-column font-weight-light foot-links'" style="font-size:smaller">
            <span>LinkedIn</span>
            <span>GitHub</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
</script>

<style scoped lang="scss">
.foot-links {
  span {
    cursor: pointer;
    color: grey;
    &:hover {
      color: white;
    }
  }
}
</style>
