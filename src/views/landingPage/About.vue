<template>
  <v-divider color="white" thickness="1" />
  <Section
    :class="'about-section'"
    :sectionId="'about'"
    header="About Me"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :textColor="'white'"
  > 
    <div class="font-weight-light text-justify">
      <div
        :class="smAndDown ? 'd-flex flex-column ga-5' : 'd-flex align-center ga-10'"
      >
        <div>
          <BasicInfo /> <br>
        </div>
        <v-divider :thickness="2" vertical color="white"/>
        <v-sheet style="background: linear-gradient(rgb(var(--v-theme-primary)));" class="text-greyText">

          <p>
            I am a software developer who is passionate about creating user-friendly web experiences, skilled in Vue.js and TypeScript, focusing on building responsive and modern web applications. <br /> <br />
            I have a Bachelor's degree of Applied Science in Electrical Engineering, completing my studies in Belgrade, Serbia. 
          </p>
          <br />
          <p>
            Although I initially started with C# and ASP.NET Core framework, my career shifted towards frontend development. <br /> <br />
            As a fully employed frontend developer at a company specializing in web applications, I am constantly advancing and refining my frontend expertise.
          </p>
          <br />
          <p>
            Apart from my work, I'm really into artsy movies, photography, diving into philosophical books, staying active with calisthenics, and always striving for self-improvement in every way possible. I firmly believe that the great things only come with the discipline.
          </p>
          <br />
          <p></p>
          <br />
        </v-sheet>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import Section from "@/components/landingPage/Section.vue";
import BasicInfo from "@/components/landingPage/BasicInfo.vue";
const { smAndDown } = useDisplay();
</script>

<style  scoped>
/* .about-section {
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 50%;
} */

/* @keyframes fade {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
} */
</style>