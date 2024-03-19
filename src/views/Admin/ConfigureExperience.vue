<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>Experience</span>
          </v-card-title>
          <!-- <QuillEditor v-model:content="description" contentType="html" theme="snow"></QuillEditor> -->
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Save
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { setVal, getVal } from '@/services/DataService'
const description = ref('');

const save = () => {
  setVal('about', description.value);
}

onMounted(() => {
  getVal('about').then((val) => {
    if (val) {
      description.value = val;
    }
  });
});
</script>
