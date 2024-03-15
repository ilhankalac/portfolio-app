<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      v-if="showNavigationDrawer"
      color="secondary"
    >
      <v-list v-model:opened="openedGroups">
        <v-list-group :isOpen="true" value="Sections">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="Portfolio Sections"
              
            ></v-list-item>
          </template>
          <v-list-item
            v-for="item in sections"
            @click=""
          >
            <v-list-item-title> <v-icon class="mr-1"> mdi-{{ item.icon }} </v-icon> {{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group> 
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="secondary">
      <v-app-bar-nav-icon @click="closeNavigationDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application bar {{  }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { firebaseAuth, logOut } from '@/firebase'
import router from '@/router';

const sections = ref([
  {
    name: 'Initial',
    icon: 'ray-start-arrow'
  },
  {
    name: 'About',
    icon: 'information'
  },
  {
    name: 'Experience',
    icon: 'list-box'
  },
  {
    name: 'Free Time Projects',
    icon: 'chart-ppf'
  },
  {
    name: 'Recommendations',
    icon: 'account-group'
  },
  {
    name: 'Skills',
    icon: 'hammer'
  },
  {
    name: 'Get In Touch',
    icon: 'card-account-mail'
  }
]);
const openedGroups = ref(['Sections']);
const showNavigationDrawer = ref(true);

const closeNavigationDrawer = () => {
  showNavigationDrawer.value = !showNavigationDrawer.value;
}

let auth: any;

onMounted(() => {
  auth = firebaseAuth;
});

const logout = async () => {
  try {
    await logOut(auth).then(() => {
      router.push('/login');
    });
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
.v-list-group__items .v-list-item {
  padding-inline-start: 30px !important;
}
</style>