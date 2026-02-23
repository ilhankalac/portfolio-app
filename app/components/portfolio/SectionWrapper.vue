<template>
  <section :id="sectionId" class="section-wrap">
    <div :style="customStyle" class="section-inner">
      <div v-if="header" class="section-header">
        <span v-if="label" class="section-label">{{ label }}</span>
        <h2 class="section-title">{{ header }}</h2>
      </div>
      <div class="section-body">
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
  label?: string
  textColor?: string
  colsNumber?: number
}

defineProps<ISection>()
</script>

<style scoped lang="scss">
.section-wrap {
  position: relative;
  z-index: 10;
}

.section-inner {
  width: 100%;
  padding: 0 1rem;
}

.section-header {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 2.5rem;
  padding-bottom: 1.25rem;
}

.section-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.section-body {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 2rem;
}
</style>
