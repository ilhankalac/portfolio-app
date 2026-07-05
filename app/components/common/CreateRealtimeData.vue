<template>
  <div class="max-w-[700px] mx-auto flex flex-col gap-5">
    <h2 class="p-10 text-white">Add the data to Firebase Realtime database</h2>
    <UInput v-model="path" placeholder="Path of the data in the database" />
    <UTextarea v-model="rawStringData" placeholder="Paste the JSON data here" :rows="15" />
    <UButton variant="outline" @click="pushValue">Save</UButton>
  </div>
</template>

<script lang="ts" setup>
const { pushVal } = useFirebase()
const rawStringData = ref('')
const path = ref('')

const pushValue = async () => {
  const dataObj = JSON.parse(rawStringData.value)
  await pushVal(path.value, dataObj)
  path.value = ''
  rawStringData.value = ''
}
</script>
