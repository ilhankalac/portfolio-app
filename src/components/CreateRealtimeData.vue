<template>
  <div
    color="primary" 
    class="d-flex flex-column ga-5"
    style="max-width: 700px; margin: auto;"
  >
    <h2 class="pa-10">Add the data to Firebase Realtime database</h2>
    <v-text-field 
      v-model="path"
      label="Path of the data in the database"
    />

    <v-textarea 
      label="Paste the JSON data here"
      v-model="rawStringData"
      rows="15"
    >
    </v-textarea>
  
    <v-btn 
      @click="pushValue"
      variant="outlined"
    >
      Save
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { setVal, pushVal } from "@/services/DataService"
import { ref } from "vue"

const rawStringData = ref("")
const path = ref("")

const writeData = async () => {
	setVal("test", { test: "test" })
}

const pushValue = async () => {
  const dataObj = JSON.parse(rawStringData.value);
	await pushVal(path.value, dataObj)
  path.value = ""
  rawStringData.value = ""
}
</script>