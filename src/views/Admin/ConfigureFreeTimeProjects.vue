<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card 
          class="ma-1 pa-2 pl-3 d-flex align-center" 
          color="secondary"
          style="border: 1px solid black; cursor: pointer;"
          @click="openDialog()"
        >
          <v-icon>mdi-plus</v-icon>  Add new project
        </v-card>
        <div class="d-flex flex-wrap">
          <template v-for="(project, key) in projects">
            <v-card 
              class="ma-1 pa-5" 
              color="secondary"
              style="border: 1px solid black; cursor: pointer; flex: 100%"
              @click="openDialog(project, key)"
            >
               <div>
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <p class="font-weight-light">{{ project.title }}</p>
                      <p class="text-subtitle-1 font-weight-light" style="opacity: 0.6;">{{ project.dateOfCreation }}</p>
                    </div>
                    <img :src="project.image" alt="avatar" style="border-radius: 5px; height: 100px; width: auto; object-fit: contain;" />
                  </div>
                </div>
            </v-card>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog 
    v-model="addEditProjectDialog"
    max-width="600"
  >
    <v-card color="secondary">
      <v-card-title>
        Add new project
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="project.name"
          label="project name"
          required
        />
        <v-text-field
          v-model="project.icon"
          label="Icon"
          required
        />
      </v-card-text>
      <v-btn 
        class="mx-6 mb-5" 
        variant="outlined" 
        @click="save(project)"
      >
        Save
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { setVal, getVal, pushVal } from '@/services/DataService'

const projects: any = ref([]);
const project: any = ref({
  key: -1,
  name: '',
  icon: '',
});
const addEditProjectDialog = ref(false);
const origin = ref('');

const openDialog = (selectedItem: any = { key: -1, name: '', icon: '' }, key: number = -1) => {
  selectedItem.name == '' ? origin.value = 'add' : origin.value = 'edit';
  selectedItem.key = key;
  addEditProjectDialog.value = true;
  project.value = Object.assign({}, selectedItem);
}


const save = async (projectData: any) => {
  if (origin.value === 'add') {
    await pushVal('projects', projectData);
    projects.value.push(projectData);
    addEditProjectDialog.value = false;
    return;
  }

  if (projectData.key !== -1) {
    projects.value[projectData.key] = projectData;
    await setVal('projects', projects.value);
    addEditProjectDialog.value = false;
    return;
  }
}

const getProjects = () => {
  getVal('free-time-projects').then((val) => {
    if (val) {
      Object.keys(val).forEach((key) => {
        projects.value.push({ ...val[key], key });
      });
    }
  });
}

onMounted(() => {
  getProjects();
});
</script>
