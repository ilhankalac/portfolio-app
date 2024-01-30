<template>
  <v-sheet 
		id="section2"
		class="d-flex pa-16 text-white"
    style="height: 50vh; background-color: rgb(var(--v-theme-secondary));"
		:class="smAndDown ? 'flex-column justify-center' : 'flex-row justify-center'"
    :style="smAndDown ? 'height: 100vh;' : 'height: 50vh;'"
	>
    <div 
      class="d-flex ga-10 align-center font-weight-light "
      :class="smAndDown ? 'flex-column text-center' : 'justify-center text-justify'"
      :style="smAndDown ? 'max-width: 500px;' : 'max-width: 1000px;'"
    >
      <div
        style="white-space: nowrap; min-width: 200px;"
      >

          <span 
            class="text-h4 mb-2" 
          >
            About me
          </span>
      </div>
      <v-divider :thickness="2" vertical/>
      <v-sheet color="secondary">
        I'm Ilhan Kalač, a 26-year-old software developer currently based in Podgorica. 
        I pursued my education at a faculty in Belgrade, laying the groundwork for my tech journey. <br><br>
        Advanced proficiency in <strong>VueJS</strong> and <strong>Typescript</strong>, with a history of building intuitive and responsive web applications.<br> <br>
        Beyond coding, my interests span philosophy and the world of cinema. Let's weave together technology, creativity, and philosophy to craft exceptional digital experiences.
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();
</script>