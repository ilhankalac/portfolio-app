<template>
  <section :id="sectionId">
    <v-container
      :style="customStyle"
      fluid
    >
      <div class="pb-5 pt-20 text-center">
        <p
          :class="`text-center text-overline mb-1 text-white`"
          :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
        >
          {{ header }}
        </p>
        <v-divider 
          v-if="header" 
          style="width: 150px !important; margin: 0 auto;" class="border-opacity-50" 
          thickness="1" 
          :color="`${textColor}`" 
        />
      </div>
      <v-row class="d-flex justify-center align-center">
        <v-col :cols="colsNumber">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
interface ISection {
  sectionId?: string
  customStyle?: string
  header?: string
  textColor?: string
}
import { computed } from "vue"
import { useDisplay } from "vuetify"
const { smAndDown, name } = useDisplay()
const props = defineProps<ISection>()

const colsNumber = computed(() => {
  switch (name.value) {
    case 'xs': return 12
    case 'sm': return 12
    case 'md': return 8
    case 'lg': return 7
    case 'xl': return 7
    case 'xxl': return 7
  }
  return undefined
})
</script>

<style lang="scss" scoped>
.mdi-close::before {
  color: white;
}
.timeline-item:hover {
  background-color: rgba(180, 180, 180, 0.1) !important;
}

section {
  position: relative;
  z-index: 10;
}
</style>
