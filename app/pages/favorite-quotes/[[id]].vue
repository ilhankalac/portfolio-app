<template>
  <div>
    <div class="font-light text-black opacity-70">
      I maintain a collection of my favorite quotes, arranged by the emotional
      impact they evoke upon reflection.
    </div>
    <div class="font-light text-black mb-2 text-right">
      Currently there are <strong>{{ tempQuotes.length }}</strong> quotes in the
      collection.
    </div>

    <UInput
      v-model="search"
      placeholder="Search by reference, author or keyword"
      size="lg"
      class="mt-4"
      :ui="{ base: 'bg-gray-100' }"
      @keydown.enter="handleEnter"
    >
      <template v-if="search" #trailing>
        <UButton
          icon="i-mdi-close"
          color="neutral"
          variant="link"
          size="xs"
          @click="search = ''; searchQuotes('')"
        />
      </template>
    </UInput>

    <div v-if="!isDataLoaded" class="flex flex-col gap-3 mt-4">
      <USkeleton v-for="i in 5" :key="i" class="h-24 w-full" />
    </div>

    <div
      ref="quotesContainer"
      class="quotes-container mt-4 p-2 rounded-lg shadow-md bg-white"
      style="max-height: 80vh; overflow-y: auto;"
      @scroll="handleScroll"
    >
      <div
        v-for="(quote, key) in visibleQuotes"
        :key="key"
      >
        <div
          class="flex justify-between"
          :class="isMobile ? 'flex-col' : 'flex-row items-center'"
        >
          <div>
            <QuoteCard :selected-quote="quote" />
          </div>
          <div v-if="origin === 'admin-panel'">
            <UButton
              icon="i-mdi-delete"
              color="error"
              variant="ghost"
              class="ml-2"
              @click="deleteQuoteItem(quote)"
            />
            <UButton
              icon="i-mdi-pencil"
              color="neutral"
              variant="ghost"
              class="ml-2"
              @click="emitEditQuote(quote)"
            />
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="text-center py-4">
        <UIcon name="i-mdi-loading" class="animate-spin text-2xl" />
      </div>
      <div
        v-if="visibleQuotes.length === quotes.length && quotes.length > 0"
        class="text-center text-black py-2 opacity-60"
      >
        End of quotes
      </div>
    </div>

    <UModal v-model:open="quoteSelectedDialog">
      <template #content>
        <div class="p-4">
          <QuoteCard
            :selected-quote="selectedQuote"
            origin="quote-dialog"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import QuoteCard from '~/components/common/QuoteCard.vue'
import type { IQuote } from '~/types/models'

definePageMeta({ layout: 'blog' })

const { getValLive, deleteVal } = useFirebase()
const route = useRoute()

const isMobile = ref(false)

const BATCH_SIZE = 50
const quotes = ref<IQuote[]>([])
const visibleQuotes = ref<IQuote[]>([])
const tempQuotes = ref<IQuote[]>([])
const isDataLoaded = ref(false)
const isLoading = ref(false)
const authors = ref<string[]>([])
const search = ref('')
const quoteSelectedDialog = ref(false)
const selectedQuote = ref<IQuote>({
  text: '',
  author: '',
  key: '',
})
const quotesContainer = ref<HTMLElement | null>(null)
const scrollDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const props = defineProps<{
  origin?: string
}>()

const emit = defineEmits(['edit-quote'])

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const getData = () => {
  const path = 'blog/favorite-quotes'
  const unsubscribe = getValLive(path, (fetchedData: any) => {
    if (fetchedData) {
      const result: any[] = []
      Object.keys(fetchedData).forEach((key) => {
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
        loadInitialQuotes()
      }

      // Show quote on dialog if the route has a key
      if (route.params.id) {
        const idParam = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
        if (!idParam) return
        const quoteByKey = findQuoteByKey(idParam)
        if (quoteByKey.length > 0 && quoteByKey[0]) {
          showQuoteOnDialog(quoteByKey[0])
        }
      }
    } else {
      console.error('Error fetching data from Firebase.')
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

  setTimeout(() => {
    const nextBatch = quotes.value.slice(
      visibleQuotes.value.length,
      visibleQuotes.value.length + BATCH_SIZE
    )
    visibleQuotes.value = [...visibleQuotes.value, ...nextBatch]
    isLoading.value = false
  }, 300)
}

const handleScroll = (event: Event) => {
  if (scrollDebounceTimer.value) {
    clearTimeout(scrollDebounceTimer.value)
  }

  scrollDebounceTimer.value = setTimeout(() => {
    const container = event.target as HTMLElement
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100

    if (isAtBottom) {
      loadMoreQuotes()
    }
  }, 100)
}

const emitEditQuote = (quote: IQuote) => {
  emit('edit-quote', quote)
}

const handleEnter = (event: KeyboardEvent) => {
  search.value = (event.target as HTMLInputElement).value
  ;(event.target as HTMLInputElement).blur()
  searchQuotes(search.value)
}

const searchQuotes = (searchCriteria: string | null) => {
  searchCriteria = searchCriteria ? searchCriteria.toLowerCase() : ''
  const result: IQuote[] = tempQuotes.value.filter((quote: IQuote) => {
    return (
      quote?.text?.toLowerCase().includes(searchCriteria!) ||
      quote?.author?.toLowerCase().includes(searchCriteria!)
    )
  })
  quotes.value = result
  visibleQuotes.value = result.slice(0, BATCH_SIZE)
}

const extractAuthors = (quotesList = tempQuotes.value) => {
  let authorsList = quotesList.map((quote: IQuote) => quote.author)
  authorsList = authorsList.filter((author: string) => author !== undefined)
  authorsList = authorsList.filter(
    (author: string, index: number) => authorsList.indexOf(author) === index
  )
  return authorsList
}

const showQuoteOnDialog = (quote: IQuote) => {
  if (props.origin === 'admin-panel') return
  quoteSelectedDialog.value = true
  selectedQuote.value = quote
}

const findQuoteByKey = (key: string): IQuote[] => {
  return tempQuotes.value.filter((quote: IQuote) => quote.key === key)
}

const deleteQuoteItem = (quote: IQuote = { key: '', author: '', text: '' }) => {
  if (confirm('Are you sure you want to delete this quote?')) {
    deleteVal(`blog/favorite-quotes/${quote.key}`)
      .then(() => {
        console.log('Quote deleted successfully')
        visibleQuotes.value = visibleQuotes.value.filter((q) => q.key !== quote.key)
      })
      .catch((error: any) => {
        console.error('Error deleting quote:', error)
      })
  }
}

// Reset scroll position when quotes are filtered
watch(
  () => quotes.value.length,
  () => {
    nextTick(() => {
      if (quotesContainer.value) {
        quotesContainer.value.scrollTop = 0
      }
    })
  }
)

// Watch search for live filtering
watch(search, (val) => {
  searchQuotes(val)
})

onMounted(async () => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  await getData()
  window.scrollTo(0, 0)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.quotes-container {
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1),
    0px 1px 1px 0px rgba(0, 0, 0, 0.07),
    0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--color-neutral));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--color-primary-rgb));
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
