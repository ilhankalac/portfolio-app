<template>
  <div class="font-weight-light text-black" style="opacity: 0.7;">
    Collection of my thoughts and knowledge shared with the world.
  </div>
  <v-container v-if="!isDataLoaded" fluid>
    <v-row>
      <v-col class="d-flex flex-column ga-3">
        <v-skeleton-loader v-for="index in 5" color="primary" type="article" />
      </v-col>
    </v-row>
  </v-container>
  <v-row class="mt-2 mx-n3">
    <v-col
      v-for="(blog, key) in blogs"
      :key="key"
      :cols="12"
      :sm="6"
      :md="4"
      :lg="3"
      class="px-3"
    >
      <v-card
        color="transparent"
        class="blog-card d-flex flex-column"
        elevation="0"
        @click="openBlog(blog, key)"
      >
        <div
          class="blog-header"
          :style="`background-image: url(${blog.image});`"
        >
          <div class="blog-overlay"></div>
        </div>
        <div class="pt-4 d-flex flex-column" style="flex: 1;">
          <h3 class="text-black mb-3 blog-title font-weight-light">
            {{ blog.title }}
          </h3>
          <div class="mt-auto d-flex justify-space-between align-center">
            <div class="text-black blog-author opacity-70">
              {{ blog.author }}
            </div>
            <div class="text-black blog-date">
              {{ blog.date }}
            </div>
          </div>
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
.blog-card {
  height: 100%;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .blog-header {
      transform: scale(1.05);
    }

    .blog-overlay {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
  }
}

.blog-header {
  position: relative;
  border-radius: 4px;
  height: 200px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  transition: background 0.35s ease;
}

.blog-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3.4rem;
}

.blog-author {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

.blog-date {
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.6;
  letter-spacing: 0.02em;
}
</style>