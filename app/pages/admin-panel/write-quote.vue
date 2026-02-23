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
      <div v-for="i in 3" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-4 w-full mb-2" />
        <USkeleton class="h-4 w-3/4 mb-2" />
        <USkeleton class="h-3 w-32" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!quotes || !Object.keys(quotes).length" class="text-center py-12">
      <UIcon name="i-mdi-format-quote-close" class="text-5xl text-white/20 mb-3" />
      <p class="text-white/40">No quotes yet</p>
    </div>

    <!-- Quotes list -->
    <div v-else class="space-y-4">
      <div
        v-for="(quote, key) in quotes"
        :key="key"
        class="bg-slate-800 border border-white/10 rounded-lg p-4 cursor-pointer hover:border-white/30 transition-colors"
        @click="openEditor(key as string)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <UIcon name="i-mdi-format-quote-open" class="text-white/20 text-xl" />
            <div class="text-white/80 text-sm mt-1" v-html="quote.text" />
            <p class="text-white/40 text-xs mt-2 italic">&mdash; {{ quote.author }}</p>
          </div>
          <UButton
            icon="i-mdi-delete"
            variant="ghost"
            color="error"
            size="xs"
            @click.stop="deleteQuote(key as string)"
          />
        </div>
      </div>
    </div>

    <!-- Editor Modal -->
    <UModal v-model:open="showEditor">
      <template #content>
        <div class="bg-slate-800 p-6 max-h-[80vh] overflow-y-auto">
          <h3 class="text-white text-lg font-medium mb-4">
            {{ editingKey ? 'Edit' : 'Add' }} Quote
          </h3>

          <div class="space-y-4">
            <div>
              <label class="text-white/60 text-sm mb-1 block">Author</label>
              <UInput v-model="editingQuote.author" placeholder="Quote author" />
            </div>
            <div>
              <label class="text-white/60 text-sm mb-1 block">Quote Text</label>
              <BaseEditor
                :editor-content="editingQuote.text || ''"
                fullscreen-icon="mdi-fullscreen"
                :error="false"
                @update:editor-content="(html: string) => editingQuote.text = html"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UButton variant="ghost" color="neutral" @click="showEditor = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveQuote">
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

const loading = ref(true)
const quotes = ref<Record<string, IQuote>>({})
const showEditor = ref(false)
const editingKey = ref<string | null>(null)
const editingQuote = ref<Partial<IQuote>>({})

const fetchQuotes = async () => {
  loading.value = true
  try {
    const data = await getVal('quotes')
    if (data) {
      quotes.value = data
    }
  } finally {
    loading.value = false
  }
}

const openEditor = (key: string | null) => {
  editingKey.value = key
  if (key && quotes.value[key]) {
    editingQuote.value = { ...quotes.value[key] }
  } else {
    editingQuote.value = { text: '', author: '' }
  }
  showEditor.value = true
}

const saveQuote = () => {
  if (editingKey.value) {
    setVal(`quotes/${editingKey.value}`, editingQuote.value)
    quotes.value[editingKey.value] = { ...editingQuote.value } as IQuote
  } else {
    pushVal('quotes', editingQuote.value)
    fetchQuotes()
  }
  showEditor.value = false
}

const deleteQuote = async (key: string) => {
  await deleteVal(`quotes/${key}`)
  delete quotes.value[key]
}

onMounted(() => {
  fetchQuotes()
})
</script>
