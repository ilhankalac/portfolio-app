<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Collection</span>
      <h1 class="list-title">Favorite Quotes</h1>
      <p class="list-subtitle">
        I maintain a collection of my favorite quotes, arranged by the emotional
        impact they evoke upon reflection.
        <span v-if="tempQuotes.length" class="quote-count">{{ tempQuotes.length }} quotes</span>
      </p>
    </div>

    <!-- Search -->
    <UInput
      v-model="search"
      placeholder="Search by reference, author or keyword"
      size="lg"
      class="w-full"
      :ui="{ base: 'bg-transparent text-white placeholder-white/30' }"
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

    <!-- Loading skeleton -->
    <div v-if="!isDataLoaded" class="flex flex-col gap-3 mt-4">
      <div v-for="i in 5" :key="i" class="skeleton-quote">
        <div class="skeleton-line skeleton-line--long" />
        <div class="skeleton-line skeleton-line--medium" />
        <div class="skeleton-line skeleton-line--short" />
      </div>
    </div>

    <!-- Quotes list -->
    <div
      ref="quotesContainer"
      class="quotes-container mt-4"
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
        <UIcon name="i-mdi-loading" class="animate-spin text-2xl text-white/30" />
      </div>
      <div
        v-if="visibleQuotes.length === quotes.length && quotes.length > 0"
        class="text-center py-3 end-text"
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

      if (search.value) {
        searchQuotes(search.value)
      } else {
        quotes.value = [...result]
        loadInitialQuotes()
      }

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

<style scoped lang="scss">
/* Section header */
.list-header {
  padding-bottom: 1.25rem;
}

.list-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.list-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

.quote-count {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  margin-left: 0.25rem;
  font-size: 0.65rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px;
  vertical-align: middle;
}

/* Quotes container */
.quotes-container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.end-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
}

/* Skeleton */
.skeleton-quote {
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 0.75rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;

  &--long { width: 90%; }
  &--medium { width: 70%; }
  &--short { width: 30%; }
}

/* Scrollbar */
.quotes-container::-webkit-scrollbar {
  width: 6px;
}

.quotes-container::-webkit-scrollbar-track {
  background: transparent;
}

.quotes-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.quotes-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
