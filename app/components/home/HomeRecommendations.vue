<template>
  <section v-if="recommendations.length" id="recommendations" class="site-section">
    <div class="site-container">
      <span class="site-eyebrow">Recommendations</span>
      <h2 class="site-heading">Kind words from<br>people I've worked with.</h2>

      <div ref="track" class="track" @scroll="updateEdges">
        <figure v-for="rec in recommendations" :key="rec.fullName" class="site-card quote">
          <blockquote class="site-prose text" v-html="rec.textHtml" />
          <figcaption class="author">
            <img v-if="rec.avatarSrc" :src="rec.avatarSrc" :alt="rec.fullName" class="avatar" loading="lazy">
            <span v-else class="avatar avatar--initial">{{ rec.fullName?.charAt(0) }}</span>
            <span>
              <strong>{{ rec.fullName }}</strong>
              <small>{{ rec.role }}</small>
            </span>
          </figcaption>
        </figure>
      </div>

      <div class="footer">
        <NuxtLink to="/write-recommendation" class="write">
          Worked with me? Share a recommendation
          <UIcon name="i-mdi-arrow-right" />
        </NuxtLink>
        <div v-if="!atStart || !atEnd" class="arrows">
          <button type="button" class="arrow" aria-label="Previous recommendation" :disabled="atStart" @click="scroll(-1)">
            <UIcon name="i-mdi-arrow-left" />
          </button>
          <button type="button" class="arrow" aria-label="Next recommendation" :disabled="atEnd" @click="scroll(1)">
            <UIcon name="i-mdi-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IColleagueInfo } from '~/types/models'

const props = defineProps<{ recommendations: IColleagueInfo[] }>()

const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(true)

function updateEdges() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 1
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
}

// Step by one card (plus the gap) so scroll-snap lands on the next quote.
function scroll(dir: 1 | -1) {
  const card = track.value?.firstElementChild as HTMLElement | null
  if (!card) return
  track.value!.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
}

onMounted(() => {
  updateEdges()
  window.addEventListener('resize', updateEdges)
})
onUnmounted(() => window.removeEventListener('resize', updateEdges))
watch(() => props.recommendations.length, () => nextTick(updateEdges))
</script>

<style scoped lang="scss">
.track {
  display: flex;
  gap: 1rem;
  margin-top: 3.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 0.25rem;
}

.quote {
  flex: 0 0 min(26rem, 85vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.75rem;
  margin: 0;
  padding: 1.75rem;
  scroll-snap-align: start;
}

.text {
  margin: 0;
  font-size: 0.95rem;
  /* Long recommendations are clamped so cards stay a similar height. */
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--site-border);

  strong {
    display: block;
    font-family: var(--site-display);
    font-weight: 600;
    font-size: 0.95rem;
  }

  small {
    color: var(--site-faint);
    font-size: 0.8rem;
  }
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(1);

  &--initial {
    display: grid;
    place-items: center;
    background: var(--site-surface-2);
    font-family: var(--site-display);
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.arrows {
  display: flex;
  gap: 0.5rem;
}

.arrow {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--site-border-strong);
  border-radius: 9999px;
  background: var(--site-surface);
  color: var(--site-text);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    border-color: rgb(var(--site-ink-rgb) / 0.32);
    background: var(--site-surface-2);
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
}

.write {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--site-display);
  font-size: 0.9rem;
  color: var(--site-muted);
  text-decoration: none;

  &:hover {
    color: var(--site-text);
  }
}
</style>
