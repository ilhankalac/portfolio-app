<template>
  <section class="spotlight">
    <div class="spotlight-glow" aria-hidden="true" />

    <header class="spotlight-head">
      <span class="spotlight-label">
        <UIcon :name="isRandom ? 'i-mdi-shuffle-variant' : 'i-mdi-weather-night'" class="label-icon" />
        {{ isRandom ? 'Random pick' : 'Quote of the day' }}
      </span>
      <button class="shuffle-btn" title="Show another quote" @click="emit('shuffle')">
        <UIcon name="i-mdi-refresh" class="shuffle-icon" />
        <span>Shuffle</span>
      </button>
    </header>

    <blockquote class="spotlight-quote">
      <span class="spotlight-glyph" aria-hidden="true">&ldquo;</span>
      <Transition name="quote-swap" mode="out-in">
        <p :key="quote?.key" class="spotlight-text">{{ text }}</p>
      </Transition>
    </blockquote>

    <footer class="spotlight-foot">
      <button class="spotlight-author" :title="`Show only ${author}`" @click="emit('select-voice', quote?.author || '')">
        <QuoteMonogram :author="quote?.author" size="md" />
        <span class="author-text">
          <span class="author-name">{{ author }}</span>
          <span v-if="work" class="author-work">{{ work }}</span>
        </span>
      </button>

      <div class="spotlight-actions">
        <button class="ghost-btn" @click="copyQuoteText(quote)">
          <UIcon name="i-mdi-content-copy" />
          <span>Copy</span>
        </button>
        <button class="ghost-btn" @click="copyQuoteLink(quote)">
          <UIcon name="i-mdi-link-variant" />
          <span>Share</span>
        </button>
        <button class="ghost-btn ghost-btn--accent" @click="emit('open', quote)">
          <UIcon name="i-mdi-book-open-page-variant-outline" />
          <span>Read</span>
        </button>
      </div>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import QuoteMonogram from '~/components/common/QuoteMonogram.vue'
import type { IQuote } from '~/types/models'

const props = defineProps<{
  quote?: IQuote
  isRandom?: boolean
}>()

const emit = defineEmits<{
  (e: 'shuffle'): void
  (e: 'open', quote?: IQuote): void
  (e: 'select-voice', author: string): void
}>()

const { stripHtml, authorName, quoteWork, copyQuoteText, copyQuoteLink } = useQuotes()

const text = computed(() => stripHtml(props.quote?.text))
const author = computed(() => authorName(props.quote?.author))
const work = computed(() => quoteWork(props.quote))
</script>

<style scoped lang="scss">
.spotlight {
  position: relative;
  overflow: hidden;
  padding: 1.6rem 1.75rem 1.4rem;
  border-radius: 1.1rem;
  background: linear-gradient(150deg, rgba(129, 140, 248, 0.09), rgba(255, 255, 255, 0.02) 45%);
  border: 1px solid rgba(129, 140, 248, 0.18);
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.spotlight-glow {
  position: absolute;
  top: -55%;
  right: -12%;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.16), transparent 68%);
  pointer-events: none;
}

.spotlight-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
}

.spotlight-label {
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

.label-icon {
  font-size: 0.85rem;
}

.shuffle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #c7d2fe;
    border-color: rgba(129, 140, 248, 0.35);
    background: rgba(129, 140, 248, 0.1);

    .shuffle-icon { transform: rotate(180deg); }
  }
}

.shuffle-icon {
  font-size: 0.85rem;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight-quote {
  position: relative;
  margin: 0;
  padding-left: 2.4rem;
  min-height: 4rem;
}

.spotlight-glyph {
  position: absolute;
  left: -0.15rem;
  top: -1.4rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 5rem;
  line-height: 1;
  color: rgba(129, 140, 248, 0.3);
  pointer-events: none;
}

.spotlight-text {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(1.2rem, 2.6vw, 1.6rem);
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.93);
}

.spotlight-foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.4rem;
  padding-top: 1rem;
  padding-left: 2.4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.spotlight-author {
  display: flex;
  align-items: center;
  gap: 0.65rem;
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
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.35;
  transition: color 0.2s ease;
}

.author-work {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.35;
}

.spotlight-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.55rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
  }

  &--accent {
    color: #a5b4fc;
    border-color: rgba(129, 140, 248, 0.25);
    background: rgba(129, 140, 248, 0.1);

    &:hover {
      color: #e0e7ff;
      border-color: rgba(129, 140, 248, 0.45);
      background: rgba(129, 140, 248, 0.18);
    }
  }
}

/* Quote swap animation */
.quote-swap-enter-active,
.quote-swap-leave-active {
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.quote-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.quote-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .spotlight {
    padding: 1.25rem 1.15rem 1.15rem;
  }

  .spotlight-quote,
  .spotlight-foot {
    padding-left: 0;
  }

  .spotlight-glyph {
    display: none;
  }

  .spotlight-actions {
    width: 100%;
  }

  .ghost-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
