<template>
  <v-container>
    <v-row justify="space-around" >
      <v-card 
        color="#192129" 
        class="pa-4"
        style="overflow-y: auto !important;"
        height="600px"
      >
        <v-img
          height="200"
          :src="selectedExperience?.logoSrc"
          cover
          class="text-white"
        >
            <div class="d-flex justify-end">
              <v-btn
                  flat
                  color="#192129"
                  icon="mdi-close"
                  @click="close"
              />
            </div>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">
            List of projects I worked on at {{ selectedExperience?.title }}
          </div>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              v-for="experience in selectedExperience.projects"
              :key="experience.time"
              :dot-color="experience.color"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ experience.name }}</strong>
                  <span class="font-weight-light" style="font-size: small;"> - {{ experience.startDate }} · {{ experience.endDate }}</span>
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
interface IExperience {
  key: number;
  title?: string;
  date?: string;
  description?: string;
  logoSrc?: string;
  projects: any
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

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #192129; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
