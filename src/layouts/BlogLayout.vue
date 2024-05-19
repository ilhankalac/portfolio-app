<template>
  <v-layout class="rounded rounded-md">
    <v-main class="">
      <NavBar :origin="'configure'"/>
      <v-container style="max-width: none;" class="ma-0 pa-0">
        <div style="height: 6vh;"/>
        <v-row>
          <img style="width: 100%; height: 300px; object-fit: cover;" src="https://scontent.ftgd4-1.fna.fbcdn.net/v/t1.6435-9/124073549_2908129239406314_7933467529022298255_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dB0hm5hfFjkAb6IywO-&_nc_ht=scontent.ftgd4-1.fna&oh=00_AfCvmguktvmHraDvn16Rhm0FrN1j4iv1D3LMnkww0HrbNA&oe=664A3C2D" alt="">
        </v-row>
        <v-row style="background-color: rgba(var(--v-theme-secondary));">
          <v-col :cols="smAndDown ? 0 : 3" />
          <v-col class="ma-0 pa-0">
            <v-tabs
              v-model="tab"
              bg-color="secondary"
            >
              <v-tab value="one" @click="openRoute('/blogs/list')">Blogs list</v-tab>
              <v-tab value="two" @click="openRoute('/favorite-quotes')">Favorite Quotes</v-tab>
            </v-tabs>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
      <v-container style="max-width: none;" class="ma-0 pa-0">
        <v-row class="d-flex flex-row">
          <v-col :cols="smAndDown ? 0 : 3" class="d-flex flex-column align-center text-white">
            <v-btn
              v-if="$route.fullPath !== '/blogs/list' && $route.fullPath !== '/favorite-quotes'" 
              variant="text" 
              @click="router.push('/blogs/list')"
            >
              <v-icon class="mr-4">mdi-arrow-left</v-icon> Go to blog list
            </v-btn>
          </v-col>
          <v-col :cols="smAndDown ? 12 : 6">
            <router-view />
          </v-col>
          <v-col :cols="smAndDown? 12 : 4" class="d-flex flex-column align-center text-white">
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import BlogList from '@/views/blogs/BlogList.vue'
import { useDisplay } from "vuetify"
import { useRouter } from "vue-router"
import { getVal } from '@/services/DataService'
const { smAndDown } = useDisplay()

const router = useRouter()
const tab = ref('one')

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

const openRoute = (path: string) => {
  router.push(path)
}

onMounted(() => {
  getBlogs();
  if (router.currentRoute.value.path === '/blogs/list') {
    tab.value = 'one'
  } else if (router.currentRoute.value.path === '/favorite-quotes') {
    tab.value = 'two'
  }
});
</script>

<style scoped>
.card-item:hover {
  text-decoration: underline;
  cursor: pointer;
}
:deep(.v-card--variant-elevated){
  box-shadow: 0px 2px 1px -1px rgba(255, 255, 255, 0.2), 0px 1px 1px 0px rgba(255, 255, 255, 0.14), 0px 1px 3px 0px rgba(255, 255, 255, 0.12);
}

:deep(.v-row){
  margin: 0 !important;
}

</style>