<template>
  <section :id="sectionId" class="relative z-10">
    <div :style="customStyle" class="w-full px-4 py-0">
      <div v-if="header" class="pb-5 pt-20 text-center">
        <p
          class="text-center uppercase mb-1 tracking-wider"
          :class="[
            isMobile ? 'text-xl' : 'text-3xl',
            textColor === 'white' ? 'text-white' : 'text-gray-800'
          ]"
        >
          {{ header }}
        </p>
        <div
          v-if="header"
          class="mx-auto border-t opacity-50"
          :class="textColor === 'white' ? 'border-white' : 'border-gray-300'"
          style="width: 150px;"
        />
      </div>
      <div class="max-w-4xl mx-auto pb-12">
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface ISection {
  sectionId?: string
  customStyle?: string
  header?: string
  textColor?: string
  colsNumber?: number
}

defineProps<ISection>()
const isMobile = ref(false)

const checkMobile = () => { isMobile.value = window.innerWidth < 600 }
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) })
onUnmounted(() => { window.removeEventListener('resize', checkMobile) })
</script>
