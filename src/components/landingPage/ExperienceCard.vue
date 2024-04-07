<template>
  <v-card 
    color="primary"
    flat
  >
    <div class="font-weight-light mt-5 mb-2 text-white text-center">
      Projects I worked on in {{ props.selectedItem.title }}
    </div>
    <v-timeline 
      align="start"
      line-color="secondary"
      line-thickness="1"
    >
      <v-timeline-item
        v-for="experience in props.selectedItem.projects"
        size="15px"
        dot-color="white"
        :key="experience.time"
        :fill-dot="true"
        :hide-dot="smAndDown"
      >
          <div class="font-weight-normal d-flex justify-space-between mb-1 pt-2">
            <div 
              class="d-flex flex-column"
            >
              <strong>{{ experience.name }}</strong>
              <span 
                class="font-weight-light  text-greyText"
                style="font-size: 14px !important; margin-top:2px;" 
              > 
                {{ experience.startDate }} - {{ experience.endDate }}
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
          <div 
            v-html="addLeftMarginToHtml(experience.description)" 
            class="font-weight-light text-greyText mb-2"
            style="font-size: 14px !important; margin-top:2px;"
          />
          <div class="text-white">
            <template v-for="tech in experience.technologies" :key="tech.id" class="">
              <v-chip label  link size="small" class="my-1 mr-1 text-greyText">
                <v-icon start :icon="`mdi-${tech.icon}`"></v-icon>
                {{ tech.name }}
              </v-chip>
            </template>
          </div>
      </v-timeline-item>
    </v-timeline>
    <v-divider v-if="smAndDown"/>
  </v-card><br>
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

const addLeftMarginToHtml = (content: string) => {
  return content.replace(/ql-indent/g, 'ml-4 ql-indent');
};
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

:deep(.v-timeline-item__opposite){
  display: none;
}

:deep(.v-timeline--vertical.v-timeline){
  row-gap: 0px;
}

:deep(.v-timeline-item) .v-timeline-item__body {
  padding:0px 0px 0px 10px !important;
  margin-left: 20px !important;
}

@media screen and (max-width: 700px) {
  :deep(.v-timeline-divider__after ){
    display: none;
  }

  :deep(.v-timeline-divider__before ){
    display: none;
  }

  :deep(.v-timeline--vertical.v-timeline){
    row-gap: 0px;
  }
  :deep(.v-timeline-item) .v-timeline-item__body {
    padding:10px !important;
    margin-left: 0px !important;
  }
}
</style>
