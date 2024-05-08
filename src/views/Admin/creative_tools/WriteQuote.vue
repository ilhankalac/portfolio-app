<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title class="d-flex justify-space-between">
          	<span>Write Favorite Quote</span>
            <v-btn 
              variant="icon"
              icon="mdi-plus"
              @click="resetQuoteObject"
            />
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
            :key="quote.key"
            contentType="html" 
            theme="snow"
          />
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Publish
          </v-btn>
        </v-card>
      </v-col>
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
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getVal, pushVal, setVal } from '@/services/DataService'
import FavoriteQuotes from '@/views/Other/FavoriteQuotes.vue'
const quote = ref({
  key: '',
	author: '',
	text: '',
	imageSrc: ''
})

const save = () => {
  if(quote.value.key === '') {
    pushVal('blog/favorite-quotes', quote.value)
  } else {
    setVal('blog/favorite-quotes/' + quote.value.key, quote.value)
  }
}

const showSelectedQuoteForEdit = async (val: any) => {
  await getVal("blog/favorite-quotes/" + val.key).then((selectedQuote) => { 
    quote.value = {...selectedQuote, key: val.key}
  });
}

const resetQuoteObject = () => {
  quote.value = {
    key: '',
    author: '',
    text: '',
    imageSrc: ''
  }
}
</script>
