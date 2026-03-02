<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Quote Editor</h3>
      <UButton
        icon="i-mdi-plus"
        color="neutral"
        variant="outline"
        @click="openEditor(null)"
      >
        Add Quote
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="skeleton-item">
        <div class="skeleton-line skeleton-line--long" />
        <div class="skeleton-line skeleton-line--medium" />
        <div class="skeleton-line skeleton-line--short" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!quoteEntries.length" class="text-center py-12">
      <UIcon name="i-mdi-format-quote-close" class="text-5xl text-white/20 mb-3" />
      <p class="text-white/40">No quotes yet</p>
    </div>

    <!-- Quotes list -->
    <div v-else class="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
      <div
        v-for="entry in quoteEntries"
        :key="entry.key"
        class="quote-item"
        @click="openEditor(entry.key)"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <UIcon name="i-mdi-format-quote-open" class="text-indigo-400/30 text-lg" />
            <div class="text-white/70 text-sm mt-1 line-clamp-2" v-html="entry.text" />
            <p class="text-white/35 text-xs mt-2 italic">&mdash; {{ entry.author || 'Unknown' }}</p>
          </div>
          <UButton
            icon="i-mdi-delete"
            variant="ghost"
            color="error"
            size="xs"
            @click.stop="deleteQuote(entry.key)"
          />
        </div>
      </div>
    </div>

    <!-- Editor Modal -->
    <UModal v-model:open="showEditor">
      <template #content>
        <div class="modal-content">
          <h3 class="text-white text-lg font-medium mb-4">
            {{ editingKey ? 'Edit' : 'Add' }} Quote
          </h3>

          <div class="space-y-4">
            <div>
              <label class="field-label">Author</label>
              <UInput v-model="editingQuote.author" placeholder="Quote author" />
            </div>
            <div>
              <label class="field-label">Quote Text</label>
              <BaseEditor
                :editor-content="editingQuote.text || ''"
                fullscreen-icon="mdi-fullscreen"
                :error="false"
                @update:editor-content="(html: string) => editingQuote.text = html"
              />
            </div>
          </div>

          <!-- Status -->
          <div v-if="statusMessage" class="status-msg" :class="statusType">
            {{ statusMessage }}
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showEditor = false">
              Cancel
            </UButton>
            <UButton color="primary" :loading="saving" @click="saveQuote">
              Save
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import BaseEditor from '~/components/base/BaseEditor.vue'
import type { IQuote } from '~/types/models'

const { getVal, setVal, pushVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const QUOTES_PATH = 'blog/favorite-quotes'

const loading = ref(true)
const saving = ref(false)
const quotes = ref<Record<string, IQuote>>({})
const showEditor = ref(false)
const editingKey = ref<string | null>(null)
const editingQuote = ref<Partial<IQuote>>({})
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

const quoteEntries = computed(() => {
  return Object.entries(quotes.value).map(([key, val]) => ({ key, ...val }))
})

const fetchQuotes = async () => {
  loading.value = true
  try {
    const data = await getVal(QUOTES_PATH)
    if (data) {
      quotes.value = data
    }
  } finally {
    loading.value = false
  }
}

const openEditor = (key: string | null) => {
  editingKey.value = key
  statusMessage.value = ''
  if (key && quotes.value[key]) {
    editingQuote.value = { ...quotes.value[key] }
  } else {
    editingQuote.value = { text: '', author: '' }
  }
  showEditor.value = true
}

const showStatus = (msg: string, type: 'success' | 'error') => {
  statusMessage.value = msg
  statusType.value = type
  setTimeout(() => { statusMessage.value = '' }, 3000)
}

const saveQuote = async () => {
  if (!editingQuote.value.text?.trim()) {
    showStatus('Quote text is required.', 'error')
    return
  }

  saving.value = true
  try {
    const data = {
      text: editingQuote.value.text,
      author: editingQuote.value.author || '',
    }

    if (editingKey.value) {
      await setVal(`${QUOTES_PATH}/${editingKey.value}`, data)
      quotes.value[editingKey.value] = data as IQuote
      showStatus('Quote updated.', 'success')
    } else {
      await pushVal(QUOTES_PATH, data)
      await fetchQuotes()
      showStatus('Quote added.', 'success')
    }
    showEditor.value = false
  } catch (e) {
    showStatus('Failed to save.', 'error')
    console.error(e)
  } finally {
    saving.value = false
  }
}

const deleteQuote = async (key: string) => {
  if (!confirm('Delete this quote?')) return
  try {
    await deleteVal(`${QUOTES_PATH}/${key}`)
    delete quotes.value[key]
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchQuotes()
})
</script>

<style scoped lang="scss">
.field-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.quote-item {
  background: rgb(30, 41, 59);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgb(33, 45, 64);
  }
}

.modal-content {
  background: rgb(30, 41, 59);
  padding: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
}

.skeleton-item {
  background: rgb(30, 41, 59);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 0.75rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: pulse 1.5s ease-in-out infinite;

  &--long { width: 90%; }
  &--medium { width: 60%; }
  &--short { width: 25%; }
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
