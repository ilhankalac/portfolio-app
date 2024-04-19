<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <NavBar :origin="'configure'"/>
    </v-app-bar>
    <v-main class="">
    <v-container style="max-width: none;" class="ma-0 pa-0">
      <v-row>
        <v-col>
          <img style="width: 100%; height: 200px; object-fit: cover;" src="https://scontent.ftgd4-1.fna.fbcdn.net/v/t1.6435-9/124073549_2908129239406314_7933467529022298255_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dB0hm5hfFjkAb6IywO-&_nc_ht=scontent.ftgd4-1.fna&oh=00_AfCvmguktvmHraDvn16Rhm0FrN1j4iv1D3LMnkww0HrbNA&oe=664A3C2D" alt="">
        </v-col>
      </v-row>
    </v-container>
      <v-container>
        <v-row>
          <v-col class="d-flex flex-column align-center text-white">
            <h3>left</h3>
          </v-col>
          <v-col>
            <router-view />
          </v-col>
          <v-col class="d-flex flex-column align-center text-white">
            <h3>right</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>