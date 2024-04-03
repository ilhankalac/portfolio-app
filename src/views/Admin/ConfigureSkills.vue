<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Skills configuration</h3>
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
