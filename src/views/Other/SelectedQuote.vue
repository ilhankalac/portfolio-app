<template>
  <blockquote
    class="otro-blockquote font-weight-light mb-8 mt-4"
    :style="smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'"
  >
    <div style="font-style: italic" v-html="selectedQuote.text"></div>
    <div class="d-flex justify-space-between align-center">
      <div class="pa-0 mt-5 d-flex align-center">
        <!-- <v-avatar size="30" color="white">
                <v-img :src="quote.imageSrc" alt="avatar" />
              </v-avatar> -->
        <div class="d-flex flex-column">
          <div class="font-weight-regular">
            ― &nbsp;{{
              selectedQuote.author ? selectedQuote.author : "Uknown author"
            }}
          </div>
        </div>
      </div>
    </div>
  </blockquote>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { onMounted, Ref, ref } from "vue";
const { smAndDown } = useDisplay();
const props = defineProps<{
  origin: string;
  selectedQuote: any;
}>();
</script>

<style scoped>
.otro-blockquote span {
  display: block;
  color: white;
  font-style: italic;
  font-weight: bold;
  margin-top: 1em;
}

.otro-blockquote::before {
  font-family: Arial;
  content: "\201C";
  color: white;
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: -10px;
}

.otro-blockquote {
  color: rgb(var(--v-theme-greyText));
  border-left: 4px solid rgb(var(--v-theme-greyText));
  line-height: 1.6;
  position: relative;
  background: rgb(var(--v-theme-primary));
}

</style>