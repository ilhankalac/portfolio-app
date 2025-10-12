<template>
  <v-card
    class="d-flex align-center justify-space-between"
    :class="{ 'flex-column': !smAndDown }"
    flat
    color="primary"
  >
    <v-avatar
      :size="smAndDown ? '120' : '200'"
      color="white"
      :class="{ 'ma-5': !smAndDown }"
    >
      <v-img alt="Avatar" src="@/assets/profile_photo.jpg"></v-img>
    </v-avatar>
    <div class="d-flex flex-column ga-2 ma-0 pa-0 text-greyText blog-links">
      <v-card-subtitle class="d-flex ga-3 font-weight-light">
        <v-icon> mdi-map-marker </v-icon> <a href="https://www.google.com/maps/place/Podgorica/@42.4320008,19.2558788,12z/data=!3m1!4b1!4m6!3m5!1s0x134de8079606867d:0x6bf78a76ea588ae9!8m2!3d42.4304196!4d19.2593642!16zL20vMDE3NHBy?hl=en&entry=ttu" class="blog-links" target="_blank">Montenegro, Podgorica</a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon> mdi-email </v-icon>
        <a class="font-weight-light blog-links" href="mailto:ilhandeveloper@gmail.com">
          ilhandeveloper@gmail.com
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon> mdi-phone </v-icon>
        <a href="tel:+38268186196" class="blog-links"> +382 68 186 196 </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon> mdi-github </v-icon>
        <a href="https://github.com/ilhankalac" class="blog-links" target="_blank">@ilhankalac</a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon> mdi-linkedin </v-icon>
        <a href="https://www.linkedin.com/in/ilhankalac/" class="blog-links" target="_blank"
          >@ilhankalac
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon>mdi-instagram</v-icon>
        <a href="https://www.instagram.com/vizija/" class="blog-links" target="_blank">@vizija</a>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon>mdi-post</v-icon> <div @click="router.push({ path: 'blogs/list' })">Blogs</div>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon>mdi-format-quote-close</v-icon> <div @click="router.push({ path: 'favorite-quotes' })">Favorite quotes</div>
      </v-card-subtitle>
      <v-card-subtitle class="d-flex ga-3 font-weight-light blog-links">
        <v-icon>mdi-filmstrip</v-icon> <div @click="router.push({ path: 'list-of-seen-films' })">List of seen films</div>
      </v-card-subtitle>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import router from "@/config/router";
</script>

<style scoped>
a {
  color: rgb(var(--v-theme-greyText));
  text-decoration: none;
}

.blog-links:hover {
  color: white;
  cursor: pointer;
}
</style>
