<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Blog Editor</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="resetForm"
      >
        New Blog
      </UButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Editor panel -->
      <div class="lg:col-span-2">
        <div class="bg-slate-800 border border-white/10 rounded-lg p-4">
          <div class="space-y-4 mb-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Title</label>
              <UInput v-model="blogForm.title" placeholder="Blog title" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-white/60 text-sm mb-1 block">Date</label>
                <UInput v-model="blogForm.date" placeholder="e.g. January 15, 2024" />
              </div>
              <div>
                <label class="text-white/60 text-sm mb-1 block">Author</label>
                <UInput v-model="blogForm.author" placeholder="Author name" />
              </div>
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Cover Image URL</label>
              <UInput v-model="blogForm.image" placeholder="https://..." />
            </div>
          </div>

          <label class="text-white/60 text-sm mb-1 block">Content</label>
          <BaseEditor
            :editor-content="blogForm.content"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="(html: string) => blogForm.content = html"
          />

          <div class="flex gap-3 mt-5">
            <UButton
              color="primary"
              class="flex-1"
              @click="saveBlog"
            >
              {{ editingKey ? 'Update' : 'Publish' }}
            </UButton>
            <UButton
              v-if="editingKey"
              variant="ghost"
              color="neutral"
              @click="resetForm"
            >
              Cancel
            </UButton>
          </div>
        </div>
      </div>

      <!-- Blog list panel -->
      <div class="lg:col-span-1">
        <div class="bg-slate-800 border border-white/10 rounded-lg p-4">
          <h4 class="text-white font-medium mb-4">Existing Blogs</h4>

          <div v-if="loading" class="space-y-3">
            <USkeleton v-for="i in 3" :key="i" class="h-16 w-full rounded" />
          </div>

          <div v-else-if="!blogs || !Object.keys(blogs).length" class="text-center py-8">
            <UIcon name="i-mdi-file-document-outline" class="text-3xl text-white/20 mb-2" />
            <p class="text-white/40 text-sm">No blogs yet</p>
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="(blog, key) in blogs"
              :key="key"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              :class="editingKey === key ? 'bg-white/10 border border-white/20' : ''"
              @click="editBlog(key as string)"
            >
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm truncate">{{ blog.title }}</p>
                <p class="text-white/40 text-xs">{{ blog.date }}</p>
              </div>
              <UButton
                icon="i-mdi-delete"
                variant="ghost"
                color="error"
                size="xs"
                @click.stop="deleteBlog(key as string)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseEditor from '~/components/base/BaseEditor.vue'

const { getVal, setVal, pushVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const blogs = ref<Record<string, any>>({})
const editingKey = ref<string | null>(null)

const blogForm = ref({
  title: '',
  date: '',
  author: '',
  image: '',
  content: '',
})

const fetchBlogs = async () => {
  loading.value = true
  try {
    const data = await getVal('blogs')
    if (data) {
      blogs.value = data
    }
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  editingKey.value = null
  blogForm.value = {
    title: '',
    date: '',
    author: '',
    image: '',
    content: '',
  }
}

const editBlog = (key: string) => {
  editingKey.value = key
  const blog = blogs.value[key]
  blogForm.value = {
    title: blog.title || '',
    date: blog.date || '',
    author: blog.author || '',
    image: blog.image || '',
    content: blog.content || '',
  }
}

const saveBlog = () => {
  const data = { ...blogForm.value }
  if (editingKey.value) {
    setVal(`blogs/${editingKey.value}`, data)
    blogs.value[editingKey.value] = data
  } else {
    pushVal('blogs', data)
    fetchBlogs()
  }
  resetForm()
}

const deleteBlog = async (key: string) => {
  await deleteVal(`blogs/${key}`)
  delete blogs.value[key]
  if (editingKey.value === key) {
    resetForm()
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>
