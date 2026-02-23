<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Recommendations</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="openEditor(null)"
      >
        Add Recommendation
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 4" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-4 w-32 mb-3" />
        <USkeleton class="h-3 w-full mb-2" />
        <USkeleton class="h-3 w-3/4" />
      </div>
    </div>

    <!-- Recommendation cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(rec, key) in recommendations"
        :key="key"
        class="bg-slate-800 border border-white/10 rounded-lg p-4 cursor-pointer hover:border-white/30 transition-colors"
        @click="openEditor(key as string)"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <img
              v-if="rec.avatarSrc"
              :src="rec.avatarSrc"
              :alt="rec.fullName"
              class="w-10 h-10 rounded-full object-cover bg-white"
            />
            <div>
              <h4 class="text-white font-medium text-sm">{{ rec.fullName }}</h4>
              <p class="text-white/60 text-xs">{{ rec.role }}</p>
            </div>
          </div>
          <div class="flex gap-1">
            <UButton
              icon="i-mdi-delete"
              variant="ghost"
              color="error"
              size="xs"
              @click.stop="deleteRecommendation(key as string)"
            />
          </div>
        </div>
        <div class="mt-3 text-white/50 text-xs line-clamp-3" v-html="rec.textHtml" />
        <div class="mt-2 flex items-center gap-2">
          <span
            class="text-xs px-2 py-0.5 rounded"
            :class="rec.showPublic ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
          >
            {{ rec.showPublic ? 'Public' : 'Hidden' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Editor Modal -->
    <UModal v-model:open="showEditor">
      <template #content>
        <div class="bg-slate-800 p-6 max-h-[80vh] overflow-y-auto">
          <h3 class="text-white text-lg font-medium mb-4">
            {{ editingKey ? 'Edit' : 'Add' }} Recommendation
          </h3>

          <div class="space-y-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Full Name</label>
              <UInput v-model="editingRec.fullName" placeholder="Full name" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Role</label>
              <UInput v-model="editingRec.role" placeholder="Role / Title" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Avatar URL</label>
              <UInput v-model="editingRec.avatarSrc" placeholder="Avatar image URL" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">GitHub Link</label>
              <UInput v-model="editingRec.githubLink" placeholder="https://github.com/..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">LinkedIn Link</label>
              <UInput v-model="editingRec.linkedinLink" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Instagram Link</label>
              <UInput v-model="editingRec.instagramLink" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Recommendation Text (HTML)</label>
              <BaseEditor
                :editor-content="editingRec.textHtml || ''"
                fullscreen-icon="mdi-fullscreen"
                :error="false"
                @update:editor-content="(html: string) => editingRec.textHtml = html"
              />
            </div>
            <div>
              <UCheckbox v-model="editingRec.showPublic" label="Show publicly" />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showEditor = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveRecommendation">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import BaseEditor from '~/components/base/BaseEditor.vue'
import type { IColleagueInfo } from '~/types/models'

const { getVal, setVal, pushVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const recommendations = ref<Record<string, IColleagueInfo>>({})
const showEditor = ref(false)
const editingKey = ref<string | null>(null)
const editingRec = ref<IColleagueInfo>({})

const fetchRecommendations = async () => {
  loading.value = true
  try {
    const data = await getVal('recommendations')
    if (data) {
      recommendations.value = data
    }
  } finally {
    loading.value = false
  }
}

const openEditor = (key: string | null) => {
  editingKey.value = key
  if (key && recommendations.value[key]) {
    editingRec.value = { ...recommendations.value[key] }
  } else {
    editingRec.value = {
      fullName: '',
      role: '',
      textHtml: '',
      avatarSrc: '',
      githubLink: '',
      linkedinLink: '',
      instagramLink: '',
      showPublic: false,
    }
  }
  showEditor.value = true
}

const saveRecommendation = () => {
  if (editingKey.value) {
    setVal(`recommendations/${editingKey.value}`, editingRec.value)
    recommendations.value[editingKey.value] = { ...editingRec.value }
  } else {
    pushVal('recommendations', editingRec.value)
    fetchRecommendations()
  }
  showEditor.value = false
}

const deleteRecommendation = async (key: string) => {
  await deleteVal(`recommendations/${key}`)
  delete recommendations.value[key]
}

onMounted(() => {
  fetchRecommendations()
})
</script>
