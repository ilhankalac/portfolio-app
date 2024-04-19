<template>
  <v-card
    v-for="blog in blogs"
    style="flex-grow: 1 !important"
    color="secondary"
    class="pa-4"
  >
    <v-card-title>
      <span class="font-weight-light text-h6">{{ blog.title }}</span>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";

const blogs = ref([]);
const getBlogs = () => {
  getVal("blog/posts").then((val) => {
    if (val) {
      blogs.value = val;
    }
  });
};

onMounted(() => {
  getBlogs();
});
</script>
