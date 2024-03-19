<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title class="d-flex justify-space-between">
            <span>Experience</span>
            <v-btn
             icon
             variant="text"
             @click="openDialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <div color="secondary">
            <v-list-item-group >
              <v-list-item
                v-for="experience in experiences"
                :key="experience.id"
              >
                <div class="d-flex justify-space-between align-center py-2">
                  <v-list-item-title>{{ experience.title }}</v-list-item-title>
                  <v-btn 
                    icon 
                    variant="text"
                    @click="openDialog(experience)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <v-divider></v-divider>
              </v-list-item>
            </v-list-item-group>
          </div>
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Save
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setVal, getVal } from '@/services/DataService'
const experiences: any = ref([]);

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      const key = Object.keys(fetchedData);
      experiences.value = fetchedData[key[0]].reverse();
      console.log(experiences.value);
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

onMounted(async () => {
  await getData();
});
</script>
