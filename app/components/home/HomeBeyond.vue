<template>
  <section id="beyond" class="site-section">
    <div class="site-container">
      <span class="site-eyebrow">Beyond code</span>
      <h2 class="site-heading">Films, books, places<br>and everything between.</h2>
      <p class="site-lede">
        The things that shape how I think, collected in one place.
      </p>

      <div class="grid">
        <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="site-card tile">
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
  {
    to: '/travel',
    icon: 'i-mdi-map-marker-outline',
    title: 'Travel',
    text: 'Countries and cities I have visited, from the Balkans to Japan.',
    cta: 'See places',
  },
]
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
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
    font-family: var(--site-display);
    font-weight: 600;
    font-size: 1.35rem;
    letter-spacing: -0.02em;
    margin: 0.75rem 0 0;
  }

  p {
    margin: 0;
    color: var(--site-muted);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  &:hover {
    border-color: var(--site-border-strong);
    background: var(--site-surface-2);
    transform: translateY(-3px);
  }

  &:hover .go {
    color: var(--site-accent);
  }
}

.icon {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--site-border-strong);
  border-radius: 50%;
  font-size: 1.15rem;
  color: var(--site-accent);
}

.go {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 1rem;
  font-family: var(--site-display);
  font-size: 0.88rem;
  color: var(--site-text);
  transition: color 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .tile:hover { transform: none; }
}
</style>
