<template>
  <div class="projects-section mt-2">
    <div class="flex items-center gap-3 mb-5">
      <span class="text-base font-semibold text-white uppercase tracking-wider">Projects</span>
      <span class="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-white/10 text-xs font-semibold text-white">
        {{ props.selectedItem.projects?.length || 0 }}
      </span>
    </div>

    <div class="flex flex-col gap-5">
      <div
        v-for="project in props.selectedItem.projects"
        :key="project.time"
        class="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
      >
        <div class="flex justify-between items-start gap-4 mb-3 flex-wrap">
          <div class="flex-1 min-w-[200px]">
            <h4 class="text-base font-semibold text-white mb-1 leading-tight">{{ project.name }}</h4>
            <span class="text-xs text-white/50 block">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <div class="flex gap-2 shrink-0">
            <button
              v-if="project.code_link"
              class="flex items-center gap-1 text-white/70 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded transition-colors"
              @click.stop="openLink(project.code_link)"
            >
              <UIcon name="i-mdi-code-tags" class="text-lg" /> Code
            </button>
            <button
              v-if="project.project_link"
              class="flex items-center gap-1 text-white/70 text-sm hover:text-white hover:bg-white/10 px-3 py-1 rounded transition-colors"
              @click.stop="openLink(project.project_link)"
            >
              <UIcon name="i-mdi-open-in-new" class="text-lg" /> Live
            </button>
          </div>
        </div>

        <div
          v-if="project.description"
          v-html="addLeftMarginToHtml(project.description)"
          class="text-white/65 leading-relaxed text-sm mb-3 [&_p]:mb-2 [&_ul]:my-2 [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:pl-5 [&_li]:mb-1"
        />

        <div v-if="project.technologies?.length" class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tech in project.technologies"
            :key="tech.id"
            class="inline-flex items-center gap-1 px-2 py-1 border border-white/20 rounded text-white/80 text-xs hover:bg-white/[0.05] hover:border-white/30 transition-colors"
          >
            <UIcon :name="`i-mdi-${tech.icon}`" class="text-base opacity-80" />
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
const emit = defineEmits(['close'])

const openLink = (link: string) => { window.open(link) }

const addLeftMarginToHtml = (content: string) => {
  return content.replace(/ql-indent/g, 'ml-4 ql-indent')
}
</script>
