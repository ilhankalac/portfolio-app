<template>
  <section id="beyond" class="v2-section">
    <div class="v2-container">
      <span class="v2-eyebrow">Beyond code</span>
      <h2 class="v2-heading">Films, books<br>and everything between.</h2>
      <p class="v2-lede">
        The things that shape how I think, collected in one place.
      </p>

      <div class="grid">
        <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="v2-card tile">
          <span class="icon"><UIcon :name="item.icon" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <span class="go">
            {{ item.cta }}
            <UIcon name="i-mdi-arrow-right" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    to: '/blogs',
    icon: 'i-mdi-post-outline',
    title: 'Blog',
    text: 'Thoughts on engineering, AI tools, interviews and teaching.',
    cta: 'Read posts',
  },
  {
    to: '/list-of-seen-films',
    icon: 'i-mdi-filmstrip',
    title: 'Films',
    text: 'Every film I have seen since 2016, with a ranked list of favorites.',
    cta: 'Browse films',
  },
  {
    to: '/favorite-quotes',
    icon: 'i-mdi-format-quote-close',
    title: 'Quotes',
    text: 'Lines I have collected over the years from books, film and thinkers.',
    cta: 'Read quotes',
  },
  {
    to: '/favorite-songs',
    icon: 'i-mdi-music-note-outline',
    title: 'Songs',
    text: 'Tracks I keep coming back to, from film scores to prog rock.',
    cta: 'Listen',
  },
]
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.5rem;
  min-height: 15rem;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;

  h3 {
    font-family: var(--v2-display);
    font-weight: 600;
    font-size: 1.35rem;
    letter-spacing: -0.02em;
    margin: 0.75rem 0 0;
  }

  p {
    margin: 0;
    color: var(--v2-muted);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  &:hover {
    border-color: var(--v2-border-strong);
    background: var(--v2-surface-2);
    transform: translateY(-3px);
  }

  &:hover .go {
    color: var(--v2-accent);
  }
}

.icon {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--v2-border-strong);
  border-radius: 50%;
  font-size: 1.15rem;
  color: var(--v2-accent);
}

.go {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 1rem;
  font-family: var(--v2-display);
  font-size: 0.88rem;
  color: var(--v2-text);
  transition: color 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .tile:hover { transform: none; }
}
</style>
