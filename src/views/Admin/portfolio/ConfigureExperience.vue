<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pb-4">
          <v-card-title class="d-flex justify-space-between">
            <span>Configure experience </span>
            <v-btn icon variant="text" @click="openDialogForAdd()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <div color="secondary">
            <v-list-item-group>
              <v-list-item
                v-for="(experience, key) in experiences"
                :key="experience.id"
              >
                <div class="d-flex justify-space-between align-center py-2">
                  <v-list-item-title>{{ experience.title }}</v-list-item-title>
                  <div>
                    <v-btn icon variant="text" @click="openDialogForCompanyEdit(experience, key)">
                      <v-icon>mdi-domain</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      @click="openDialogForExperienceEdit(experience, 'experience', key)"
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

    <v-dialog v-model="editCompanyDetailsDialog" max-width="600" height="800">
      <v-card color="primary">
        <v-card-title>
          <span v-if="!selectedExperience">Add Experience</span>
          <span v-else>Company configuration</span>
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
            <QuillEditor v-model:content="selectedExperience.description" contentType="html" theme="snow"></QuillEditor> 
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
          <v-btn variant="outlined" @click="editCompanyDetailsDialog = false">
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

    <v-dialog v-model="editExperiencesDialog" max-width="600" height="800">
      <v-card color="primary">
        <v-card-title class="d-flex justify-space-between">
          <span>Experience</span>
          <v-btn icon variant="text" @click="addProject">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(project, index) in selectedExperience.projects"
              :key="index"
            >
              <v-expansion-panel-title color="secondary">
                {{ project.name }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-form>
                  <v-text-field v-model="project.name" label="Project Name" />
                  <QuillEditor v-model:content="project.description" contentType="html" theme="snow"></QuillEditor> 
                  <v-text-field v-model="project.project_link" label="Link" />
                  <v-text-field v-model="project.logoSrc" label="Logo URL" />
                  <v-text-field
                    v-model="project.startDate"
                    label="Start Date"
                  />
                  <v-text-field v-model="project.endDate" label="End Date" />
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
                      v-else
                      icon
                      variant="text"
                      @click="project.technologies.splice(index, 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                  <v-divider /> <br />
                </v-form>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-4">
          <v-btn variant="outlined" @click="editCompanyDetailsDialog = false">
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
import { Ref, onMounted, ref } from "vue"
import { setVal, getVal } from "@/services/DataService"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const experiences: any = ref([])
const editCompanyDetailsDialog = ref(false)
const editExperiencesDialog = ref(false)
const selectedExperience = ref<any>({
  title: "",
  location: "",
  description: "",
  date: "",
  logoSrc: "",
  position: "",
  company_link: "",
})

const key = ref([""])
const indexOfSelectedExperience: Ref<string> = ref("")
const selectedCompanyKey = ref("")

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      key.value = Object.keys(fetchedData)
      experiences.value = fetchedData[key.value[0]]
    } else {
      console.error("Error fetching data from Firebase.")
    }
  })
}

const openDialogForAdd = () => {
  selectedCompanyKey.value = ''
  indexOfSelectedExperience.value = experiences.value.length
  selectedExperience.value = {
    title: "",
    location: "",
    description: "",
    date: "",
    logoSrc: "",
    position: "",
    company_link: "",
    projects: [
      {
        name: "",
        description: "",
        project_link: "",
        logoSrc: "",
        startDate: "",
        endDate: "",
        technologies: [{ name: "", icon: "" }],
      },
    ],
  }
  editCompanyDetailsDialog.value = true
}

const openDialogForCompanyEdit = (experience:any = null, key: any) => {
  selectedExperience.value = experience
  selectedCompanyKey.value = key
  editCompanyDetailsDialog.value = true
}

const openDialogForExperienceEdit = (experience = null, from = "", key: any) => {
  selectedCompanyKey.value = key
  selectedExperience.value = experience
  editExperiencesDialog.value = true
  indexOfSelectedExperience.value = experiences.value.indexOf(experience)
}

const saveExperience = async () => {

  const finalIndex: any = selectedCompanyKey.value !== '' ? selectedCompanyKey.value : experiences.value.length
  await setVal(
    `working-experience/${key.value}/${finalIndex}`,
    selectedExperience.value
  )
  editCompanyDetailsDialog.value = false
  editExperiencesDialog.value = false
  await getData()
}

const addProject = () => {
  selectedExperience.value.projects.push({
    name: "",
    description: "",
    project_link: "",
    logoSrc: "",
    startDate: "",
    endDate: "",
  })
  indexOfSelectedExperience.value = experiences.value.indexOf(
    selectedExperience.value
  )
}

onMounted(async () => {
  await getData()
})
</script>
