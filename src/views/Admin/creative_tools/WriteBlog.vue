<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>About</span>
          </v-card-title>
          <QuillEditor v-model:content="description" contentType="html" theme="snow"></QuillEditor>
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Save
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card 
          v-for="blog in blogs"
          style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>Blog</span>
            <div>
              <div v-html="blog.html"></div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { pushVal, getVal } from '@/services/DataService'
const description = ref('')
const blogs = ref([]);

const save = () => {
  pushVal('blog/posts', { html: description.value })
  getBlogs()
}

const getBlogs = () => {
  getVal('blog/posts').then((val) => {
    if (val) {
      blogs.value = val
    }
  })
}

onMounted(() => {
  getBlogs()
})
</script>
