<template>
  <v-layout class="rounded rounded-md bg-white">
    <v-main class="bg-white">
      <NavBar :origin="'configure'" />
      <v-container class="ma-0 pa-0" style="max-width: none;">
        <v-row>
          <img src="https://i.ibb.co/28dkxvJ/2023-05-24-07-36-IMG-9646.jpg" alt="" style="width: 100%; height: 200px; object-fit: cover;" />
        </v-row>
        <v-row class="bg-grey-lighten-4">
          <v-col v-if="!smAndDown" cols="3" />
          <v-col :cols="smAndDown ? 12 : 6" class="ma-0 pa-0">
            <v-tabs v-if="!smAndDown" v-model="tab" bg-color="grey-lighten-4" color="primary">
              <v-tab value="one" @click="openRoute('/blogs/list')" class="text-black"><v-icon>mdi-post</v-icon>Blog</v-tab>
              <v-tab value="three" @click="openRoute('/list-of-seen-films')" class="text-black"><v-icon>mdi-filmstrip</v-icon> Films</v-tab>
              <v-tab value="two" @click="openRoute('/favorite-quotes')" class="text-black"><v-icon>mdi-format-quote-close</v-icon> Favorite Quotes</v-tab>
            </v-tabs>
            <div v-else class="pa-4">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="d-flex justify-space-between text-black align-center">
                    <div>
                      <v-icon color="black">{{ tabIcon }}</v-icon> {{ tabLabel }}
                    </div>
                    <v-icon color="black">{{ `mdi-menu-${props['aria-expanded'] === 'true' ? 'up' : 'down'}` }}</v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in tabs" :key="index" :class="tab === item.tab ? 'font-weight-bold' : 'text-grey'">
                    <v-list-item-title @click="openRoute(item.path)">
                      <v-icon class="mr-4">{{ item.icon }}</v-icon> {{ item.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="ma-0 pa-0 bg-white" style="max-width: none; min-height: 70vh;">
        <v-row class="d-flex flex-row">
          <v-col :cols="smAndDown ? 0 : 3" class="d-flex flex-column align-center"></v-col>
          <v-col :cols="smAndDown ? 12 : 6">
            <router-view />
          </v-col>
          <v-col :cols="smAndDown ? 12 : 4" class="d-flex flex-column align-center"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { getVal } from '@/core/services/firebase.service';
import NavBar from '@/core/components/base/BaseNavigation.vue';

const { smAndDown } = useDisplay();
const router = useRouter();
const tab = ref('one');

const tabs = [
  { name: 'Blogs', path: '/blogs/list', icon: 'mdi-post', tab: 'one' },
  { name: 'Favorite Quotes', path: '/favorite-quotes', icon: 'mdi-format-quote-close', tab: 'two' },
  { name: 'Films', path: '/list-of-seen-films', icon: 'mdi-filmstrip', tab: 'three' },
];

const tabIcon = computed(() => tabs.find(t => t.tab === tab.value)?.icon);
const tabLabel = computed(() => tabs.find(t => t.tab === tab.value)?.name);

const openRoute = (path: string) => {
  tab.value = tabs.find(t => t.path === path)?.tab || 'one';
  router.push(path);
};

onMounted(() => {
  const path = '/' + router.currentRoute.value.path.split('/')[1];
  tab.value = tabs.find(t => t.path === path)?.tab || 'one';
});
</script>

<style scoped>
.card-item:hover {
  text-decoration: underline;
  cursor: pointer;
}
:deep(.v-card--variant-elevated) {
  box-shadow: 0px 2px 1px -1px rgba(255, 255, 255, 0.2), 0px 1px 1px 0px rgba(255, 255, 255, 0.14), 0px 1px 3px 0px rgba(255, 255, 255, 0.12);
}
:deep(.v-row) {
  margin: 0 !important;
}
</style>
