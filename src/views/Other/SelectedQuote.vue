<template>
  <blockquote
    class="otro-blockquote font-weight-light mb-8 mt-4"
    :style="smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'"
  >
    <div style="font-style: italic" v-html="selectedQuote.text"></div>
    <div
      class="d-flex font-weight-regular align-center pa-0 mt-5 justify-space-between align-center"
    >
      <span>
        ― &nbsp;{{
          selectedQuote.author ? selectedQuote.author : "Uknown author"
        }}
      </span>
      <v-btn variant="plain" @click="createLink(selectedQuote)" class="ml-2">
        <v-icon size="small">mdi-content-copy</v-icon>
      </v-btn>
    </div>
  </blockquote>
  <v-snackbar
    v-model="snackbar"
    color="secondary"
    rounded="pill"
    location="bottom"
    min-width="360"
    min-height="60"
  >
    <v-icon>mdi-information-outline</v-icon> Link for sharing the quote has been copied to clipboard. 
  </v-snackbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps<{
  origin?: string;
  selectedQuote?: any;
}>();
const snackbar = ref(false)

const createLink = (quote: any) => {
  const link = window.location.href.split("/")[0] + "//" + window.location.href.split("/")[2] + "/favorite-quotes/" + quote.key;
  navigator.clipboard.writeText(link)
    .then(() => {
      snackbar.value = true;
    })
    .catch((error) => {
      console.error("Failed to copy link to clipboard:", error);
    });

  return link;
};
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
