<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Skills</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="openEditor(null)"
      >
        Add Skill
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-10 w-10 mx-auto mb-2 rounded" />
        <USkeleton class="h-4 w-20 mx-auto" />
      </div>
    </div>

    <!-- Skills grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(skill, key) in skills"
        :key="key"
        class="bg-slate-800 border border-white/10 rounded-lg p-4 text-center cursor-pointer hover:border-white/30 transition-colors group"
        @click="openEditor(key as string)"
      >
        <div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <UButton
            icon="i-mdi-delete"
            variant="ghost"
            color="error"
            size="xs"
            @click.stop="deleteSkill(key as string)"
          />
        </div>
        <UIcon v-if="skill.icon" :name="`i-mdi-${skill.icon}`" class="text-3xl text-white/80 mb-2" />
        <p class="text-white text-sm">{{ skill.name }}</p>
      </div>
    </div>

    <!-- Editor Modal -->
    <UModal v-model:open="showEditor">
      <template #content>
        <div class="bg-slate-800 p-6">
          <h3 class="text-white text-lg font-medium mb-4">
            {{ editingKey ? 'Edit' : 'Add' }} Skill
          </h3>

          <div class="space-y-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Skill Name</label>
              <UInput v-model="editingSkill.name" placeholder="e.g. Vue.js" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Icon (MDI name without prefix)</label>
              <UInput v-model="editingSkill.icon" placeholder="e.g. vuejs, react, nodejs" />
              <div v-if="editingSkill.icon" class="mt-2 flex items-center gap-2 text-white/60 text-sm">
                <span>Preview:</span>
                <UIcon :name="`i-mdi-${editingSkill.icon}`" class="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showEditor = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveSkill">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/types/models'

const { getVal, setVal, pushVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const skills = ref<Record<string, ISkill>>({})
const showEditor = ref(false)
const editingKey = ref<string | null>(null)
const editingSkill = ref<Partial<ISkill>>({})

const fetchSkills = async () => {
  loading.value = true
  try {
    const data = await getVal('skills')
    if (data) {
      skills.value = data
    }
  } finally {
    loading.value = false
  }
}

const openEditor = (key: string | null) => {
  editingKey.value = key
  if (key && skills.value[key]) {
    editingSkill.value = { ...skills.value[key] }
  } else {
    editingSkill.value = { name: '', icon: '' }
  }
  showEditor.value = true
}

const saveSkill = () => {
  if (editingKey.value) {
    setVal(`skills/${editingKey.value}`, editingSkill.value)
    skills.value[editingKey.value] = { ...editingSkill.value } as ISkill
  } else {
    pushVal('skills', editingSkill.value)
    fetchSkills()
  }
  showEditor.value = false
}

const deleteSkill = async (key: string) => {
  await deleteVal(`skills/${key}`)
  delete skills.value[key]
}

onMounted(() => {
  fetchSkills()
})
</script>
