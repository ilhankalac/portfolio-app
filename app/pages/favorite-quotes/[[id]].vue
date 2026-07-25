<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Collection</span>
      <h1 class="list-title">Favorite Quotes</h1>
      <p class="list-subtitle">
        Lines I have collected over the years — arranged by the emotional impact
        they evoke upon reflection.
      </p>

      <div v-if="isDataLoaded && allQuotes.length" class="stat-strip">
        <span class="stat"><b>{{ allQuotes.length }}</b> quotes</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ thinkerVoices.length }}</b> thinkers</span>
        <span class="stat-dot">·</span>
        <span class="stat"><b>{{ screenCount }}</b> from the screen</span>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="!isDataLoaded" class="skeleton-wrap">
      <div class="skeleton-spotlight" />
      <div class="skeleton-rail">
        <div v-for="i in 5" :key="i" class="skeleton-voice" />
      </div>
      <div class="skeleton-grid">
        <div v-for="i in 6" :key="i" class="skeleton-card" />
      </div>
    </div>

    <div v-else-if="loadError" class="quote-state">
      <UIcon name="i-mdi-alert-circle-outline" class="quote-state-icon" />
      <p>{{ loadError }}</p>
    </div>

    <template v-else-if="allQuotes.length">
      <!-- Spotlight -->
      <QuoteSpotlight
        :quote="spotlightQuote"
        :is-random="spotlightIsRandom"
        @shuffle="shuffleSpotlight"
        @open="openQuote"
        @select-voice="selectVoice"
      />

      <!-- Thinkers -->
      <QuoteVoices
        :voices="rankedVoices"
        :active-voice="activeVoice"
        @select="selectVoice"
      />

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-row">
          <UInput
            ref="searchInput"
            v-model="search"
            placeholder="Search a line, an author, a feeling…"
            icon="i-mdi-magnify"
            size="lg"
            class="search-field"
            :ui="{ base: 'bg-white/[0.03] border border-white/[0.07] text-white placeholder-white/25' }"
          >
            <template v-if="search" #trailing>
              <UButton icon="i-mdi-close" color="neutral" variant="link" size="xs" @click="clearSearch" />
            </template>
          </UInput>

          <button
            class="order-btn"
            :class="{ 'order-btn--active': isShuffled }"
            :title="isShuffled ? 'Back to the original order' : 'Shuffle the collection'"
            @click="toggleShuffle"
          >
            <UIcon :name="isShuffled ? 'i-mdi-sort-variant' : 'i-mdi-shuffle-variant'" />
            <span>{{ isShuffled ? 'Ordered' : 'Shuffle' }}</span>
          </button>
        </div>

        <div class="lens-row">
          <button
            v-for="lens in lenses"
            :key="lens.id"
            class="lens-pill"
            :class="{ 'lens-pill--active': activeLens === lens.id }"
            @click="activeLens = lens.id"
          >
            {{ lens.label }}
            <span class="lens-count">{{ lens.count }}</span>
          </button>

          <button v-if="activeVoice" class="lens-pill lens-pill--voice" @click="activeVoice = null">
            <QuoteMonogram :author="activeVoice" />
            {{ authorName(activeVoice) }}
            <UIcon name="i-mdi-close" class="clear-icon" />
          </button>
        </div>
      </div>

      <!-- Results -->
      <p class="result-line">
        <template v-if="filteredQuotes.length">
          Showing <b>{{ visibleQuotes.length }}</b> of <b>{{ filteredQuotes.length }}</b>
        </template>
        <template v-else>No quotes match this search.</template>
      </p>

      <div v-if="filteredQuotes.length" class="quote-grid">
        <QuoteCard
          v-for="quote in visibleQuotes"
          :key="quote.key"
          :quote="quote"
          @open="openQuote"
          @select-voice="selectVoice"
        />
      </div>

      <div v-else class="quote-state">
        <UIcon name="i-mdi-format-quote-close" class="quote-state-icon" />
        <p>Nothing here yet — try another word or clear the filters.</p>
      </div>

      <div ref="sentinel" class="sentinel" />

      <p v-if="filteredQuotes.length && visibleQuotes.length >= filteredQuotes.length" class="end-text">
        You have reached the end of the collection.
      </p>
    </template>

    <div v-else class="quote-state">
      <UIcon name="i-mdi-format-quote-close" class="quote-state-icon" />
      <p>No quotes yet.</p>
    </div>

    <UModal
      v-model:open="readerOpen"
      :ui="{
        overlay: 'bg-slate-950/80 backdrop-blur-sm',
        content: 'bg-transparent ring-0 shadow-none divide-y-0 sm:max-w-2xl',
      }"
    >
      <template #content>
        <QuoteReader
          :quote="selectedQuote"
          @close="closeReader"
          @select-voice="(author) => { closeReader(); selectVoice(author) }"
        />
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import QuoteCard from '~/components/common/QuoteCard.vue'
import QuoteMonogram from '~/components/common/QuoteMonogram.vue'
import QuoteReader from '~/components/common/QuoteReader.vue'
import QuoteSpotlight from '~/components/common/QuoteSpotlight.vue'
import QuoteVoices from '~/components/common/QuoteVoices.vue'
import type { IQuote, IVoice } from '~/types/models'

definePageMeta({
  layout: 'blog',
  // NuxtPage keys pages by their interpolated path, so writing the quote id into the
  // URL would tear down and remount this page. A fixed key keeps the list mounted.
  key: 'favorite-quotes',
  scrollToTop: false,
})

useHead({
  title: 'Favorite Quotes — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/favorite-quotes' }],
})

useSeoMeta({
  description: 'A collection of favorite quotes curated by Ilhan Kalač, arranged by emotional impact.',
  ogType: 'website',
  ogTitle: 'Favorite Quotes — Ilhan Kalač',
  ogDescription: 'A collection of favorite quotes curated by Ilhan Kalač, arranged by emotional impact.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/favorite-quotes',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Favorite Quotes — Ilhan Kalač',
  twitterDescription: 'A collection of favorite quotes curated by Ilhan Kalač, arranged by emotional impact.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

type LensId = 'all' | 'thinkers' | 'screen' | 'anonymous'

const BATCH_SIZE = 24
const QUOTES_PATH = 'blog/favorite-quotes'

const { getValLive } = useFirebase()
const { stripHtml, isScreenSource, authorName } = useQuotes()
const route = useRoute()
const router = useRouter()

const allQuotes = ref<IQuote[]>([])
const isDataLoaded = ref(false)
const loadError = ref('')

const search = ref('')
const activeVoice = ref<string | null>(null)
const activeLens = ref<LensId>('all')
const visibleCount = ref(BATCH_SIZE)

/** Shuffling assigns a stable rank per quote so the order survives filtering. */
const isShuffled = ref(false)
const randomRanks = ref<Record<string, number>>({})

const spotlightIndex = ref(0)
const spotlightIsRandom = ref(false)

const readerOpen = ref(false)
const selectedQuote = ref<IQuote>()

const sentinel = ref<HTMLElement | null>(null)
const searchInput = ref<{ inputRef?: HTMLInputElement } | null>(null)

let unsubscribeQuotes: (() => void) | undefined
let observer: IntersectionObserver | undefined
let deepLinkHandled = false

/* ---------- Data ---------- */

const loadQuotes = () => {
  return getValLive(QUOTES_PATH, (data: Record<string, IQuote> | null) => {
    isDataLoaded.value = true
    loadError.value = ''

    if (!data) {
      allQuotes.value = []
      return
    }

    // Newest first — Firebase push keys are chronological.
    allQuotes.value = Object.keys(data)
      .map(key => ({ ...data[key], key } as IQuote))
      .reverse()

    pickQuoteOfTheDay()
    openDeepLinkedQuote()
  }, (error: Error) => {
    console.error('Error fetching favorite quotes from Firebase:', error)
    isDataLoaded.value = true
    loadError.value = 'Quotes are unavailable right now.'
    allQuotes.value = []
  })
}

/* ---------- Voices ---------- */

const rankedVoices = computed<IVoice[]>(() => {
  const map = new Map<string, IVoice>()

  for (const quote of allQuotes.value) {
    const author = (quote.author || '').trim()
    if (!author) continue

    const existing = map.get(author)
    if (existing) {
      existing.count++
    } else {
      map.set(author, {
        author,
        name: authorName(author),
        count: 1,
        screen: isScreenSource(author),
      })
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

const thinkerVoices = computed(() => rankedVoices.value.filter(voice => !voice.screen))
const screenCount = computed(() => allQuotes.value.filter(quote => isScreenSource(quote.author)).length)
const anonymousCount = computed(() => allQuotes.value.filter(quote => !(quote.author || '').trim()).length)

const lenses = computed(() => ([
  { id: 'all' as LensId, label: 'Everything', count: allQuotes.value.length },
  { id: 'thinkers' as LensId, label: 'Thinkers', count: allQuotes.value.length - screenCount.value - anonymousCount.value },
  { id: 'screen' as LensId, label: 'Screen', count: screenCount.value },
  { id: 'anonymous' as LensId, label: 'Unattributed', count: anonymousCount.value },
].filter(lens => lens.count > 0)))

/* ---------- Filtering ---------- */

const filteredQuotes = computed(() => {
  const term = search.value.trim().toLowerCase()

  let result = allQuotes.value.filter((quote) => {
    if (activeVoice.value && (quote.author || '') !== activeVoice.value) return false

    if (activeLens.value === 'screen' && !isScreenSource(quote.author)) return false
    if (activeLens.value === 'anonymous' && (quote.author || '').trim()) return false
    if (activeLens.value === 'thinkers' && (isScreenSource(quote.author) || !(quote.author || '').trim())) return false

    if (!term) return true
    return stripHtml(quote.text).toLowerCase().includes(term)
      || (quote.author || '').toLowerCase().includes(term)
  })

  if (isShuffled.value) {
    result = [...result].sort((a, b) => (randomRanks.value[a.key] ?? 0) - (randomRanks.value[b.key] ?? 0))
  }

  return result
})

const visibleQuotes = computed(() => filteredQuotes.value.slice(0, visibleCount.value))

/* ---------- Interactions ---------- */

const clearSearch = () => {
  search.value = ''
}

const selectVoice = (author: string) => {
  if (!author) return
  activeVoice.value = activeVoice.value === author ? null : author
  activeLens.value = 'all'
  search.value = ''
  scrollToGrid()
}

const toggleShuffle = () => {
  isShuffled.value = !isShuffled.value
  if (isShuffled.value) {
    const ranks: Record<string, number> = {}
    for (const quote of allQuotes.value) ranks[quote.key] = Math.random()
    randomRanks.value = ranks
  }
}

const scrollToGrid = () => {
  if (!import.meta.client) return
  nextTick(() => {
    document.querySelector('.toolbar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

/** The spotlight only draws from attributed quotes — an anonymous highlight reads as a bug. */
const spotlightPool = computed(() => {
  const attributed = allQuotes.value.filter(quote => (quote.author || '').trim())
  return attributed.length ? attributed : allQuotes.value
})

/** Same quote for everybody, all day long — it rolls over at midnight. */
const pickQuoteOfTheDay = () => {
  if (!spotlightPool.value.length) return
  const now = new Date()
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  spotlightIndex.value = daySeed % spotlightPool.value.length
  spotlightIsRandom.value = false
}

const shuffleSpotlight = () => {
  if (spotlightPool.value.length < 2) return
  let next = spotlightIndex.value
  while (next === spotlightIndex.value) {
    next = Math.floor(Math.random() * spotlightPool.value.length)
  }
  spotlightIndex.value = next
  spotlightIsRandom.value = true
}

const spotlightQuote = computed(() => spotlightPool.value[spotlightIndex.value])

const openQuote = (quote?: IQuote) => {
  if (!quote) return
  selectedQuote.value = quote
  readerOpen.value = true
}

const closeReader = () => {
  readerOpen.value = false
}

/**
 * The URL mirrors the reader so a quote is always shareable. Watching the open
 * state (rather than the close handler) also covers Escape and outside clicks,
 * which UModal dismisses on its own.
 */
watch(readerOpen, (open) => {
  const target = open && selectedQuote.value
    ? `/favorite-quotes/${selectedQuote.value.key}`
    : '/favorite-quotes'
  if (route.path !== target) router.replace(target)
})

const openDeepLinkedQuote = () => {
  if (deepLinkHandled) return
  const idParam = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (!idParam) return

  const match = allQuotes.value.find(quote => quote.key === idParam)
  deepLinkHandled = true

  if (!match) {
    // A stale or mistyped link — drop it and just show the collection.
    router.replace('/favorite-quotes')
    return
  }

  selectedQuote.value = match
  readerOpen.value = true
}

/* ---------- Infinite scroll ---------- */

const loadMore = () => {
  if (visibleCount.value >= filteredQuotes.value.length) return
  visibleCount.value += BATCH_SIZE
}

watch([search, activeVoice, activeLens], () => {
  visibleCount.value = BATCH_SIZE
})

watch([sentinel, isDataLoaded], () => {
  observer?.disconnect()
  if (!sentinel.value) return

  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) loadMore()
  }, { rootMargin: '400px' })

  observer.observe(sentinel.value)
})

/* ---------- Shortcuts ---------- */

const handleShortcut = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)

  if (event.key === '/' && !typing) {
    event.preventDefault()
    searchInput.value?.inputRef?.focus()
  } else if (event.key === 'Escape' && typing) {
    search.value = ''
    ;(target as HTMLInputElement).blur()
  }
}

onMounted(() => {
  unsubscribeQuotes = loadQuotes()
  window.addEventListener('keydown', handleShortcut)
  window.scrollTo(0, 0)
})

onBeforeUnmount(() => {
  unsubscribeQuotes?.()
  observer?.disconnect()
  window.removeEventListener('keydown', handleShortcut)
})
</script>

<style scoped lang="scss">
/* Section header */
.list-header {
  padding-bottom: 1.5rem;
}

.list-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  max-width: 34rem;
}

.stat-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.35);

  b {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    font-variant-numeric: tabular-nums;
  }
}

.stat-dot {
  color: rgba(255, 255, 255, 0.18);
}

/* Toolbar */
.toolbar {
  margin-top: 2rem;
  scroll-margin-top: 6rem;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms both;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-field {
  flex: 1;
  min-width: 0;
}

.order-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.95rem;
  border-radius: 0.55rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.16);
  }

  &--active {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.35);
  }
}

.lens-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.lens-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &--active {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.35);

    .lens-count { color: rgba(165, 180, 252, 0.6); }
  }

  &--voice {
    padding-left: 0.35rem;
    color: #c7d2fe;
    background: rgba(129, 140, 248, 0.14);
    border-color: rgba(129, 140, 248, 0.4);
  }
}

.lens-count {
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.28);
}

.clear-icon {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Results */
.result-line {
  margin: 1.25rem 0 0.85rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);

  b {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    font-variant-numeric: tabular-nums;
  }
}

.quote-grid {
  columns: 2;
  column-gap: 1rem;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
}

.sentinel {
  height: 1px;
}

.end-text {
  text-align: center;
  padding: 1.25rem 0 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.22);
}

/* States */
.quote-state {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;

  p { margin: 0; }
}

.quote-state-icon {
  flex: 0 0 auto;
  color: rgba(129, 140, 248, 0.75);
  font-size: 1.25rem;
}

/* Skeletons */
.skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.skeleton-spotlight {
  height: 12rem;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-rail {
  display: flex;
  gap: 0.5rem;
  overflow: hidden;
}

.skeleton-voice {
  flex-shrink: 0;
  width: 9rem;
  height: 3.4rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skeleton-card {
  height: 9rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .quote-grid { columns: 1; }
  .skeleton-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .toolbar-row { flex-wrap: wrap; }
  .search-field { flex-basis: 100%; }
  .order-btn { width: 100%; justify-content: center; }
}
</style>
