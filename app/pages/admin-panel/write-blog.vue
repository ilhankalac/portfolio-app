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
        <div class="editor-panel">
          <div class="space-y-4 mb-4">
            <div>
              <label class="field-label">Title</label>
              <UInput v-model="blogForm.title" placeholder="Blog title" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Date</label>
                <UInput v-model="blogForm.date" placeholder="e.g. 01/15/2024" />
              </div>
              <div>
                <label class="field-label">Author</label>
                <UInput v-model="blogForm.author" placeholder="Author name" />
              </div>
            </div>
            <div>
              <label class="field-label">Cover Image URL</label>
              <UInput v-model="blogForm.image" placeholder="https://..." />
            </div>
          </div>

          <label class="field-label">Content</label>
          <BaseEditor
            :editor-content="blogForm.html"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="(html: string) => blogForm.html = html"
          />

          <div class="flex gap-3 mt-5">
            <UButton
              color="primary"
              class="flex-1"
              :loading="saving"
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

          <!-- Status message -->
          <div v-if="statusMessage" class="status-msg" :class="statusType">
            {{ statusMessage }}
          </div>
        </div>
      </div>

      <!-- Blog list panel -->
      <div class="lg:col-span-1">
        <div class="list-panel">
          <h4 class="text-white font-medium mb-4">Existing Blogs</h4>

          <div v-if="loading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="skeleton-item" />
          </div>

          <div v-else-if="!blogEntries.length" class="text-center py-8">
            <UIcon name="i-mdi-file-document-outline" class="text-3xl text-white/20 mb-2" />
            <p class="text-white/40 text-sm">No blogs yet</p>
          </div>

          <div v-else class="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            <div
              v-for="entry in blogEntries"
              :key="entry.key"
              class="blog-item"
              :class="{ active: editingKey === entry.key }"
              @click="editBlog(entry.key)"
            >
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm truncate">{{ entry.title }}</p>
                <p class="text-white/40 text-xs">{{ entry.date || 'No date' }}</p>
              </div>
              <UButton
                icon="i-mdi-delete"
                variant="ghost"
                color="error"
                size="xs"
                @click.stop="deleteBlog(entry.key)"
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

const { getVal, setVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const BLOG_PATH = 'blog/posts'

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const loading = ref(true)
const saving = ref(false)
const blogs = ref<Record<string, any>>({})
const editingKey = ref<string | null>(null)
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

const blogForm = ref({
  title: '',
  date: '',
  author: '',
  image: '',
  html: '',
})

const blogEntries = computed(() => {
  return Object.entries(blogs.value)
    .map(([key, val]) => ({ key, ...val }))
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime()
      const dateB = new Date(b.created_at || 0).getTime()
      return dateB - dateA
    })
})

const fetchBlogs = async () => {
  loading.value = true
  try {
    const data = await getVal(BLOG_PATH)
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
    html: '',
  }
  statusMessage.value = ''
}

const editBlog = (key: string) => {
  editingKey.value = key
  const blog = blogs.value[key]
  blogForm.value = {
    title: blog.title || '',
    date: blog.date || '',
    author: blog.author || '',
    image: blog.image || '',
    html: blog.html || blog.content || '',
  }
  statusMessage.value = ''
}

const showStatus = (msg: string, type: 'success' | 'error') => {
  statusMessage.value = msg
  statusType.value = type
  setTimeout(() => { statusMessage.value = '' }, 3000)
}

const saveBlog = async () => {
  if (!blogForm.value.title.trim()) {
    showStatus('Title is required.', 'error')
    return
  }

  saving.value = true
  try {
    const slug = editingKey.value || generateSlug(blogForm.value.title)

    if (!editingKey.value && blogs.value[slug]) {
      showStatus('A blog with this title already exists.', 'error')
      saving.value = false
      return
    }

    const data = {
      title: blogForm.value.title,
      slug,
      date: blogForm.value.date,
      author: blogForm.value.author,
      image: blogForm.value.image,
      html: blogForm.value.html,
      created_at: editingKey.value
        ? (blogs.value[editingKey.value]?.created_at || new Date().toISOString())
        : new Date().toISOString(),
    }

    await setVal(`${BLOG_PATH}/${slug}`, data)
    blogs.value[slug] = data

    showStatus(editingKey.value ? 'Blog updated.' : 'Blog published.', 'success')
    resetForm()
  } catch (e) {
    showStatus('Failed to save. Check console.', 'error')
    console.error(e)
  } finally {
    saving.value = false
  }
}

const deleteBlog = async (key: string) => {
  if (!confirm('Delete this blog post?')) return
  try {
    await deleteVal(`${BLOG_PATH}/${key}`)
    delete blogs.value[key]
    if (editingKey.value === key) {
      resetForm()
    }
    showStatus('Blog deleted.', 'success')
  } catch (e) {
    showStatus('Failed to delete.', 'error')
    console.error(e)
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped lang="scss">
.field-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.editor-panel {
  background: rgb(30, 41, 59);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.list-panel {
  background: rgb(30, 41, 59);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.blog-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
}

.skeleton-item {
  height: 3.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  animation: pulse 1.5s ease-in-out infinite;
}

.status-msg {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;

  &.success {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  &.error {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
