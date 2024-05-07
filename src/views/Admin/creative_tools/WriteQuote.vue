<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="flex-grow: 1 !important" color="secondary" class="pa-4">
          <v-card-title>
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
          <v-btn color="white" class="mt-5" variant="outlined" @click="save" block>
            Publish
          </v-btn>
        </v-card>
      </v-col>
      <v-col>
        <FavoriteQuotes 
          :origin="'admin-panel'" 
          @editQuote="editQuote"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { pushVal } from '@/services/DataService'
import FavoriteQuotes from '@/views/Other/FavoriteQuotes.vue'
const quote = ref({
	author: '',
	text: '',
	imageSrc: ''
})

const save = () => {
  pushVal('blog/favorite-quotes', quote.value)
}

const editQuote = (quote: any) => {
  console.log(quote);
  
}
</script>
