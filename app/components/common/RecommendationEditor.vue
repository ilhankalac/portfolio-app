<template>
  <div class="bg-slate-900 text-white rounded-lg">
    <div v-if="origin === 'configure'" class="bg-slate-800 p-4 rounded-t-lg">
      <p class="font-light">Edit {{ selectedRecommendation?.fullName }}'s recommendation</p>
    </div>
    <div v-else class="p-4">
      <p class="text-sm opacity-80">Write recommendation for Ilhan Kalač</p>
    </div>
    <div class="p-4">
      <form ref="form" @submit.prevent="save">
        <UInput
          v-model="selectedRecommendation.fullName"
          placeholder="Full Name"
          required
          class="mb-3"
        />
        <UInput
          v-model="selectedRecommendation.role"
          placeholder="Role (e.g. Frontend Engineer)"
          required
          class="mb-3"
        />
        <BaseEditor
          :editor-content="selectedRecommendation.textHtml"
          fullscreen-icon="mdi-fullscreen"
          :error="false"
          @update:editor-content="onEditorUpdate"
        />
        <p class="opacity-60 text-xs text-left mb-2 mt-2">
          This is where you can share why you'd recommend me as a frontend engineer.
        </p>
        <UInput
          v-model="selectedRecommendation.avatarSrc"
          placeholder="Profile Image URL"
          class="mb-3"
        >
          <template #leading>
            <UIcon name="i-mdi-link" />
          </template>
        </UInput>
        <UInput
          v-model="selectedRecommendation.githubLink"
          placeholder="GitHub URL"
          class="mb-3"
        >
          <template #leading>
            <UIcon name="i-mdi-github" />
          </template>
        </UInput>
        <UInput
          v-model="selectedRecommendation.linkedinLink"
          placeholder="LinkedIn URL"
          class="mb-3"
        >
          <template #leading>
            <UIcon name="i-mdi-linkedin" />
          </template>
        </UInput>
        <UInput
          v-model="selectedRecommendation.instagramLink"
          placeholder="Instagram URL"
          class="mb-3"
        >
          <template #leading>
            <UIcon name="i-mdi-instagram" />
          </template>
        </UInput>
        <div v-if="origin === 'configure'" class="mb-3">
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="selectedRecommendation.showPublic" class="rounded" />
            Show Public
          </label>
        </div>
      </form>
    </div>
    <div class="p-4">
      <UButton variant="outline" color="neutral" block @click="save">
        {{ origin === 'write-recommendation' ? 'Send' : 'Save' }}
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IColleagueInfo } from '~/types/models'
import BaseEditor from '~/components/base/BaseEditor.vue'

const { setVal, pushVal } = useFirebase()
const toast = useToast()

const props = defineProps<{
  selectedRecommendation: IColleagueInfo
  selectedRecommendationIndex?: number
  origin?: string
}>()

const emit = defineEmits(['close'])
const form = ref<HTMLFormElement | null>(null)

const save = async () => {
  if (!props.selectedRecommendation.fullName || !props.selectedRecommendation.role) {
    return
  }

  if (props.origin === 'configure') {
    setVal('recommendations/' + props.selectedRecommendationIndex, props.selectedRecommendation)
    emit('close')
  }
  if (props.origin === 'write-recommendation') {
    pushVal('recommendations', props.selectedRecommendation)
    toast.add({ title: 'You have successfully sent the recommendation!' })
    setTimeout(() => {
      navigateTo('/')
    }, 1500)
  }
}

function onEditorUpdate(html: string) {
  props.selectedRecommendation.textHtml = html
}
</script>
