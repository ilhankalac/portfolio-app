<template>
  <div class="rec-card bg-[var(--site-surface)] text-[var(--site-text)] rounded-xl border border-[var(--site-border)]">
    <div class="px-6 pt-6 pb-4 border-b border-[var(--site-border)]">
      <template v-if="origin === 'configure'">
        <h2 class="text-lg font-semibold">Edit {{ selectedRecommendation?.fullName }}'s recommendation</h2>
      </template>
      <template v-else>
        <h1 class="text-xl font-semibold">Write a recommendation</h1>
        <p class="text-sm text-[var(--site-muted)] mt-1">
          Worked with Ilhan Kalač? Share why you'd recommend him as a frontend engineer.
        </p>
      </template>
    </div>

    <form ref="form" class="px-6 py-5 flex flex-col gap-5" @submit.prevent="save">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormField label="Full name" required>
          <UInput v-model="selectedRecommendation.fullName" placeholder="Jane Doe" required size="lg" class="w-full" />
        </UFormField>
        <UFormField label="Role" required>
          <UInput v-model="selectedRecommendation.role" placeholder="e.g. Frontend Engineer" required size="lg" class="w-full" />
        </UFormField>
      </div>

      <UFormField label="Recommendation">
        <BaseEditor
          :editor-content="selectedRecommendation.textHtml"
          fullscreen-icon="mdi-fullscreen"
          :error="false"
          @update:editor-content="onEditorUpdate"
        />
      </UFormField>

      <div>
        <p class="text-sm font-medium mb-2">
          Profile & links <span class="text-[var(--site-faint)] font-normal">(optional)</span>
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UInput
            v-for="field in linkFields"
            :key="field.key"
            v-model="selectedRecommendation[field.key]"
            :placeholder="field.placeholder"
            :leading-icon="field.icon"
            type="url"
            size="lg"
            class="w-full"
          />
        </div>
      </div>

      <label v-if="origin === 'configure'" class="flex items-center gap-2 text-sm">
        <input v-model="selectedRecommendation.showPublic" type="checkbox" class="rounded" />
        Show Public
      </label>

      <button type="submit" class="site-pill self-end">
        {{ origin === 'write-recommendation' ? 'Send recommendation' : 'Save' }}
        <span class="site-pill-disc"><UIcon name="i-mdi-arrow-right" /></span>
      </button>
    </form>
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

const linkFields = [
  { key: 'avatarSrc', placeholder: 'Profile image URL', icon: 'i-mdi-account-circle' },
  { key: 'linkedinLink', placeholder: 'LinkedIn URL', icon: 'i-mdi-linkedin' },
  { key: 'githubLink', placeholder: 'GitHub URL', icon: 'i-mdi-github' },
  { key: 'instagramLink', placeholder: 'Instagram URL', icon: 'i-mdi-instagram' },
] as const

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
