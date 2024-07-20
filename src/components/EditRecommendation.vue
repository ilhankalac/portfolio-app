<template>
    <v-card color="primary">
      <v-card-title style="background-color: rgb(var(--v-theme-secondary))" v-if="origin === 'configure'">
        <p class="font-weight-light">Edit {{ props.selectedRecommendation?.fullName }}'s recommendation</p>
      </v-card-title>
      <v-card-title v-else class="font-weight-light">
      <p class="text-subtitle">Write recommendation for Ilhan Kalač</p>
      </v-card-title>
      <v-card-text class="mb-0 pb-0"><br>
        <v-form
          v-model="formValid"
          ref="form"
        >
          <v-text-field 
            v-model="props.selectedRecommendation.fullName"
            label="Full Name"
            density="compact"
            required
            :rules="[v => !!v || 'Full Name is required']"
          />
          <v-text-field 
            v-model="selectedRecommendation.role"
            label="Role (e.g. Frontend Engineer)"
            density="compact"
            required
            :rules="[v => !!v || 'Role is required']"
          />
          
          <HtmlEditor
            :editor-content="selectedRecommendation.textHtml"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="onEditorUpdate"
            @fullscreen="fullscreen = true"
          />

          <p style="opacity:0.6; font-size: smaller;" class="text-left mb-2"> 
            This is where you can share why you'd recommend me as a frontend engineer. Your insights provide valuable perspective for potential collaborators and employers. Let's showcase my skills and professionalism together!
          </p>
          <v-text-field 
            v-model="selectedRecommendation.avatarSrc"
            label="Profile Image URL"
            prepend-inner-icon="mdi-link"
            density="compact"
            required
            :rules="[v => !!v || 'Image URL is required']"
          />
          <v-text-field 
            v-model="selectedRecommendation.githubLink"
            label="GitHub URL"
            prepend-inner-icon="mdi-github"
            density="compact"
          />
          <v-text-field 
            v-model="selectedRecommendation.linkedinLink"
            label="LinkedIn URL"
            prepend-inner-icon="mdi-linkedin"
            density="compact"
          />
          <v-text-field 
            v-model="selectedRecommendation.instagramLink"
            label="Instagram URL"
            prepend-inner-icon="mdi-instagram"
            density="compact"
          />
          <v-checkbox
            v-if="origin === 'configure'"
            v-model="selectedRecommendation.showPublic" 
            label="Show Public"
            density="compact"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-3">
        <v-btn block variant="outlined" @click="save">{{ origin === 'write-recommendation' ? 'Send' : 'Save' }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      rounded="pill"
      location="right top"
      min-width="360"
      min-height="60"
    >
      You have successfully sent the recommendation!
    </v-snackbar>
</template>

<script lang="ts" setup>
import { IColleagueInfo } from '@/types/other'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { setVal, pushVal } from '@/services/DataService'
import { useRouter } from 'vue-router'
import { Ref, ref } from 'vue'
import HtmlEditor from './HtmlEditor.vue'

const props = defineProps<{
  selectedRecommendation: IColleagueInfo
  selectedRecommendationIndex?: number
  origin?: string
}>()

const emit = defineEmits(['close'])
const router = useRouter()
const formValid = ref(true)
const form = ref<HTMLFormElement | null>(null)
const snackbar = ref(false)
const fullscreen: Ref<boolean> = ref(false)

const save = async () => {

  const { valid } = await form.value?.validate()

  if (!valid) {
    return
  }

  if (props.origin === 'configure') {
    setVal('recommendations/' + props.selectedRecommendationIndex, props.selectedRecommendation)
    emit('close')
  }
  if(props.origin === 'write-recommendation') {
    pushVal('recommendations', props.selectedRecommendation)
    form.value?.reset()
    props.selectedRecommendation.textHtml = ''
    snackbar.value = true

    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}

function onEditorUpdate(html: string) {
  props.selectedRecommendation.textHtml = html
}
</script>