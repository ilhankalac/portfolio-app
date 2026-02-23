<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-white text-xl font-light">Contact Messages</h3>
      <span class="text-white/40 text-sm">{{ messageCount }} messages</span>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-slate-800 border border-white/10 rounded-lg p-4">
        <USkeleton class="h-4 w-48 mb-3" />
        <USkeleton class="h-3 w-full mb-2" />
        <USkeleton class="h-3 w-3/4" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!messages || !Object.keys(messages).length" class="text-center py-12">
      <UIcon name="i-mdi-email-open-outline" class="text-5xl text-white/20 mb-3" />
      <p class="text-white/40">No messages yet</p>
    </div>

    <!-- Messages list -->
    <div v-else class="space-y-4">
      <div
        v-for="(msg, key) in messages"
        :key="key"
        class="bg-slate-800 border border-white/10 rounded-lg p-4"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi-email" class="text-white/40" />
            <span class="text-white font-medium text-sm">{{ msg.email }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-white/40 text-xs">{{ formatDate(msg.timeStamp) }}</span>
            <UButton
              icon="i-mdi-delete"
              variant="ghost"
              color="error"
              size="xs"
              @click="deleteMessage(key as string)"
            />
          </div>
        </div>
        <USeparator class="my-3" />
        <p class="text-white/70 text-sm whitespace-pre-wrap">{{ msg.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IContact } from '~/types/models'

const { getVal, deleteVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const loading = ref(true)
const messages = ref<Record<string, IContact>>({})

const messageCount = computed(() => Object.keys(messages.value).length)

const fetchMessages = async () => {
  loading.value = true
  try {
    const data = await getVal('contact-messages')
    if (data) {
      messages.value = data
    }
  } finally {
    loading.value = false
  }
}

const deleteMessage = async (key: string) => {
  await deleteVal(`contact-messages/${key}`)
  delete messages.value[key]
}

const formatDate = (timestamp: string) => {
  if (!timestamp) return ''
  try {
    return new Date(timestamp).toLocaleString()
  } catch {
    return timestamp
  }
}

onMounted(() => {
  fetchMessages()
})
</script>
