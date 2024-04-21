<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <NavBar :origin="'configure'"/>
    </v-app-bar>
    <v-main class="">
      <v-container style="max-width: none;" class="ma-0 pa-0">
        <v-row>
          <v-col cols="12">
            <img style="width: 100%; height: 200px; object-fit: cover;" src="https://scontent.ftgd4-1.fna.fbcdn.net/v/t1.6435-9/124073549_2908129239406314_7933467529022298255_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dB0hm5hfFjkAb6IywO-&_nc_ht=scontent.ftgd4-1.fna&oh=00_AfCvmguktvmHraDvn16Rhm0FrN1j4iv1D3LMnkww0HrbNA&oe=664A3C2D" alt="">
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="2" class="d-flex flex-column align-center text-white">
          </v-col>
          <v-col :cols="smAndDown ? 12 : 6">
            <router-view />
          </v-col>
          <v-col :cols="smAndDown ? 0 : 4" class="d-flex flex-column align-center text-white">
            <v-card color="primary">
              <v-tabs
                v-model="tab"
                bg-color="primary"
              >
                <v-tab value="one">Posljednje objave</v-tab>
                <v-tab value="two">Najčitanije</v-tab>
              </v-tabs>

              <v-card-text>
                <v-window v-model="tab">
                  <v-window-item value="one">
                    <BlogList />
                  </v-window-item>

                  <v-window-item value="two">
                    Two
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import BlogList from '@/views/blogs/BlogList.vue'
import { useDisplay } from "vuetify"
const { smAndDown } = useDisplay()
import { ref } from 'vue'
const tab = ref('one')
</script>