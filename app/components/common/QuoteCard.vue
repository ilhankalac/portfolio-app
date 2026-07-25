<template>
  <article
    class="quote-card"
    tabindex="0"
    role="button"
    :aria-label="`Open quote by ${author}`"
    @click="emit('open', quote)"
    @keydown.enter.prevent="emit('open', quote)"
    @keydown.space.prevent="emit('open', quote)"
  >
    <span class="card-glyph" aria-hidden="true">&ldquo;</span>

    <p class="card-text" :class="{ 'card-text--long': isTruncated }">{{ preview }}</p>

    <span v-if="isTruncated" class="card-more">
      Read in full
      <UIcon name="i-mdi-arrow-right" class="more-icon" />
    </span>

    <footer class="card-foot">
      <button
        class="card-author"
        :title="`Show only ${author}`"
        @click.stop="emit('select-voice', quote.author || '')"
      >
        <QuoteMonogram :author="quote.author" />
        <span class="author-text">
          <span class="author-name">{{ author }}</span>
          <span v-if="work" class="author-work">{{ work }}</span>
        </span>
      </button>

      <span class="card-actions">
        <button class="icon-btn" title="Copy quote" @click.stop="copyQuoteText(quote)">
          <UIcon name="i-mdi-content-copy" />
        </button>
        <button class="icon-btn" title="Copy link to quote" @click.stop="copyQuoteLink(quote)">
          <UIcon name="i-mdi-link-variant" />
        </button>
      </span>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import QuoteMonogram from '~/components/common/QuoteMonogram.vue'
import type { IQuote } from '~/types/models'

const PREVIEW_LENGTH = 260

const props = defineProps<{ quote: IQuote }>()

const emit = defineEmits<{
  (e: 'open', quote: IQuote): void
  (e: 'select-voice', author: string): void
}>()

const { stripHtml, authorName, quoteWork, copyQuoteText, copyQuoteLink } = useQuotes()

const plainText = computed(() => stripHtml(props.quote.text))
const isTruncated = computed(() => plainText.value.length > PREVIEW_LENGTH)
const preview = computed(() => {
  if (!isTruncated.value) return plainText.value
  const cut = plainText.value.slice(0, PREVIEW_LENGTH)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 180 ? lastSpace : cut.length).trimEnd()}…`
})

const author = computed(() => authorName(props.quote.author))
const work = computed(() => quoteWork(props.quote))
</script>

<style scoped lang="scss">
.quote-card {
  position: relative;
  display: block;
  width: 100%;
  break-inside: avoid;
  margin-bottom: 1rem;
  padding: 1.35rem 1.4rem 1.1rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease,
              background 0.25s ease,
              box-shadow 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(129, 140, 248, 0.28);
    box-shadow: 0 18px 36px -22px rgba(0, 0, 0, 0.8);
    outline: none;

    .card-glyph { color: rgba(129, 140, 248, 0.28); }
    .card-actions { opacity: 1; }
    .card-more { color: #a5b4fc; }
    .more-icon { transform: translateX(3px); }
  }
}

.card-glyph {
  position: absolute;
  top: -0.35rem;
  right: 0.85rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4.25rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  transition: color 0.25s ease;
}

.card-text {
  position: relative;
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-size: 1.02rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.82);
  letter-spacing: 0.003em;
}

.card-more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.6rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s ease;
}

.more-icon {
  font-size: 0.85rem;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-author {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;

  &:hover .author-name {
    color: #a5b4fc;
  }
}

.author-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.author-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.author-work {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.45rem;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
  }
}

/* Touch devices have no hover — keep the actions visible. */
@media (hover: none) {
  .card-actions { opacity: 0.55; }
}
</style>
