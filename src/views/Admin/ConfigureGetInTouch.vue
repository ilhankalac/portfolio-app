<template>
  <v-container fluid>
    <p class="text-h6">The messages sent to you from get in touch section</p>
    <v-row>
      <v-col>
        <template v-for="contact in contacts">
          <v-card 
            class="my-1 pa-2" 
            color="secondary"
            style="border: 1px solid black;"
          >
            <v-card-title class="d-flex justify-space-between flex-column">
              <span class="font-weight-light">
                {{ contact.email }}
              </span>
              <span class="font-weight-light" style="font-size: small">
                {{ contact.timeStamp }}
              </span>
            </v-card-title>
            <v-card-text>
              {{ contact.message }}
            </v-card-text>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getVal } from '@/services/DataService'

const contacts: any = ref([]);

const getSentEmails = () => {
  getVal('contacted').then((val) => {
    if (val) {
      Object.keys(val).forEach((key) => {
        contacts.value.push({ ...val[key], key });
      });
    }
  });
}

onMounted(() => {
  getSentEmails();
});
</script>
