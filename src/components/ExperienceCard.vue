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
              <div>
                <div 
                  class="font-weight-normal d-flex mb-1 justify-space-between"
                  :class="smAndDown ? 'flex-column ga-2 mb-5' : 'align-center ga-5'"
                >
                  <div 
                    class="d-flex ga-2"
                    :class="smAndDown ? 'flex-column ga-2 mb-5 justify-center' : 'align-center ga-5'"
                  >
                    <strong>{{ experience.name }}</strong>
                    <span 
                      class="font-weight-light" 
                      style="font-size: small; opacity: 0.8;"
                    > 
                    {{ experience.startDate }} · {{ experience.endDate }}
                    </span>
                  </div>
                  
                  <div 
                    class="d-flex"
                    :class="smAndDown ? 'flex-column ga-2 mb-5' : 'align-center ga-5'"
                  >
                    <v-btn
                      flat
                      :variant="smAndDown ? 'outlined' : 'text'"
                      :style="experience.project_link ? 'opacity: 0.8' : 'opacity: 0.3'"
                      :disabled="!experience.project_link"
                      @click="openLink(experience.project_link)"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                      <span class="text-caption ml-2">{{ experience.project_link ? 'Source Code' : 'Private Repo' }}</span>
                    </v-btn>
                    <div class="d-flex">
                      <v-btn :variant="smAndDown ? 'outlined' : 'text'" block> 
                        <v-icon class="mr-1">mdi-open-in-new</v-icon> 
                        <span class="text-caption ml-2">Visit Now</span>
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div class="text-subtitle-2 font-weight-light text-justify mb-3">
                  {{ experience.description }}
                </div>

                <div>
                  <span class="text-subtitle-2">Technologies used:</span><br>
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
import { defineProps, defineEmits } from "vue";
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

const openLink = (link: string) => {
  window.open(link);
}
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
