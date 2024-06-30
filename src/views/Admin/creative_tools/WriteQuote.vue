<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn variant="outlined" @click="resetQuoteObject">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="configureQuoteDialog" max-width="700">
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title class="d-flex justify-space-between">
            <span>Write Favorite Quote</span>
          </v-card-title>
          <v-text-field
            v-model="quote.author"
            label="Author"
            variant="outlined"
          />

          <HtmlEditor
            :editor-content="quote.text"
            fullscreen-icon="mdi-fullscreen"
            :error="false"
            @update:editor-content="onEditorUpdate"
            @fullscreen="fullscreen = true"
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
          @editQuote="showSelectedQuoteForEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, nextTick, ref, watch } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { pushVal, setVal } from '@/services/DataService'
import FavoriteQuotes from '@/views/blogs/quotes/FavoriteQuotes.vue'
import { IQuote } from '@/types/other'
import HtmlEditor from '@/components/HtmlEditor.vue'

const quote: Ref<IQuote> = ref({
  key: '',
  author: '',
  text: '',
})

const configureQuoteDialog: Ref<boolean> = ref(false)
const fullscreen: Ref<boolean> = ref(false)

const save = () => {
  if (quote.value.key === '') {
    pushVal('blog/favorite-quotes', quote.value)
  } else {
    setVal('blog/favorite-quotes/' + quote.value.key, quote.value)
  }
  configureQuoteDialog.value = false
}

const showSelectedQuoteForEdit = async (val: any) => {
  configureQuoteDialog.value = true
  await nextTick()
  quote.value = { ...val, key: val.key, text: val.text }
}

function onEditorUpdate(html: string) {
  quote.value.text = html
}

const resetQuoteObject = () => {
  configureQuoteDialog.value = true
  quote.value = {
    key: '',
    author: '',
    text: '',
  }
}

watch(configureQuoteDialog, (val) => {
  if (!val) {
    quote.value = {
      key: '',
      author: '',
      text: '',
    }
  }
})
</script>
