<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Free Time Projects</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="openEditor(null)"
      >
        Add Project
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 4" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-40 w-full mb-3 rounded" />
        <USkeleton class="h-5 w-48 mb-2" />
        <USkeleton class="h-4 w-32" />
      </div>
    </div>

    <!-- Projects grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(project, key) in projects"
        :key="key"
        class="bg-slate-800 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 transition-colors"
        @click="openEditor(key as string)"
      >
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <div class="flex items-start justify-between">
            <div>
              <h4 class="text-white font-medium">{{ project.title }}</h4>
              <p class="text-white/40 text-xs mt-1">{{ project.dateOfCreation }}</p>
            </div>
            <UButton
              icon="i-mdi-delete"
              variant="ghost"
              color="error"
              size="xs"
              @click.stop="deleteProject(key as string)"
            />
          </div>
          <div v-if="project.technologies" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="(tech, tIndex) in (Array.isArray(project.technologies) ? project.technologies : Object.values(project.technologies))"
              :key="tIndex"
              class="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Editor Modal -->
    <UModal v-model:open="showEditor">
      <template #content>
        <div class="bg-slate-800 p-6 max-h-[80vh] overflow-y-auto">
          <h3 class="text-white text-lg font-medium mb-4">
            {{ editingKey ? 'Edit' : 'Add' }} Project
          </h3>

          <div class="space-y-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Title</label>
              <UInput v-model="editingProject.title" placeholder="Project title" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Date of Creation</label>
              <UInput v-model="editingProject.dateOfCreation" placeholder="e.g. March 2023" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Image URL</label>
              <UInput v-model="editingProject.image" placeholder="Image URL" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Live Demo URL</label>
              <UInput v-model="editingProject.live_demo" placeholder="https://..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Source Code URL</label>
              <UInput v-model="editingProject.source_code" placeholder="https://github.com/..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Icon (MDI name)</label>
              <UInput v-model="editingProject.icon" placeholder="e.g. github, web" />
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
                  @click="addTechnology"
                />
              </div>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tech, tIndex) in editingTechnologies"
                  :key="tIndex"
                  class="flex items-center gap-1 bg-white/10 rounded px-2 py-1"
                >
                  <UInput
                    v-model="editingTechnologies[tIndex]"
                    size="xs"
                    class="w-28"
                    variant="ghost"
                  />
                  <UButton
                    icon="i-mdi-close"
                    variant="ghost"
                    color="error"
                    size="xs"
                    @click="editingTechnologies.splice(tIndex, 1)"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="text-white/60 text-sm mb-1 block">Description</label>
              <ClientOnly>
                <QuillEditor
                  v-model:content="editingProject.description"
                  content-type="html"
                  theme="snow"
                  class="bg-white rounded"
                />
              </ClientOnly>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showEditor = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveProject">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { IFreeProject } from '~/types/models'

const { getVal, setVal, pushVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const projects = ref<Record<string, IFreeProject>>({})
const showEditor = ref(false)
const editingKey = ref<string | null>(null)
const editingProject = ref<Partial<IFreeProject>>({})
const editingTechnologies = ref<string[]>([])

const fetchProjects = async () => {
  loading.value = true
  try {
    const data = await getVal('free-time-projects')
    if (data) {
      projects.value = data
    }
  } finally {
    loading.value = false
  }
}

const openEditor = (key: string | null) => {
  editingKey.value = key
  if (key && projects.value[key]) {
    const proj = projects.value[key]
    editingProject.value = { ...proj }
    editingTechnologies.value = proj.technologies
      ? (Array.isArray(proj.technologies) ? [...proj.technologies] : Object.values(proj.technologies))
      : []
  } else {
    editingProject.value = {
      title: '',
      description: '',
      dateOfCreation: '',
      image: '',
      live_demo: '',
      source_code: '',
      icon: '',
    }
    editingTechnologies.value = []
  }
  showEditor.value = true
}

const addTechnology = () => {
  editingTechnologies.value.push('')
}

const saveProject = () => {
  const data = {
    ...editingProject.value,
    technologies: editingTechnologies.value.filter(t => t.trim()),
  }
  if (editingKey.value) {
    setVal(`free-time-projects/${editingKey.value}`, data)
    projects.value[editingKey.value] = data as IFreeProject
  } else {
    pushVal('free-time-projects', data)
    fetchProjects()
  }
  showEditor.value = false
}

const deleteProject = async (key: string) => {
  await deleteVal(`free-time-projects/${key}`)
  delete projects.value[key]
}

onMounted(() => {
  fetchProjects()
})
</script>
