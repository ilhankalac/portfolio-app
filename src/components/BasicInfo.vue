<template>
  <v-card
    class="d-flex align-center justify-space-between"
    :class="{ 'flex-column': !smAndDown }"
    flat
    color="secondary"
  >
    <v-avatar
      :size="smAndDown ? '120' : '200'"
      color="white"
      :class="{ 'ma-5': !smAndDown }"
    >
      <v-img
        alt="Avatar"
        src="https://media.licdn.com/dms/image/C4D03AQG6CeTFvdRjSA/profile-displayphoto-shrink_800_800/0/1658758059106?e=1709164800&v=beta&t=q38Ub1eSc1oIGqRBj8eDGcfuxN0n9_7_JmgjPb1ox9I"
      ></v-img>
    </v-avatar>
    <div class="d-flex flex-column ga-2 ma-0 pa-0">
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-map-marker </v-icon> Montenegro
      </v-card-subtitle>
      <v-card-subtitle d-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-email </v-icon>
        <a class="font-weight-light" href="mailto:ilhandeveloper@gmail.com">
          ilhandeveloper@gmail.com
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-phone </v-icon>
        <a href="tel:+38268186196" style="color: white; text-decoration: none">
          +382 68 186 196
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-github </v-icon>
        <a href="https://github.com/ilhankalac" target="_blank">@ilhankalac</a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-linkedin </v-icon>
        <a href="https://www.linkedin.com/in/ilhankalac/" target="_blank"
          >@ilhankalac
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon>mdi-instagram</v-icon>
        <a href="https://www.instagram.com/vizija/" target="_blank">@vizija</a>
      </v-card-subtitle>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
