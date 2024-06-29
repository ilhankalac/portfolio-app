<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card 
          class="pa-4"
          style="flex-grow: 1 !important" 
          color="secondary" 
        >
          <v-card-title>
            <span>About</span>
          </v-card-title>

           <HtmlEditor
            :editor-content="description"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="onEditorUpdate"
            @fullscreen="fullscreen = true"
          />
          
          <v-btn 
            color="white" 
            class="mt-5" 
            variant="outlined" 
            block
            @click="save"
          >
            Save
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { setVal, getVal } from '@/services/DataService'
import HtmlEditor from '@/components/HtmlEditor.vue'

const description: Ref<string> = ref('')
const fullscreen: Ref<boolean> = ref(false);

const save = () => {
  setVal('about', description.value)
}

function onEditorUpdate(html: string) {
  description.value = html;
}

onMounted(() => {
  getVal('about').then((val) => {
    if (val) {
      description.value = val
    }
  })
})
</script>
