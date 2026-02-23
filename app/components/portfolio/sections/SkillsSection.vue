<template>
  <SectionWrapper
    class="skills-section"
    header="My skills"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
    sectionId="explore"
    textColor="white"
  >
    <div class="flex flex-wrap justify-center gap-2">
      <template v-for="skill in skills" :key="skill.name">
        <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-lg text-white/70 text-sm hover:bg-white/[0.08] hover:border-white/20 hover:text-white/90 transition-all duration-200 cursor-default">
          <UIcon :name="`i-mdi-${skill.icon}`" class="text-lg" />
          {{ skill.name }}
        </span>
      </template>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'
import type { ISkill } from '~/types/models'

defineProps<{
  skills: ISkill[]
}>()
</script>
