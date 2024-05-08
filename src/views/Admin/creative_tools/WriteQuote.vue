<template>
  <v-container>
    <div style="position: absolute; right: 0;" class="mr-6">
      <v-btn variant="icon" @click="resetQuoteObject">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-dialog v-model="configureQuote" max-width="700">
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title class="d-flex justify-space-between">
            <span>Write Favorite Quote</span>
          </v-card-title>
          <v-text-field
            v-model="quote.author"
            label="Author"
            variant="outlined"
          />

          <v-text-field
            v-model="quote.imageSrc"
            label="Image Source"
            variant="outlined"
          />

          <QuillEditor
            v-model:content="quote.text"
            contentType="html"
            theme="snow"
          />
          <v-btn
            color="white"
            class="mt-5"
            variant="outlined"
            @click="save"
            block
          >
            Publish
          </v-btn>
        </v-card>
      </v-dialog>
      <v-col>
        <FavoriteQuotes
          :origin="'admin-panel'"
          :changedQuote="quote"
          @editQuote="showSelectedQuoteForEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getVal, pushVal, setVal } from "@/services/DataService";
import FavoriteQuotes from "@/views/Other/FavoriteQuotes.vue";
const quote = ref({
  key: "",
  author: "",
  text: "",
  imageSrc: "",
});

const configureQuote = ref(false);

const save = () => {
  if (quote.value.key === "") {
    pushVal("blog/favorite-quotes", quote.value);
  } else {
    setVal("blog/favorite-quotes/" + quote.value.key, quote.value);
  }
  configureQuote.value = false;
};

const showSelectedQuoteForEdit = async (val: any) => {
  await getVal("blog/favorite-quotes/" + val.key).then((selectedQuote) => {
    quote.value = { ...selectedQuote, key: val.key };
    configureQuote.value = true;
  });
};

const resetQuoteObject = () => {
  configureQuote.value = true;
  quote.value = {
    key: "",
    author: "",
    text: "",
    imageSrc: "",
  };
};
</script>
