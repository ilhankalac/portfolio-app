<template>
  <section :id="sectionId">
    <v-container
      class="py-10 d-flex flex-column align-center justify-center"
      :style="customStyle"
      fluid
    >
      <div class="pb-5 text-center">
        <p
          :class="`text-center text-overline mb-1 text-${textColor}`"
          :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
        >
          {{ header }}
        </p>
        <v-divider style="width: 50%; margin: 0 auto;" class="border-opacity-50" thickness="1" :color="`${textColor}`" />
      </div>
      <v-row class="d-flex justify-center align-center">
        <v-col :cols="smAndDown ? 12 : 6">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
interface ISection {
  sectionId?: string;
  customStyle?: string;
  header?: string;
  textColor?: string;
}
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps<ISection>();
</script>

<style lang="scss" scoped>
.mdi-close::before {
  color: white;
}
.timeline-item:hover {
  background-color: rgba(180, 180, 180, 0.1) !important;
}
</style>
