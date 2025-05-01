<template>
  <blockquote
    class="otro-blockquote mb-8 mt-4"
    :class="origin === 'quote-dialog' && smAndDown ? 'py-10 pr-10' : ''"
    :style="smAndDown ? 'padding-left: 3em' : 'padding:1.2em 30px 1.2em 75px;'"
  >
    <div style="font-style: italic" class="text-justify" v-html="selectedQuote?.text" />
    <div class="d-flex align-center justify-space-between align-center pa-0 mt-5 font-weight-regular">
      <span class="font-weight-regular">
        ― &nbsp;{{
          selectedQuote?.author ? selectedQuote.author : "Uknown author"
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
import { IQuote } from "@/types/other";
import { Ref, ref } from "vue";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const props = defineProps<{
  origin?: string;
  selectedQuote?: IQuote;
}>();
const snackbar: Ref<boolean> = ref(false)

const createLink = (quote: IQuote = {key: '', author: '', text: ''}) => {
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
  font-style: italic;
  font-weight: bold;
  margin-top: 1em;
}

.otro-blockquote::before {
  font-family: Arial;
  content: "\201C";
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: -10px;
}

.otro-blockquote {
  color: black;
  border-left: 4px solid rgb(var(--v-theme-greyText));
  line-height: 1.6;
  position: relative;
  background: white;;
}
</style>
