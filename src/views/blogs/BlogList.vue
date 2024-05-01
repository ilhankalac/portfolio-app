<template>
  <div class="font-weight-light text-white" :class="smAndDown ? 'text-h6' : 'text-h5'">
    Blog list
  </div>
  <template v-for="(blog, key) in blogs">
    <v-card
      style="flex-grow: 1 !important; cursor: pointer;"
      color="primary"
      class="pa-4 my-2"
      @click="openBlog(blog, key)"
    >
      <div>
        <span class="font-weight-light text-white">{{ blog.title }}</span>
      </div>
    </v-card>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVal } from "@/services/DataService";
import router from "@/router";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const blogs: any = ref([]);
const getBlogs = () => {
  getVal("blog/posts").then((val) => {
    if (val) {
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
