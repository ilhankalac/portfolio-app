<template>
  <v-container
    class="py-10 d-flex flex-column align-center justify-center"
    :id="sectionId"
    :style="customStyle"
    fluid
  >
    <p
      class="text-center text-overline pb-5"
      :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
    >
      {{ header }}
    </p>
    <v-row class="d-flex justify-center align-center">
      <v-col :cols="smAndDown ? 12 : 8">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import { getVal } from "@/services/DataService";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  customStyle: {
    type: String,
    default: "",
  },
  sectionId: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.mdi-close::before {
  color: white;
}
.timeline-item:hover {
  background-color: rgba(180, 180, 180, 0.1) !important;
}
</style>
