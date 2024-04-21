<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>About</span>
          </v-card-title>
          <v-text-field
            v-model="blog.title"
            label="Title"
            variant="outlined"
          />
          <v-text-field
            v-model="blog.date"
            label="Date"
            variant="outlined"
          />

          <v-text-field
            v-model="blog.image"
            label="Image"
            variant="outlined"
          />
          <v-text-field
            v-model="blog.author"
            label="Author"
            variant="outlined"
          />

          <QuillEditor 
            v-model:content="blog.html" 
            contentType="html" 
            theme="snow"

          />
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Publish
          </v-btn>
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
const blog = ref({
  title: '',
  date: '',
  image: '',
  author: '',
  key: '',
  html: ''
})

const save = () => {
  blog.value.key = blog.value.title.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase();
  pushVal('blog/posts', blog.value)
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
