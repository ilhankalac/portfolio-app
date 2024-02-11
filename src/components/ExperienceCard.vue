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
              :key="experience.time"
              :hide-dot="true"
              :hide-opposite="true"
            >
              <div>
                <div 
                  class="font-weight-normal d-flex justify-space-between"
                >
                  <div 
                    class="d-flex ga-2"
                    :class="smAndDown ? 'flex-column mb-5' : 'align-center ga-5'"
                  >
                    <strong>{{ experience.name }}</strong>
                    <span 
                      class="font-weight-light" 
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

.v-timeline-item::v-deep .v-timeline-item__body {
  padding: 20px !important;
}
</style>
