<template>
  <div class="reader">
    <img v-if="quote?.imageSrc" :src="quote.imageSrc" :alt="author" class="reader-image">

    <div class="reader-body">
      <header class="reader-head">
        <span class="reader-label">
          <UIcon :name="isScreen ? 'i-mdi-filmstrip' : 'i-mdi-format-quote-close'" class="label-icon" />
          {{ isScreen ? 'From the screen' : 'From the page' }}
        </span>
        <button class="close-btn" title="Close" @click="emit('close')">
          <UIcon name="i-mdi-close" />
        </button>
      </header>

      <blockquote class="reader-quote">
        <span class="reader-glyph" aria-hidden="true">&ldquo;</span>
        <div class="reader-text" v-html="quote?.text" />
      </blockquote>

      <footer class="reader-foot">
        <button class="reader-author" :title="`Show only ${author}`" @click="emit('select-voice', quote?.author || '')">
          <QuoteMonogram :author="quote?.author" size="lg" />
          <span class="author-text">
            <span class="author-name">{{ author }}</span>
            <span v-if="meta" class="author-meta">{{ meta }}</span>
          </span>
        </button>

        <div class="reader-actions">
          <button class="ghost-btn" @click="copyQuoteText(quote)">
            <UIcon name="i-mdi-content-copy" />
            <span>Copy quote</span>
          </button>
          <button class="ghost-btn ghost-btn--accent" @click="copyQuoteLink(quote)">
            <UIcon name="i-mdi-link-variant" />
            <span>Copy link</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QuoteMonogram from '~/components/common/QuoteMonogram.vue'
import type { IQuote } from '~/types/models'

const props = defineProps<{ quote?: IQuote }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select-voice', author: string): void
}>()

const { authorName, quoteWork, isScreenSource, copyQuoteText, copyQuoteLink } = useQuotes()

const author = computed(() => authorName(props.quote?.author))
const isScreen = computed(() => isScreenSource(props.quote?.author))
const meta = computed(() => {
  return [quoteWork(props.quote), props.quote?.year].filter(Boolean).join(' · ')
})
</script>

<style scoped lang="scss">
.reader {
  background: rgb(17, 26, 44);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  overflow: hidden;
  max-height: 85vh;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
}

.reader-image {
  width: 100%;
  max-height: 14rem;
  object-fit: cover;
}

.reader-body {
  padding: 1.35rem 1.6rem 1.5rem;
}

.reader-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
}

.reader-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #a5b4fc;
}

.label-icon { font-size: 0.85rem; }

.close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.09);
  }
}

.reader-quote {
  position: relative;
  margin: 0;
  padding-left: 2.2rem;
}

.reader-glyph {
  position: absolute;
  left: -0.2rem;
  top: -1.5rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4.75rem;
  line-height: 1;
  color: rgba(129, 140, 248, 0.28);
  pointer-events: none;
}

.reader-text {
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  font-weight: 300;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.9);

  :deep(p) {
    margin: 0 0 0.9rem;

    &:last-child { margin-bottom: 0; }
  }

  :deep(em) { font-style: italic; }
  :deep(strong) { font-weight: 500; color: #fff; }

  :deep(a) {
    color: #a5b4fc;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
}

.reader-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.reader-author {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover .author-name { color: #c7d2fe; }
}

.author-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.author-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
  transition: color 0.2s ease;
}

.author-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.4;
}

.reader-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.55rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-color: rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.07);
  }

  &--accent {
    color: #a5b4fc;
    border-color: rgba(129, 140, 248, 0.28);
    background: rgba(129, 140, 248, 0.1);

    &:hover {
      color: #e0e7ff;
      border-color: rgba(129, 140, 248, 0.45);
      background: rgba(129, 140, 248, 0.18);
    }
  }
}

@media (max-width: 640px) {
  .reader-body { padding: 1.1rem 1.1rem 1.25rem; }
  .reader-quote { padding-left: 0; }
  .reader-glyph { display: none; }
  .reader-actions { width: 100%; }
  .ghost-btn { flex: 1; justify-content: center; }
}
</style>
