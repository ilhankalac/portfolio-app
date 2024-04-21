<template>
  <v-card
    v-for="(blog, key) in blogs"
    style="flex-grow: 1 !important"
    color="secondary"
    class="pa-4"
    @click="openBlog(blog, key)"
  >
    <v-card-title>
      <span class="font-weight-light text-h6">{{ blog.title }}</span>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import router from "@/router";

const blogs = ref([]);
const getBlogs = () => {
  getVal("blog/posts").then((val) => {
    if (val) {
      blogs.value = val;
    }
  });
};

const openBlog = (blog, key) => {
  console.log(blog, key);

  
  
  const keyAndTitle = blog.title.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase() + "/key=" + key;

  console.log(keyAndTitle)
  
  router.push({ name: "BlogPage", params: { id: keyAndTitle } });
};

onMounted(() => {
  getBlogs();
});
</script>
