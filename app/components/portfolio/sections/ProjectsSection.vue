<template>
  <SectionWrapper
    sectionId="freetime-projects"
    header="Freetime Projects"
    :customStyle="`background: rgb(var(--color-primary));`"
    textColor="white"
  >
    <div class="flex flex-col gap-10">
      <div v-for="(project, index) in projects" :key="index">
        <div
          class="uppercase text-xs tracking-wider mb-1 text-white"
          :class="[isMobile ? 'text-center' : (index % 2 === 1 ? 'text-right' : 'text-left')]"
        >
          <UIcon :name="project.icon?.startsWith('mdi-') ? `i-${project.icon}` : `i-mdi-${project.icon}`" class="mb-0.5" />
          <span class="ml-2 font-semibold">{{ project.title }}</span>
        </div>
        <div
          class="font-light text-white/40 text-xs mb-3"
          :class="[isMobile ? 'text-center' : (index % 2 === 1 ? 'text-right' : 'text-left')]"
        >
          Date of creation: {{ project.dateOfCreation }}
        </div>

        <div
          class="flex gap-6 items-start"
          :class="[
            isMobile ? 'flex-col' : (index % 2 === 1 ? 'flex-row-reverse' : 'flex-row')
          ]"
        >
          <div class="flex-1 font-light text-white/60 text-sm leading-relaxed text-justify" v-html="project.description" />
          <div class="flex-1">
            <img :src="project.image" alt="Project Image" class="rounded-lg w-full h-auto shadow-lg" />
          </div>
        </div>

        <div
          class="flex justify-between items-center pt-4"
          :class="[
            isMobile ? 'flex-col gap-3' : (index % 2 === 1 ? 'flex-row-reverse' : 'flex-row')
          ]"
        >
          <div class="flex flex-wrap gap-1.5">
            <template v-for="tech in project.technologies" :key="tech.id">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 border border-white/15 rounded text-white/50 text-xs">
                <UIcon :name="`i-mdi-${tech.icon}`" />
                {{ tech.name }}
              </span>
            </template>
          </div>
          <div class="flex gap-2">
            <UButton variant="outline" size="sm" color="neutral" @click="openLink(project.source_code)">
              Code <UIcon name="i-mdi-github" class="ml-1" />
            </UButton>
            <UButton variant="outline" size="sm" color="neutral" @click="openLink(project.live_demo)">
              Live Demo <UIcon name="i-mdi-open-in-new" class="ml-1" />
            </UButton>
          </div>
        </div>

        <div v-if="index < projects.length - 1" class="border-t border-white/5 mt-8" />
      </div>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { IFreeProject } from '~/types/models'
import { projects as staticProjects } from '~/data/portfolio'

const { getVal } = useFirebase()
const projects = ref<IFreeProject[]>(staticProjects)
const isMobile = ref(false)

const checkMobile = () => { isMobile.value = window.innerWidth < 600 }
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  getVal('free-time-projects').then((val: any) => {
    if (val) {
      const result: IFreeProject[] = []
      Object.keys(val).forEach((key) => { result.push({ ...val[key], key }) })
      projects.value = result
    }
  })
})
onUnmounted(() => { window.removeEventListener('resize', checkMobile) })

const openLink = (link: string) => { window.open(link, '_blank') }
</script>
