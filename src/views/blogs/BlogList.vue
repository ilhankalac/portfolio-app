<template>
  <div class="font-weight-light text-white opacity-60">
    Collection of my thoughts and knowledge shared with the world.
  </div>
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader
          v-for="index in 5"
          color="primary"
          type="article"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-row>
    <v-col 
      v-for="(blog, key) in blogs" :key="key"
      class="pa-0 mt-4"
      :class="key % 2 !== 0 && !smAndDown && blogs.length > 1 ? 'ml-4' : ''"
      :cols="smAndDown ? 12 : 5"
    >
      <v-card
        color="secondary"
        class="d-flex justify-space-between flex-column"
        elevation="2"
        style="min-height: 100px;"
        @click="openBlog(blog, key)"
      >
        <div
          class="d-flex justify-space-between align-center blog-header"
          style="position: relative; background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(https://www.kurir.rs/data/images/2022/03/04/16/2932445_screenshot-53_ls.jpg);"
        >
          <v-sheet color="white" class="px-2 text-overline font-weight-bold" style="position: absolute; bottom: 5px; right: 5px;">
            Satire
          </v-sheet>
        </div>
        <div class="pa-4">
          <span class="text-white font-weight-light" style="font-size: 1.2rem;">{{ blog.title }}</span> 
        </div>
        <div class="text-greyText d-flex justify-space-between px-4 pb-4" style="font-size: smaller;">
          <span>
            by <strong>{{ blog.author }} </strong>
          </span>
          <span style="opacity: 0.6;">
            {{ blog.date }}
          </span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import router from "@/router";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const isDataLoaded: Ref<Boolean> = ref(false);
const blogs: any = ref([]);
const getBlogs = () => {
  getVal("blog/posts").then((val) => {
    if (val) {
      isDataLoaded.value = true;
      blogs.value = val;
    }
  });
};

const openBlog = (blog: any, key: number) => {
  const keyAndTitle =
    blog.title.replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase() +
    "/key=" +
    key;
  router.push({ name: "BlogPage", params: { id: keyAndTitle } });
};

onMounted(() => {
  getBlogs();
});
</script>

<style scoped lang="scss">
.blog-header {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  min-height: 200px;
  background-size: cover;
  background-position: center;
}
</style>