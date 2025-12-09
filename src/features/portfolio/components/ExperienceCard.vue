<template>
  <div class="projects-section">
    <div class="projects-header">
      <span class="projects-title">Projects</span>
      <span class="projects-count">{{ props.selectedItem.projects?.length || 0 }}</span>
    </div>

    <div class="projects-list">
      <div
        v-for="project in props.selectedItem.projects"
        :key="project.time"
        class="project-item"
      >
        <div class="project-header">
          <div class="project-main">
            <h4 class="project-name">{{ project.name }}</h4>
            <span class="project-period">
              {{ project.startDate }} - {{ project.endDate }}
            </span>
          </div>

          <div class="project-links">
            <v-btn
              v-if="project.code_link"
              size="small"
              variant="text"
              class="link-btn"
              @click.stop="openLink(project.code_link)"
            >
              <v-icon size="18">mdi-code-tags</v-icon>
              Code
            </v-btn>
            <v-btn
              v-if="project.project_link"
              size="small"
              variant="text"
              class="link-btn"
              @click.stop="openLink(project.project_link)"
            >
              <v-icon size="18">mdi-open-in-new</v-icon>
              Live
            </v-btn>
          </div>
        </div>

        <div
          v-if="project.description"
          v-html="addLeftMarginToHtml(project.description)"
          class="project-description"
        />

        <div v-if="project.technologies?.length" class="project-technologies">
          <v-chip
            v-for="tech in project.technologies"
            :key="tech.id"
            size="small"
            variant="outlined"
            class="tech-chip"
          >
            <v-icon start size="16" :icon="`mdi-${tech.icon}`"></v-icon>
            {{ tech.name }}
          </v-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useDisplay } from "vuetify"
const { smAndDown } = useDisplay()

interface IExperienceProps {
  selectedItem: any
}

const props = defineProps<IExperienceProps>()
const emit = defineEmits(['close'])

const close = () => {
  emit("close")
}

const openLink = (link: string) => {
  window.open(link)
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
])

const addLeftMarginToHtml = (content: string) => {
  return content.replace(/ql-indent/g, 'ml-4 ql-indent')
}
</script>

<style lang="scss" scoped>
.projects-section {
  margin-top: 8px;
}

.projects-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .projects-title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .projects-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
  }
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
  }
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.project-main {
  flex: 1;
  min-width: 200px;
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.project-period {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  display: block;
}

.project-links {
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  .link-btn {
    color: rgba(255, 255, 255, 0.7);
    text-transform: none;
    letter-spacing: 0;
    padding: 0 12px;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    :deep(.v-icon) {
      margin-right: 4px;
    }
  }
}

.project-description {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  font-size: 0.875rem;
  margin-bottom: 12px;

  :deep(p) {
    margin-bottom: 8px;
  }

  :deep(ul), :deep(ol) {
    margin: 8px 0;
    padding-left: 20px;
  }

  :deep(li) {
    margin-bottom: 4px;
  }
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  .tech-chip {
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.75rem;
    height: 28px;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.3);
    }

    :deep(.v-icon) {
      opacity: 0.8;
    }
  }
}

// Mobile Responsive
@media screen and (max-width: 699px) {
  .project-header {
    flex-direction: column;
    gap: 12px;
  }

  .project-links {
    width: 100%;
    justify-content: flex-start;
  }

  .project-name {
    font-size: 0.95rem;
  }

  .project-period {
    font-size: 0.75rem;
  }
}
</style>
