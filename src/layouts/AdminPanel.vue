<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      v-model="showNavigationDrawer"
      color="primary"
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
            v-for="item in portfolioSections"
            @click="openSection(item.path)"
          >
            <v-list-item-title> <v-icon class="mr-1"> mdi-{{ item.icon }} </v-icon> {{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group> 
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-palette"
              title="Creative Tools"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="item in creativeTools"
            @click="openSection(item.path)"
          >
            <v-list-item-title> <v-icon class="mr-1"> mdi-{{ item.icon }} </v-icon> {{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="closeNavigationDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer;" @click="router.push('/admin-panel')">
        {{ getCurrentRouteName ? 'Configure ' + getCurrentRouteName : 'Admin Panel' }} 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="text-white">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { firebaseAuth, logOut } from '@/firebase'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useDisplay } from "vuetify"

const route = useRoute()
const portfolioSections = ref([
  {
    name: 'About',
    icon: 'information',
    path: 'configure-about'

  },
  {
    name: 'Experience',
    icon: 'list-box',
    path: 'configure-experience'
  },
  {
    name: 'Free Time Projects',
    icon: 'chart-ppf',
    path: 'configure-free-time-projects'
  },
  {
    name: 'Recommendations',
    icon: 'account-group',
    path: 'configure-recommendations'
  },
  {
    name: 'Skills',
    icon: 'hammer',
    path: 'configure-skills'
  },
  {
    name: 'Get In Touch',
    icon: 'card-account-mail',
    path: 'configure-get-in-touch'
  }
])
const creativeTools = ref([
  {
    name: 'Write Blog',
    icon: 'file-document-edit',
    path: 'write-blog'
  },
  {
    name: 'Write Quote',
    icon: 'format-quote-close',
    path: 'write-quote'
  },
  {
    name: 'Configure Films',
    icon: 'filmstrip',
    path: 'configure-films'
  }
])
const openedGroups = ref(['Sections'])
const { smAndDown } = useDisplay()
const showNavigationDrawer = ref(true)

const closeNavigationDrawer = () => {
  showNavigationDrawer.value = !showNavigationDrawer.value
}

let auth: any

onMounted(() => {
  auth = firebaseAuth
  smAndDown.value ? showNavigationDrawer.value = false : showNavigationDrawer.value = true
})

const logout = async () => {
  try {
    await logOut(auth).then(() => {
      router.push('/login')
    })
  } catch (error) {
    console.error(error)
  }
}

const openSection = (path = '') => {
  router.push('/admin-panel/' + path)
}

const getCurrentRouteName = computed(() => {
  const routePath = route.path.split('/')
  return portfolioSections.value.find(section => section.path === routePath[2])?.name
})
</script>

<style scoped>
.v-list-group__items .v-list-item {
  padding-inline-start: 30px !important;
}
</style>