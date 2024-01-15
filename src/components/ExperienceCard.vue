<template>
  <v-card>
    <v-card-title
      style="height: 60px; background-color: #596a6e"
      class="text-white d-flex justify-space-between"
    >
      <span class="ma-2">{{ selectedExperience?.title }}</span>
      <div>
        <v-btn
          style="color: white"
          color="#596a6e"
          flat
          icon="mdi-close"
          @click="close"
        />
      </div>
    </v-card-title>
    <v-sheet
      class="d-flex pa-2"
      :class="
        smAndDown ? 'flex-column justify-center align-center' : 'flex-row'
      "
    >
      <div style="max-width: 200px; max-height: 150px; overflow: hidden">
        <img
          style="width: 100%; height: 100%; object-fit: contain"
          :src="selectedExperience?.logoSrc"
          alt=""
        />
      </div>
      <v-card-text>
        {{ selectedExperience?.description }}
      </v-card-text>
    </v-sheet>
  </v-card>
</template>

<script lang="ts" setup>
interface IExperience {
  key: number;
  title?: string;
  date?: string;
  description?: string;
  logoSrc?: string;
}
import { computed, defineProps, defineEmits } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const props = defineProps<{
  selectedExperience?: IExperience | null;
}>();

const emit = defineEmits(['close'])

const close = () => {
  emit("close");
};
</script>
