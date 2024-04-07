<template>
      <v-card 
        color="primary"
        flat
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

          <div class="font-weight-light mt-5 mb-2 text-white text-center">
            Projects I worked on:
          </div>
          <v-timeline 
            align="start"
            line-color="secondary"
            line-thickness="1"
          >
            <v-timeline-item
              v-for="experience in props.selectedItem.projects"
              size="15px"
              :key="experience.time"
              :fill-dot="true"
              dot-color="white"
            >
                <div class="font-weight-normal d-flex justify-space-between pt-4">
                  <div 
                    class="d-flex ga-2 text-left"
                  >
                    <strong>{{ experience.name }}</strong> <span class="text-greyText">{{ experience.startDate }} · {{ experience.endDate }}</span>
                    <span 
                      class="font-weight-light"
                      style="opacity: 0.5; font-size: 14px !important;" 
                    > 
                    
                    </span>
                  </div>
                  
                  <div 
                    class="d-flex"
                  >
                    <v-btn
                      v-if="experience.code_link"
                      flat
                      variant="text"
                      @click="openLink(experience.code_link)"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                    <div class="d-flex">
                      <v-btn 
                        v-if="experience.project_link"
                        variant="text"
                        @click="openLink(experience.project_link)"
                      > 
                        <v-icon class="mr-1">mdi-open-in-new</v-icon> 
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div v-html="experience.description" class="font-weight-light my-3 pl-4 text-greyText" />
                <div>
                  <div class="text-white ">
                    <template v-for="tech in experience.technologies" :key="tech.id" class="">
                      <v-chip label  link size="small" class="my-1 mr-1 text-greyText">
                        <v-icon start :icon="`mdi-${tech.icon}`"></v-icon>
                        {{ tech.name }}
                      </v-chip>
                    </template>
                  </div>
                </div>
            </v-timeline-item>
          </v-timeline>
      </v-card><br>
      <v-divider></v-divider>
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
  background-color:  rgb(var(--v-theme-primary)); 
  position: sticky; 
  top: 0; 
  z-index: 1000;
}

:deep(.v-timeline-item) .v-timeline-item__body {
  padding: 5px !important;
}



:deep(.v-timeline-item__opposite){
  display: none;
}

:deep(.v-timeline--vertical.v-timeline){
  row-gap: 0px;
}
</style>
