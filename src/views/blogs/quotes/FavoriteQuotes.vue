<template>
  <div>
    <div class="font-weight-light text-white" style="opacity: 0.6">
      I maintain a collection of my favorite quotes, arranged by the emotional
      impact they evoke upon reflection.
    </div>
    <div class="font-weight-light text-white mb-2 text-right">
      Currently there are <strong> {{ tempQuotes.length }}</strong> quotes in the
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
    <v-card 
      elevation="10" 
      style="max-height: 80vh; overflow-y: auto;" 
      class="pa-2"
      ref="quotesContainer"
      @scroll="handleScroll"
    >
      <div
        v-for="(quote, key) in visibleQuotes"
        :key="key"
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
      <div v-if="isLoading" class="text-center py-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-if="visibleQuotes.length === quotes.length && quotes.length > 0" class="text-center text-white py-2">
        End of quotes
      </div>
    </v-card>
  </div>
  <v-dialog v-model="quoteSelectedDialog" max-width="700" max-height="500">
    <Quote 
      :selected-quote="selectedQuote"
      :origin="'quote-dialog'"
    />
  </v-dialog>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify"
import { onMounted, Ref, ref, watch, nextTick } from "vue"
import { deleteVal, getValLive } from "@/services/DataService"
import Quote from '@/components/blogs/Quote.vue'
import { useRouter } from "vue-router"
import { IQuote } from "@/types/other"

const router = useRouter()
const { smAndDown } = useDisplay()

const BATCH_SIZE = 50
const quotes: Ref<IQuote[]> = ref([])
const visibleQuotes: Ref<IQuote[]> = ref([])
const tempQuotes: Ref<IQuote[]> = ref([])
const isDataLoaded = ref(false)
const isLoading = ref(false)
const authors: Ref<string[]> = ref([])
const search: Ref<string> = ref('')
const quoteSelectedDialog: Ref<boolean> = ref(false)
const selectedQuote: Ref<IQuote> = ref({
  text: '',
  author: '',
  key: '',
})
const quotesContainer: any = ref(null)
const scrollDebounceTimer: any = ref(null)

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
      tempQuotes.value = result
      authors.value = extractAuthors(result)
      isDataLoaded.value = true

      // Apply any search filters if there's an active search
      if (search.value) {
        searchQuotes(search.value)
      } else {
        quotes.value = [...result]
        // Display initial batch of quotes
        loadInitialQuotes()
      }

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

const loadInitialQuotes = () => {
  visibleQuotes.value = quotes.value.slice(0, BATCH_SIZE)
}

const loadMoreQuotes = () => {
  if (isLoading.value || visibleQuotes.value.length >= quotes.value.length) {
    return
  }
  
  isLoading.value = true
  
  // Using setTimeout to simulate network delay and prevent UI blocking
  setTimeout(() => {
    const nextBatch = quotes.value.slice(
      visibleQuotes.value.length,
      visibleQuotes.value.length + BATCH_SIZE
    )
    
    visibleQuotes.value = [...visibleQuotes.value, ...nextBatch]
    isLoading.value = false
  }, 300)
}

const handleScroll = (event: any) => {
  // Clear existing timer
  if (scrollDebounceTimer.value) {
    clearTimeout(scrollDebounceTimer.value)
  }
  
  // Set a new debounce timer
  scrollDebounceTimer.value = setTimeout(() => {
    const container = event.target
    
    // Check if user scrolled near the bottom (within 100px of the bottom)
    const isAtBottom = 
      container.scrollHeight - container.scrollTop - container.clientHeight < 100
    
    if (isAtBottom) {
      loadMoreQuotes()
    }
  }, 100)
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
  visibleQuotes.value = result.slice(0, BATCH_SIZE)
}

const extractAuthors = (quotesList = tempQuotes.value) => {
  let authors = quotesList.map((quote: IQuote) => {
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
  return tempQuotes.value.filter((quote: IQuote) => {
    return quote.key === key
  })
}

const deleteQuote = (quote: IQuote = { key: '', author: '', text: '' }) => {
  if (confirm("Are you sure you want to delete this quote?")) {
    deleteVal(`blog/favorite-quotes/${quote.key}`)
      .then(() => {
        console.log('Quote deleted successfully');
        // Remove from visible quotes as well
        visibleQuotes.value = visibleQuotes.value.filter(q => q.key !== quote.key)
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  }
};

// Reset scroll position when quotes are filtered
watch(() => quotes.value.length, () => {
  nextTick(() => {
    if (quotesContainer.value) {
      quotesContainer.value.scrollTop = 0
    }
  })
})

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