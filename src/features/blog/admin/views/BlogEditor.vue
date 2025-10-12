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
          <v-text-field v-model="blog.author" label="Author" variant="outlined" />
          
          <HtmlEditor
            :editor-content="blog.html"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="onEditorUpdate"
            @fullscreen="fullscreen = true"
          />

          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
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
              @click="setSelectedBlog(item)"
            >
              <div class="d-flex justify-space-between text-white">
                <v-list-item-content>
                  <v-list-item-title>{{ item?.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item?.date }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn variant="outlined" color="red" @click.stop="deleteBlog(key)">
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
import { Ref, onMounted, ref } from 'vue';
import { pushVal, getVal, deleteVal, setVal } from '@/core/services/firebase.service';
import HtmlEditor from '@/core/components/base/BaseEditor.vue';

const blogs: Ref<any[]> = ref([]);
const blog: Ref<any> = ref({
  title: '',
  date: '',
  image: '',
  author: '',
  key: '',
  html: '',
});

const fullscreen: Ref<boolean> = ref(false);
const selectedKey: Ref<string> = ref('');

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

const getBlogs = async () => {
  const val = await getVal('blog/posts');
  if (val) {
    blogs.value = val;
  }
};

const deleteBlog = async (key: number) => {
  await deleteVal('blog/posts/' + key);
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
  };
};

const setSelectedBlog = (item: any) => {
  selectedKey.value = item.key;
  blog.value = {
    ...item,
    html: item.html,
  };
};

function onEditorUpdate(html: string) {
  blog.value.html = html;
}

onMounted(() => {
  getBlogs();
});
</script>
