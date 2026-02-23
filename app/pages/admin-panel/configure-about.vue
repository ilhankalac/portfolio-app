<template>
  <div class="p-4">
    <div class="bg-slate-800 border border-white/10 rounded-lg p-4">
      <h3 class="text-white text-lg mb-4">About</h3>
      <BaseEditor
        :editor-content="description"
        fullscreen-icon="mdi-fullscreen"
        :error="false"
        @update:editor-content="onEditorUpdate"
      />
      <UButton
        variant="outline"
        color="neutral"
        class="mt-5 w-full"
        @click="save"
      >
        Save
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseEditor from '~/components/base/BaseEditor.vue'

const { setVal, getVal } = useFirebase()

definePageMeta({ middleware: 'auth', layout: 'admin' })

const description = ref('')

const save = () => {
  setVal('about', description.value)
}

function onEditorUpdate(html: string) {
  description.value = html
}

onMounted(() => {
  getVal('about').then((val: any) => {
    if (val) description.value = val
  })
})
</script>
