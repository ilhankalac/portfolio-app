<template>
  <SectionWrapper
    class="skills-section"
    label="What I use"
    header="My Skills"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
    sectionId="explore"
    textColor="white"
  >
    <div class="flex flex-wrap justify-center gap-2">
      <template v-for="skill in skills" :key="skill.name">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-white/55 text-[0.8rem] hover:bg-white/[0.07] hover:border-white/15 hover:text-white/80 transition-all duration-200 cursor-default">
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
