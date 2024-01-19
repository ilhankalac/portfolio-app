<template>
  <v-container>
    <v-row justify="space-around">
      <v-card 
        color="primary" 
        style="overflow-y: auto !important;"
        :height="smAndDown ? '500px' : ''"
      >
        <div 
          class="card-header d-flex justify-space-between align-center pl-5 mb-2"
        >
          <span>{{ props.selectedItem.position }}</span>
          <div class="d-flex justify-end">
            <v-btn
              flat
              color="secondary"
              icon="mdi-close"
              @click="close"
            />
          </div>
        </div>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">
            List of projects I worked on at {{ props.selectedItem.title }}
          </div>

          <v-timeline 
            align="start"
            density="compact" 
            line-color="secondary"
          >
            <v-timeline-item
              v-for="experience in props.selectedItem.projects"
              :key="experience.time"
              dot-color="white"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ experience.name }}</strong>
                  <span 
                    class="font-weight-light" 
                    style="font-size: small;"
                  > 
                    - {{ experience.startDate }} · {{ experience.endDate }}
                  </span>
                </div>
                <div>{{ experience.description }}</div>
                <div class="py-2">
                  <v-chip
                    v-for="tech in experience.technologies"
                    :key="tech"
                    text-color="white"
                    small
                    class="mt-1 mr-1"
                  >
                    {{ tech }}
                  </v-chip>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { IExperience } from "@/types";
import {defineProps, defineEmits } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

interface IExperienceProps {
  selectedItem: IExperience;
}

const props = defineProps<IExperienceProps>();
const emit = defineEmits(['close'])

const close = () => {
  emit("close");
};
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-primary));
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.card-header {
  height: 50px;
  background-color:  rgb(var(--v-theme-secondary)); 
  position: sticky; 
  top: 0; 
  z-index: 1000;
}
</style>
