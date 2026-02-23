<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Working Experience</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="addNewExperience"
      >
        Add Experience
      </UButton>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-6 w-48 mb-2" />
        <USkeleton class="h-4 w-32 mb-2" />
        <USkeleton class="h-4 w-64" />
      </div>
    </div>

    <!-- Experience list -->
    <div v-else class="space-y-4">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="bg-slate-800 border border-white/10 rounded-lg p-4"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <img
              v-if="exp.logoSrc"
              :src="exp.logoSrc"
              :alt="exp.title"
              class="w-12 h-12 rounded object-contain bg-white p-1"
            />
            <div>
              <h4 class="text-white font-medium">{{ exp.title }}</h4>
              <p class="text-white/60 text-sm">{{ exp.position }} &mdash; {{ exp.location }}</p>
              <p class="text-white/40 text-xs">{{ exp.date }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <UButton
              icon="i-mdi-pencil"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="openCompanyDialog(index)"
            />
            <UButton
              icon="i-mdi-briefcase-edit"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="openProjectsDialog(index)"
            />
            <UButton
              icon="i-mdi-delete"
              variant="ghost"
              color="error"
              size="sm"
              @click="deleteExperience(index)"
            />
          </div>
        </div>

        <!-- Projects summary -->
        <div v-if="exp.projects && Object.keys(exp.projects).length" class="mt-3 ml-15">
          <p class="text-white/40 text-xs uppercase tracking-wider mb-1">Projects</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(proj, pKey) in exp.projects"
              :key="pKey"
              class="text-xs bg-white/10 text-white/70 px-2 py-1 rounded"
            >
              {{ proj.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Details Modal -->
    <UModal v-model:open="showCompanyDialog">
      <template #content>
        <div class="bg-slate-800 p-6 max-h-[80vh] overflow-y-auto">
          <h3 class="text-white text-lg font-medium mb-4">Company Details</h3>

          <div class="space-y-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Company Name</label>
              <UInput v-model="editingExperience.title" placeholder="Company name" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Position</label>
              <UInput v-model="editingExperience.position" placeholder="Position" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Location</label>
              <UInput v-model="editingExperience.location" placeholder="Location" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Date</label>
              <UInput v-model="editingExperience.date" placeholder="e.g. Jan 2020 - Present" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Logo URL</label>
              <UInput v-model="editingExperience.logoSrc" placeholder="Logo image URL" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Company Link</label>
              <UInput v-model="editingExperience.company_link" placeholder="https://..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Description</label>
              <ClientOnly>
                <QuillEditor
                  v-model:content="editingExperience.description"
                  content-type="html"
                  theme="snow"
                  class="bg-white rounded"
                />
              </ClientOnly>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showCompanyDialog = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveCompanyDetails">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Projects Modal -->
    <UModal v-model:open="showProjectsDialog">
      <template #content>
        <div class="bg-slate-800 p-6 max-h-[80vh] overflow-y-auto min-w-[600px]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-white text-lg font-medium">Projects</h3>
            <UButton
              icon="i-mdi-plus"
              variant="outline"
              color="neutral"
              size="sm"
              @click="addProject"
            >
              Add Project
            </UButton>
          </div>

          <div class="space-y-3">
            <div
              v-for="(project, pIndex) in editingProjects"
              :key="pIndex"
              class="border border-white/10 rounded-lg overflow-hidden"
            >
              <!-- Collapsible header -->
              <button
                class="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 transition-colors text-left"
                @click="toggleProjectPanel(pIndex)"
              >
                <span class="text-white text-sm">{{ project.name || 'Untitled Project' }}</span>
                <div class="flex items-center gap-2">
                  <UButton
                    icon="i-mdi-delete"
                    variant="ghost"
                    color="error"
                    size="xs"
                    @click.stop="removeProject(pIndex)"
                  />
                  <UIcon
                    :name="expandedProjects.includes(pIndex) ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'"
                    class="text-white/60"
                  />
                </div>
              </button>

              <!-- Collapsible content -->
              <div v-if="expandedProjects.includes(pIndex)" class="p-4 space-y-4">
                <div>
                  <label class="text-white/60 text-sm mb-1 block">Project Name</label>
                  <UInput v-model="project.name" placeholder="Project name" />
                </div>
                <div>
                  <label class="text-white/60 text-sm mb-1 block">Link</label>
                  <UInput v-model="project.link" placeholder="Project URL" />
                </div>
                <div>
                  <label class="text-white/60 text-sm mb-1 block">Logo URL</label>
                  <UInput v-model="project.logoSrc" placeholder="Logo image URL" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-white/60 text-sm mb-1 block">Start Date</label>
                    <UInput v-model="project.startDate" placeholder="e.g. Jan 2020" />
                  </div>
                  <div>
                    <label class="text-white/60 text-sm mb-1 block">End Date</label>
                    <UInput v-model="project.endDate" placeholder="e.g. Dec 2021" />
                  </div>
                </div>
                <div>
                  <label class="text-white/60 text-sm mb-1 block">Description</label>
                  <ClientOnly>
                    <QuillEditor
                      v-model:content="project.description"
                      content-type="html"
                      theme="snow"
                      class="bg-white rounded"
                    />
                  </ClientOnly>
                </div>

                <!-- Technologies -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-white/60 text-sm">Technologies</label>
                    <UButton
                      icon="i-mdi-plus"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                      @click="addTechnology(pIndex)"
                    />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="(tech, tIndex) in project.technologies"
                      :key="tIndex"
                      class="flex items-center gap-1 bg-white/10 rounded px-2 py-1"
                    >
                      <UInput
                        v-model="project.technologies[tIndex]"
                        size="xs"
                        class="w-24"
                        variant="ghost"
                      />
                      <UButton
                        icon="i-mdi-close"
                        variant="ghost"
                        color="error"
                        size="xs"
                        @click="removeTechnology(pIndex, tIndex)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showProjectsDialog = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveProjects">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { IExperience } from '~/types/models'

const { getVal, setVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const experiences = ref<IExperience[]>([])
const experienceKeys = ref<string[]>([])

// Company dialog
const showCompanyDialog = ref(false)
const editingIndex = ref(-1)
const editingExperience = ref<any>({})

// Projects dialog
const showProjectsDialog = ref(false)
const editingProjects = ref<any[]>([])
const expandedProjects = ref<number[]>([])

const fetchExperiences = async () => {
  loading.value = true
  try {
    const data = await getVal('working-experience')
    if (data) {
      experienceKeys.value = Object.keys(data)
      experiences.value = Object.values(data)
    }
  } finally {
    loading.value = false
  }
}

const openCompanyDialog = (index: number) => {
  editingIndex.value = index
  const exp = experiences.value[index]
  if (!exp) return
  editingExperience.value = {
    title: exp.title || '',
    position: exp.position || '',
    location: exp.location || '',
    date: exp.date || '',
    logoSrc: exp.logoSrc || '',
    company_link: exp.company_link || '',
    description: exp.description || '',
  }
  showCompanyDialog.value = true
}

const saveCompanyDetails = () => {
  if (editingIndex.value === -1) {
    const newExp = { ...editingExperience.value, projects: {} }
    const newKey = experiences.value.length
    setVal(`working-experience/${newKey}`, newExp)
    experiences.value.push(newExp as IExperience)
    experienceKeys.value.push(String(newKey))
  } else {
    const key = experienceKeys.value[editingIndex.value]
    const updated = { ...experiences.value[editingIndex.value], ...editingExperience.value }
    setVal(`working-experience/${key}`, updated)
    experiences.value[editingIndex.value] = updated
  }
  showCompanyDialog.value = false
}

const openProjectsDialog = (index: number) => {
  editingIndex.value = index
  const exp = experiences.value[index]
  if (!exp) return
  if (exp.projects) {
    editingProjects.value = Object.values(exp.projects).map((p: any) => ({
      ...p,
      technologies: p.technologies ? (Array.isArray(p.technologies) ? [...p.technologies] : Object.values(p.technologies)) : [],
    }))
  } else {
    editingProjects.value = []
  }
  expandedProjects.value = []
  showProjectsDialog.value = true
}

const toggleProjectPanel = (index: number) => {
  const idx = expandedProjects.value.indexOf(index)
  if (idx === -1) {
    expandedProjects.value.push(index)
  } else {
    expandedProjects.value.splice(idx, 1)
  }
}

const addProject = () => {
  editingProjects.value.push({
    name: '',
    description: '',
    link: '',
    logoSrc: '',
    startDate: '',
    endDate: '',
    technologies: [],
  })
  expandedProjects.value.push(editingProjects.value.length - 1)
}

const removeProject = (index: number) => {
  editingProjects.value.splice(index, 1)
  expandedProjects.value = expandedProjects.value
    .filter(i => i !== index)
    .map(i => (i > index ? i - 1 : i))
}

const addTechnology = (projectIndex: number) => {
  if (!editingProjects.value[projectIndex].technologies) {
    editingProjects.value[projectIndex].technologies = []
  }
  editingProjects.value[projectIndex].technologies.push('')
}

const removeTechnology = (projectIndex: number, techIndex: number) => {
  editingProjects.value[projectIndex].technologies.splice(techIndex, 1)
}

const saveProjects = () => {
  const key = experienceKeys.value[editingIndex.value]
  const projectsObj: any = {}
  editingProjects.value.forEach((proj, i) => {
    projectsObj[i] = { ...proj }
  })
  const current = experiences.value[editingIndex.value]
  if (!current) return
  const updated = { ...current, projects: projectsObj }
  setVal(`working-experience/${key}`, updated)
  experiences.value[editingIndex.value] = updated
  showProjectsDialog.value = false
}

const addNewExperience = () => {
  editingIndex.value = -1
  editingExperience.value = {
    title: '',
    position: '',
    location: '',
    date: '',
    logoSrc: '',
    company_link: '',
    description: '',
    projects: {},
  }
  showCompanyDialog.value = true
}

const deleteExperience = async (index: number) => {
  const key = experienceKeys.value[index]
  await deleteVal(`working-experience/${key}`)
  experiences.value.splice(index, 1)
  experienceKeys.value.splice(index, 1)
}

onMounted(() => {
  fetchExperiences()
})
</script>
