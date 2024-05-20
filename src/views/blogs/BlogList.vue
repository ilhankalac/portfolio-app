<template>
  <div class="font-weight-light text-white" :class="smAndDown ? 'text-h6' : 'text-h5'">
    Blog list
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
  <v-row class="d-flex justify-center">
    <v-col class="pa-0 my-2" cols="12" v-for="(blog, key) in blogs" :key="key">
      <v-card
        color="primary"
        class="pa-4 d-flex justify-space-between flex-column"
        style="min-height: 100px;"
        @click="openBlog(blog, key)"
      >
        <div>
          <span class="text-white text-h6">{{ blog.title }}</span> 
        </div>
        <div class="text-greyText d-flex justify-space-between" style="font-size: smaller;">
          <span>
            {{ blog.author }}
          </span>
          <span>
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
