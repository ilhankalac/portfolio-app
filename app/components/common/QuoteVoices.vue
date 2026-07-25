<template>
  <section class="voices">
    <header class="voices-head">
      <div>
        <span class="voices-label">Voices</span>
        <p class="voices-hint">The minds I keep coming back to — pick one to read only them.</p>
      </div>
      <button class="expand-btn" @click="expanded = !expanded">
        {{ expanded ? 'Show less' : `All ${voices.length} voices` }}
        <UIcon :name="expanded ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'" class="expand-icon" />
      </button>
    </header>

    <!-- Rail: the most quoted thinkers -->
    <div v-show="!expanded" class="voice-rail">
      <button
        v-for="voice in featured"
        :key="voice.author"
        class="voice-card"
        :class="{ 'voice-card--active': activeVoice === voice.author }"
        @click="emit('select', voice.author)"
      >
        <QuoteMonogram :author="voice.author" size="md" />
        <span class="voice-text">
          <span class="voice-name">{{ voice.name }}</span>
          <span class="voice-count">{{ voice.count }} {{ voice.count === 1 ? 'quote' : 'quotes' }}</span>
        </span>
      </button>
    </div>

    <!-- Expanded: every voice, ranked -->
    <div v-show="expanded" class="voice-panel">
      <div class="panel-list">
        <button
          v-for="voice in voices"
          :key="voice.author"
          class="voice-pill"
          :class="{ 'voice-pill--active': activeVoice === voice.author }"
          @click="emit('select', voice.author)"
        >
          <QuoteMonogram :author="voice.author" />
          <span class="pill-name">{{ voice.name }}</span>
          <span class="pill-count">{{ voice.count }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import QuoteMonogram from '~/components/common/QuoteMonogram.vue'
import type { IVoice } from '~/types/models'

const props = withDefaults(defineProps<{
  voices: IVoice[]
  activeVoice?: string | null
  featuredCount?: number
}>(), { featuredCount: 12 })

const emit = defineEmits<{ (e: 'select', author: string): void }>()

const expanded = ref(false)

/** The rail shows the most quoted thinkers, plus the active one so it is never hidden. */
const featured = computed(() => {
  const top = props.voices.slice(0, props.featuredCount)
  if (props.activeVoice && !top.some(voice => voice.author === props.activeVoice)) {
    const active = props.voices.find(voice => voice.author === props.activeVoice)
    if (active) return [active, ...top.slice(0, props.featuredCount - 1)]
  }
  return top
})
</script>

<style scoped lang="scss">
.voices {
  margin-top: 2rem;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
}

.voices-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.voices-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
}

.voices-hint {
  margin: 0.3rem 0 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.32);
}

.expand-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #a5b4fc;
    border-color: rgba(129, 140, 248, 0.3);
  }
}

.expand-icon {
  font-size: 0.9rem;
}

/* Rail */
.voice-rail {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 3rem), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 3rem), transparent);

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 2px; }
}

.voice-card {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem 0.6rem 0.6rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }

  &--active {
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.4);

    .voice-name { color: #e0e7ff; }
  }
}

.voice-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.voice-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.35;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.voice-count {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.35;
  white-space: nowrap;
}

/* Expanded panel */
.voice-panel {
  max-height: 17rem;
  overflow-y: auto;
  padding: 0.85rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
}

.panel-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.voice-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.65rem 0.3rem 0.35rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.14);
  }

  &--active {
    background: rgba(129, 140, 248, 0.14);
    border-color: rgba(129, 140, 248, 0.4);

    .pill-name { color: #e0e7ff; }
  }
}

.pill-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.pill-count {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.3);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
