<template>
  <div class="projects-wrap">
    <div class="projects-label">
      <UIcon name="i-mdi-folder-outline" class="projects-label-icon" />
      <span>Projects</span>
      <span class="projects-count">{{ props.selectedItem.projects?.length || 0 }}</span>
    </div>

    <div class="projects-list">
      <div
        v-for="(project, index) in props.selectedItem.projects"
        :key="project.time || index"
        class="project-item"
      >
        <div class="project-top">
          <div class="project-info">
            <h4 class="project-name">{{ project.name }}</h4>
            <span class="project-dates">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <div class="project-actions">
            <button
              v-if="project.code_link"
              class="project-btn"
              @click.stop="openLink(project.code_link)"
            >
              <UIcon name="i-mdi-github" />
              <span class="project-btn-label">Code</span>
            </button>
            <button
              v-if="project.project_link"
              class="project-btn"
              @click.stop="openLink(project.project_link)"
            >
              <UIcon name="i-mdi-open-in-new" />
              <span class="project-btn-label">Live</span>
            </button>
          </div>
        </div>

        <div
          v-if="project.description"
          v-html="addLeftMarginToHtml(project.description)"
          class="project-desc"
        />

        <div v-if="project.technologies?.length" class="project-techs">
          <span
            v-for="tech in project.technologies"
            :key="tech.id"
            class="tech-pill"
          >
            <UIcon :name="`i-mdi-${tech.icon}`" class="tech-pill-icon" />
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IExperienceProps {
  selectedItem: any
}

const props = defineProps<IExperienceProps>()

const openLink = (link: string) => { window.open(link, '_blank') }

const addLeftMarginToHtml = (content: string) => {
  return content.replace(/ql-indent/g, 'ml-4 ql-indent')
}
</script>

<style lang="scss" scoped>
.projects-wrap {
  margin-top: 0.25rem;
}

.projects-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.875rem;
}

.projects-label-icon {
  font-size: 0.85rem;
  color: #818cf8;
}

.projects-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9999px;
  background: rgba(129, 140, 248, 0.15);
  color: #818cf8;
  font-size: 0.6rem;
  font-weight: 700;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.project-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  padding: 1rem 1.15rem;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-size: 0.84rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  margin: 0 0 0.2rem;
  line-height: 1.3;
}

.project-dates {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.35);
}

.project-actions {
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }
}

.project-btn-label {
  @media (max-width: 480px) {
    display: none;
  }
}

.project-desc {
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 0.75rem;

  :deep(p) { margin: 0 0 0.4rem; }
  :deep(ul), :deep(ol) { margin: 0.4rem 0; padding-left: 1.25rem; }
  :deep(li) { margin-bottom: 0.25rem; }
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.18rem 0.5rem;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 9999px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.25);
    color: rgba(255, 255, 255, 0.65);
  }
}

.tech-pill-icon {
  font-size: 0.7rem;
  opacity: 0.7;
}
</style>
