<template>
  <v-container
    class="py-10 d-flex flex-column align-center justify-center"
    :id="sectionId"
    :style="customStyle"
    fluid
  >
    <div class="pb-5 text-center">
      <p
        class="text-center text-overline mb-1"
        :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
      >
        {{ header }}
      </p>
      <v-divider style="width: 50%; margin: 0 auto;" class="border-opacity-50" thickness="1" color="white" />
    </div>
    <v-row class="d-flex justify-center align-center">
      <v-col :cols="smAndDown ? 12 : 6">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
interface ISection {
  sectionId: string;
  customStyle?: string;
  header?: string;
}
import { onMounted, ref, Ref, defineProps } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";

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
