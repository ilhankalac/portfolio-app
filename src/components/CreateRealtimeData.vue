<template>
  <div
    color="primary" 
    class="d-flex flex-column ga-5"
    style="max-width: 700px; margin: auto;"
  >
    <h2 class="pa-10">Add the data to Firebase Realtime database</h2>
    <div 
      v-for="(val, index) of data"
      class="d-flex ga-2" 
    >
      <v-text-field
        v-model="val.key"
        label="key_name"
        outlined
      />
      <v-text-field
        v-model="val.value"
        label="value"
        outlined
      />
      <v-btn 
        v-if="index === data.length - 1"
        variant="text"
        class="mt-2" 
        @click="data.push({ key: '', value: '' })"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn 
        v-if="data.length > 1"
        variant="text" 
        class="mt-2" 
        @click="data.splice(index, 1)"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
  
    <v-btn 
      @click=""
      variant="outlined"
    >
      Save
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { setVal, getVal, pushVal } from "@/services/DataService"
import { ref } from "vue"

const data = ref([
  {
    key: "",
    value: "",
  },
])

</script>