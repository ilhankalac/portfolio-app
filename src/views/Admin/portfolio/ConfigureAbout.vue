<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>About</span>
          </v-card-title>
          <HtmlEditor
            v-if="description"
            ref="editor"
            class="mt-8"
            fullscreen-icon="fas fa-up-right-and-down-left-from-center"
            :editor-content="description"
             @update:editor-content="onEditorUpdate"
          />
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Save
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { setVal, getVal } from '@/services/DataService'
import HtmlEditor from '@/components/HtmlEditor.vue'
const description = ref('')

const save = () => {
  setVal('about', description.value)
}

const onEditorUpdate = (content: any) => {
  description.value = content
}

onMounted(() => {
  getVal('about').then((val) => {
    if (val) {
      description.value = val
    }
  })
})
</script>
