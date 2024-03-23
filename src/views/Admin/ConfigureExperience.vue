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
                  <div>
                    <v-btn 
                      icon 
                      variant="text"
                      @click="openDialog(experience)"
                    >
                      <v-icon>mdi-domain</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      @click="openDialog(experience, 'experience')"
                    >
                      <v-icon>mdi-briefcase</v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-divider></v-divider>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="editCompanyDetailsDialog"
      max-width="600"
      height="800"
    >
      <v-card color="primary">
        <v-card-title>
          <span v-if="!selectedExperience">Add Experience</span>
          <span v-else>Edit Experience</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="selectedExperience.title"
              label="Title"
              required
            />
            <v-text-field
              v-model="selectedExperience.location"
              label="Location"
              required
            />

            <v-text-field
              v-model="selectedExperience.date"
              label="Date"
              required
            />
            <v-textarea
              v-model="selectedExperience.description"
              label="Description"
              required
            />
            <v-text-field
              v-model="selectedExperience.logoSrc"
              label="Logo URL"
              required
            />
            <v-text-field
              v-model="selectedExperience.position"
              label="Position"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-4">
          <v-btn
            variant="outlined"
            @click="editCompanyDetailsDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="outlined"
            width="200px"
            @click="saveExperience(indexOfSelectedExperience)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editExperiencesDialog"
      max-width="600"
      height="800"
    >
      <v-card color="primary">
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
        <v-card-text>
          <v-expansion-panels v-model="panel">
            <v-expansion-panel
              v-for="(project, index) in selectedExperience.projects"
              :key="index"
            >
            <v-expansion-panel-title>
              {{ project.name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-form>
                  <v-text-field
                    v-model="project.name"
                    label="Project Name"
                  />
                  <v-textarea
                    v-model="project.description"
                    label="Description"
                  />
                  <v-text-field
                    v-model="project.project_link"
                    label="Link"
                  />
                  <v-text-field
                    v-model="project.logoSrc"
                    label="Logo URL"
                  />
                  <v-text-field
                    v-model="project.startDate"
                    label="Start Date"
                  />
                  <v-text-field
                    v-model="project.endDate"
                    label="End Date"
                  />
                  <v-divider /> <br>
              </v-form>
            </v-expansion-panel-text>
          </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-4">
          <v-btn
            variant="outlined"
            @click="editCompanyDetailsDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="outlined"
            width="200px"
            @click="saveExperience(indexOfSelectedExperience)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { setVal, getVal } from '@/services/DataService'
const experiences: any = ref([]);
const editCompanyDetailsDialog = ref(false);
const editExperiencesDialog = ref(false);
const selectedExperience = ref<any>({
  title: "",
  location: "",
  description: "",
  date: "",
  logoSrc: "",
  position: "",
  company_link: ""
});
const panel = ref<number[]>([0]);

const key = ref(['']);
const indexOfSelectedExperience: Ref<string> = ref('0');
const indexOfSelectedProject: Ref<string> = ref('0');

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      key.value = Object.keys(fetchedData);
      experiences.value = fetchedData[key.value[0]];
    } else {
      console.error("Error fetching data from Firebase.");
    }
  });
};

const openDialog = (experience = null, from = '') => {
  selectedExperience.value = experience;
  indexOfSelectedExperience.value = experiences.value.indexOf(experience);

  if(from === 'experience') {
    selectedExperience.value = experience;
    editExperiencesDialog.value = true;
    panel.value = [0];
    return;
  }

  editCompanyDetailsDialog.value = true;
};

const saveExperience = async (index: string) => {
  await setVal(`working-experience/${key.value}/${indexOfSelectedExperience.value}`, selectedExperience.value);
  editCompanyDetailsDialog.value = false;
  editExperiencesDialog.value = false;
  await getData();
};

onMounted(async () => {
  await getData();
});
</script>
