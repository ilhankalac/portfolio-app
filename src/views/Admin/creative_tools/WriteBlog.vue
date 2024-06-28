<template>
  <v-container>
    <div style="position: absolute; right: 0; z-index: 100;" class="mr-6 mt-2">
      <v-btn variant="outlined" @click="resetBlog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
            <span>About</span>
          </v-card-title>
          <v-text-field v-model="blog.title" label="Title" variant="outlined" />
          <v-text-field v-model="blog.date" label="Date" variant="outlined" />

          <v-text-field v-model="blog.image" label="Image" variant="outlined" />
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
          <v-btn
            color="white"
            class="mt-5"
            variant="outlined"
            @click="save"
            block
          >
            Publish
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card color="secondary" class="pa-4">
          <div>
            <span>Posts</span>
          </div>
          <v-list style="background-color: rgba(var(--v-theme-secondary));">
            <v-list-item
              v-for="(item, key) in blogs"
              :key="key"
              class="pa-4"
              elevation="2"
              style="cursor: pointer"
              @click="blog = item; selectedKey = key"
            >
              <div class="d-flex justify-space-between text-white">
                <v-list-item-content>
                  <v-list-item-title>{{ item?.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item?.date }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    variant="outlined"
                    color="red"
                    @click="deleteBlog(key)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { pushVal, getVal, deleteVal, setVal } from '@/services/DataService';
const description = ref('');
const blogs: any = ref([]);
const blog = ref({
  title: '',
  date: '',
  image: '',
  author: '',
  key: '',
  html: '',
});

const selectedKey: any = ref('');
const save = () => {
  if (selectedKey.value !== '') {
    setVal('blog/posts/' + selectedKey.value, blog.value);
    getBlogs();
    return;
  }
  selectedKey.value = '';
  
  blog.value.key = blog.value.title
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  pushVal('blog/posts', blog.value);
  getBlogs();
};

const getBlogs = () => {
  getVal('blog/posts').then((val) => {
    if (val) {
      blogs.value = val;
    }
  });
};

const deleteBlog = (key: number) => {
  deleteVal('blog/posts/' + key);
  getBlogs();
};

const resetBlog = () => {
  selectedKey.value = '';
  blog.value = {
    title: '',
    date: '',
    image: '',
    author: '',
    key: '',
    html: '',
  }
  var element = document.getElementsByClassName("ql-editor");
  element[0].innerHTML = "";
}

onMounted(() => {
  getBlogs();
});
</script>
