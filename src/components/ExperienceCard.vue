<template>
      <v-card 
        color="secondary"
        flat
        style="overflow-y: auto !important;"
      >
        <!-- <div 
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
        </div> -->

        <v-card-text class="ma-0 pa-0">
          <div class="font-weight-light mt-2 mb-2">
            Projects I worked on:
          </div>

          <v-timeline 
            align="start"
            density="compact" 
            line-color="darkText"
          >
            <v-timeline-item
              v-for="experience in props.selectedItem.projects"
              size="10px"
              :key="experience.time"
              :fill-dot="true"
              dot-color="white"
              style="font-size: 16px !important"
            >
              <div>
                <div 
                  class="font-weight-normal d-flex justify-space-between"
                >
                  <div 
                    class="d-flex ga-2 text-left flex-column"
                  >
                    <strong>{{ experience.name }}</strong>
                    <span 
                      class="font-weight-light"
                      style="opacity: 0.5; font-size: 14px !important;" 
                    > 
                    {{ experience.startDate }} · {{ experience.endDate }}
                    </span>
                  </div>
                  
                  <div 
                    class="d-flex"
                  >
                    <v-btn
                      v-if="experience.project_link"
                      flat
                      variant="text"
                      :style="experience.project_link ? 'opacity: 0.8' : 'opacity: 0.3'"
                      @click="openLink(experience.project_link)"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                    <div class="d-flex">
                      <v-btn variant="text"> 
                        <v-icon class="mr-1">mdi-open-in-new</v-icon> 
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div class="font-weight-light my-3" style="opacity: 0.9">
                  {{ experience.description }}
                </div>
                <div>
                  <span class="text-subtitle-2">Technologies used:</span><br>
                  <div class="text-white ">
                    <template v-for="tech in experience.technologies" :key="tech.id" color="secondary" class="">
                      <v-chip label  link size="small" class="my-1 mr-1">
                        <v-icon start :icon="`mdi-${tech.icon}`"></v-icon>
                        {{ tech.name }}
                      </v-chip>
                    </template>
                  </div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

interface IExperienceProps {
  selectedItem: any;
}

const props = defineProps<IExperienceProps>();
const emit = defineEmits(['close'])

const close = () => {
  emit("close");
};

const openLink = (link: string) => {
  window.open(link);
}

const skills = ref([
  {
    id: 1,
    name: "Vue.js",
    icon: "vuejs",
  },
  {
    id: 2,
    name: "TypeScript",
    icon: "language-typescript",
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "language-javascript",
  },
  {
    id: 4,
    name: "HTML5",
    icon: "language-html5",
  },
  {
    id: 5,
    name: "CSS3",
    icon: "language-css3",
  },
  {
    id: 6,
    name: "Vuetify",
    icon: "vuetify",
  },
]);
</script>

<style lang="scss" scoped>
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



:deep(.v-timeline-item) .v-timeline-item__body {
  padding: 5px !important;
}
</style>
