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
    height="90vh"
  >
    <v-card color="secondary">
      <v-card-title>
        Add new project
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="project.title"
          label="Project title"
          required
        />
        <v-text-field
          v-model="project.dateOfCreation"
          label="Date of Creation"
          required
        />
        <v-text-field
          v-model="project.image"
          label="Image link"
          required
        />
        <v-text-field
          v-model="project.live_demo"
          label="Live demo"
          required
        />
        <v-text-field
          v-model="project.source_code"
          label="Source code"
          required
        />
        <v-text-field
          v-model="project.icon"
          label="Icon"
          required
        />
        Technologies
        <div
          v-for="(tech, index) in project.technologies"
          class="d-flex ga-2"
        >
          <v-text-field v-model="tech.name" label="Technology" />
          <v-text-field v-model="tech.icon" label="Icon" />
          <v-btn
            v-if="project.technologies.length - 1 === index"
            icon
            variant="text"
            @click="project.technologies.push({ name: '', icon: '' })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            v-if="project.technologies.length > 1"
            icon
            variant="text"
            @click="project.technologies.splice(index, 1)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </div>
        <div>
          <QuillEditor v-model:content="project.description" contentType="html" theme="snow"></QuillEditor> <br>
        </div>
      
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
import { onMounted, Ref, ref } from 'vue'
import { setVal, getVal, pushVal } from '@/services/DataService'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { IFreeProject } from '@/types/other'

const projects: Ref<IFreeProject[]> = ref([])
const project: Ref<IFreeProject> = ref({
  key: -1,
  title: '',
  dateOfCreation: '',
  image: '',
  live_demo: '',
  source_code: '',
  icon: '',
  description: '',
})
const addEditProjectDialog = ref(false)
const origin = ref('')

const openDialog = (
  selectedItem: IFreeProject = {
    key: -1,
    title: '',
    dateOfCreation: '',
    image: '',
    live_demo: '',
    source_code: '',
    icon: '',
    description: '',
    technologies: [{ name: '', icon: '' }],
  },
  key: number = -1
) => {
  if (selectedItem.title === '') {
    origin.value = 'add'
  } else {
    origin.value = 'edit'
  }
  
  selectedItem.key = key
  addEditProjectDialog.value = true
  project.value = { ...selectedItem }
}


const save = async (projectData: IFreeProject) => {
  if (origin.value === 'add') {
    await pushVal('free-time-projects', projectData)
    projects.value.push(projectData)
    addEditProjectDialog.value = false
    return
  }

  if (projectData.key !== -1) {
    projects.value[projectData.key] = projectData
    await setVal('free-time-projects', projects.value)
    addEditProjectDialog.value = false
    return
  }
}

const getProjects = () => {
  getVal('free-time-projects').then((val) => {
    if (val) {
      Object.keys(val).forEach((key) => {
        projects.value.push({ ...val[key], key })
      })
    }
  })
}

onMounted(() => {
  getProjects()
})
</script>
