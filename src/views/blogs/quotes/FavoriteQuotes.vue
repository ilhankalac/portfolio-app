<template>
  <div>
    <div class="font-weight-light text-white" style="opacity: 0.6">
      I maintain a collection of my favorite quotes, arranged by the emotional
      impact they evoke upon reflection.
    </div>
    <div class="font-weight-light text-white mb-2 text-right">
      Currently there are <strong> {{ quotes.length }}</strong> quotes in the
      collection.
    </div>
    <v-autocomplete
      v-model="search"
      :items="authors"
      label="Search by reference, author or keyword"
      variant="outlined"
      hide-details
      color="white"
      bg-color="primary"
      class="mt-4"
      block
      clearable
      @input="handleSearchInput"
      @keydown.enter="handleEnter"
      @update:modelValue="searchQuotes(search)"
    >
      <template #no-data>
        <div class="pl-2">
          No authors found. Please try another search criteria.
        </div>
      </template>
    </v-autocomplete>
    <v-container fluid>
      <v-row v-if="!isDataLoaded">
        <v-col class="d-flex flex-column ga-3">
          <v-skeleton-loader
            v-for="index in 5"
            color="primary"
            type="article"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-card color="primary" elevation="10" style="max-height: 80vh; overflow-y: auto;" class="pa-2">
      <div
        v-for="(quote, key) in quotes"
        :key="key"
        class="text-justify font-weight-light text-white"
      >
        <div 
          class="d-flex justify-space-between"
          :class="smAndDown ? 'flex-column' : 'flex-row align-center'"
        >
          <div>
            <Quote :selected-quote="quote"/>
          </div>
          <div>
            <v-btn
              v-if="origin === 'admin-panel'"
              @click="deleteQuote(quote)"
              color="error"
              class="ml-2"
              variant="plain"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              v-if="origin === 'admin-panel'"
              @click="emitEditQuote(quote)"
              color="white"
              class="ml-2"
              variant="plain"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
  <v-dialog v-model="quoteSelectedDialog" max-width="700" height="500">
    <Quote 
      :selected-quote="selectedQuote"
      :origin="'quote-dialog'"
    />
  </v-dialog>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify"
import { onMounted, Ref, ref } from "vue"
import { deleteVal, getValLive } from "@/services/DataService"
import Quote from '@/components/blogs/Quote.vue'
import { useRouter } from "vue-router"
import { IQuote } from "@/types/other"

const router = useRouter()
const { smAndDown } = useDisplay()

const quotes: Ref<IQuote[]> = ref([])
const tempQuotes: Ref<IQuote[]> = ref([])
const isDataLoaded = ref(false)
const authors: Ref<string[]> = ref([])
const search: Ref<string> = ref('')
const quoteSelectedDialog: Ref<boolean> = ref(false)
const selectedQuote: Ref<IQuote> = ref({
  text: '',
  author: '',
  key: '',
})

const props = defineProps<{
  origin?: string
}>()

const emit = defineEmits(["edit-quote"])

const getData = () => {
  const path = "blog/favorite-quotes"
  const unsubscribe = getValLive(path, (fetchedData) => {
    if (fetchedData) {
      let result: any = []
      Object.keys(fetchedData).forEach((key, index) => {
        result.unshift({ ...fetchedData[key], key })
      })
      quotes.value = result
      tempQuotes.value = result
      authors.value = extractAuthors()
      isDataLoaded.value = true

      // Show quote on dialog if the route has a key
      if (router.currentRoute.value.params.id) {
        const quoteByKey = findQuoteByKey(router.currentRoute.value.params.id.toString())
        if (quoteByKey.length > 0) {
          showQuoteOnDialog(quoteByKey[0])
        }
      }
    } else {
      console.error("Error fetching data from Firebase.")
    }
  })
  return unsubscribe
}

const emitEditQuote = (quote: IQuote) => {
  emit("edit-quote", quote)
}

const handleSearchInput = (input: any) => {
  searchQuotes(input.target.value.toLowerCase())
}

const handleEnter = (event: any) => {
  search.value = event.target.value
  event.target.blur()
}

const searchQuotes = (searchCriteria: any) => {
  searchCriteria = searchCriteria ? searchCriteria.toLowerCase() : ""
  let result: IQuote[] = tempQuotes.value.filter((quote: IQuote) => {
    return (
      quote?.text?.toLowerCase().includes(searchCriteria) ||
      quote?.author?.toLowerCase().includes(searchCriteria)
    )
  })
  quotes.value = result
}

const extractAuthors = () => {
  let authors = quotes.value.map((quote: IQuote) => {
    return quote.author
  })
  authors = authors.filter((author: string) => {
    return author !== undefined
  })
  authors = authors.filter((author: string, index: number) => {
    return authors.indexOf(author) === index
  })
  return authors
}

const showQuoteOnDialog = (quote: any) => {
  if (props.origin === 'admin-panel') return
  quoteSelectedDialog.value = true
  selectedQuote.value = quote
}

const findQuoteByKey = (key: string): IQuote[] => {
  return quotes.value.filter((quote: IQuote) => {
    return quote.key === key
  })
}

const deleteQuote = (quote: IQuote = { key: '', author: '', text: '' }) => {
  if (confirm("Are you sure you want to delete this quote?")) {
    deleteVal(`blog/favorite-quotes/${quote.key}`)
      .then(() => {
        console.log('Quote deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  }
};
onMounted(async () => {
  await getData()
  window.scrollTo(0, 0)
})
</script>

<style lang="scss" scoped>

:deep(.v-card--variant-elevated){
  box-shadow: 0px 2px 1px -1px rgba(255, 255, 255, 0.2), 0px 1px 1px 0px rgba(255, 255, 255, 0.14), 0px 1px 3px 0px rgba(255, 255, 255, 0.12) !important;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-secondary));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-greyText));
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
