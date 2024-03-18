<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary">
          <v-card-title>
            <span class="headline">About</span>
          </v-card-title>
            <QuillEditor v-model:content="description" contentType="html" theme="snow"></QuillEditor>
          <v-card-actions>
            <v-btn color="white" variant="outlined" @click="save" block>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const description = ref('');

const save = () => {
  console.log(description.value);
}
</script>
