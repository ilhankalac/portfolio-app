<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pb-4">
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
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="600"
      height="600"
    >
      <v-card color="primary">
        <v-card-title>
          <span v-if="!selectedExperience">Add Experience</span>
          <span v-else>Edit Experience</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="selectedExperience.title"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedExperience.company"
              label="Company"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedExperience.location"
              label="Location"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedExperience.startDate"
              label="Start Date"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedExperience.endDate"
              label="End Date"
              required
            ></v-text-field>
            <v-textarea
              v-model="selectedExperience.description"
              label="Description"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-4">
          <v-btn
            variant="outlined"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="outlined"
            width="200px"
            @click="saveExperience"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setVal, getVal } from '@/services/DataService'
const experiences: any = ref([]);
const dialog = ref(false);
const selectedExperience = ref({
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

const key = ref(['']);

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      key.value = Object.keys(fetchedData);
      console.log(key);
      experiences.value = fetchedData[key.value[0]].reverse();
      console.log(experiences.value);
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openDialog = (experience = null) => {
  console.log(experience);
  selectedExperience.value = experience;
  dialog.value = true;
};

const saveExperience = async () => {
  if (selectedExperience.value) {
    await setVal("working-experience", key.value, selectedExperience.value);
  } else {
    await setVal("working-experience", null, selectedExperience.value);
  }
  dialog.value = false;
  await getData();
};

onMounted(async () => {
  await getData();
});
</script>
