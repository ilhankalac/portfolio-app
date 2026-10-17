<template>
  <div class="site">
    <SiteNav />

    <div class="explore-shell">
      <!-- Sidebar -->
      <aside class="explore-sidebar">
        <span class="sidebar-label">Explore</span>
        <nav class="sidebar-nav">
          <NuxtLink
            v-for="section in sections"
            :key="section.path"
            :to="section.path"
            class="sidebar-item"
            :class="{ 'sidebar-item--active': isActive(section) }"
          >
            <span class="item-icon-wrap">
              <UIcon :name="section.icon" class="item-icon" />
            </span>
            <span class="item-text">
              <span class="item-label">{{ section.label }}</span>
              <span class="item-desc">{{ section.description }}</span>
            </span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Content -->
      <main class="explore-content">
        <slot />
      </main>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/base/SiteNav.vue'
import SiteFooter from '~/components/base/SiteFooter.vue'

const route = useRoute()

const sections = [
  { label: 'Blog', path: '/blogs', icon: 'i-mdi-post-outline', description: 'Thoughts & knowledge' },
  { label: 'Films', path: '/list-of-seen-films', icon: 'i-mdi-filmstrip', description: 'Every film I’ve seen' },
  { label: 'Quotes', path: '/favorite-quotes', icon: 'i-mdi-format-quote-close', description: 'Lines worth remembering' },
  { label: 'Songs', path: '/favorite-songs', icon: 'i-mdi-music-note-outline', description: 'Tracks on repeat' },
  { label: 'Travel', path: '/travel', icon: 'i-mdi-map-marker-outline', description: 'Places I’ve been' },
  { label: 'Now', path: '/now', icon: 'i-mdi-pulse', description: 'What I’m up to' },
]

const isActive = (section: { path: string }) => route.path.startsWith(section.path)
</script>

<style scoped lang="scss">
.explore-shell {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 3rem;
  max-width: var(--site-max);
  margin: 0 auto;
  /* Top padding clears the fixed navbar so page eyebrows/titles aren't hidden */
  padding: 7rem var(--site-gutter) 3rem;
  min-height: 70vh;
}

/* Sidebar */
.explore-sidebar {
  position: sticky;
  top: 7rem;
  align-self: start;
  /* Offset the items' internal padding so icons/text align with the navbar brand */
  margin-left: -0.75rem;
}

.sidebar-label {
  display: block;
  font-family: var(--site-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgb(var(--site-ink-rgb) / 0.3);
  padding: 0 0.75rem;
  margin-bottom: 0.75rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.65rem;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgb(var(--site-ink-rgb) / 0.04);

    .item-label {
      color: rgb(var(--site-ink-rgb) / 0.95);
    }
  }

  &--active {
    background: rgb(var(--site-accent-rgb) / 0.08);

    .item-icon-wrap {
      color: var(--site-accent);
      background: rgb(var(--site-accent-rgb) / 0.14);
      border-color: rgb(var(--site-accent-rgb) / 0.3);
    }

    .item-label {
      color: var(--site-text);
    }

    &:hover {
      background: rgb(var(--site-accent-rgb) / 0.12);
    }
  }
}

.item-icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.55rem;
  color: rgb(var(--site-ink-rgb) / 0.45);
  background: rgb(var(--site-ink-rgb) / 0.04);
  border: 1px solid rgb(var(--site-ink-rgb) / 0.07);
  transition: all 0.2s ease;
}

.item-icon {
  font-size: 1rem;
}

.item-text {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
}

.item-label {
  font-family: var(--site-display);
  font-size: 0.85rem;
  font-weight: 550;
  color: rgb(var(--site-ink-rgb) / 0.75);
  line-height: 1.35;
  transition: color 0.2s ease;
}

.item-desc {
  font-family: var(--site-display);
  font-size: 0.72rem;
  color: rgb(var(--site-ink-rgb) / 0.32);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Content */
.explore-content {
  min-width: 0;
}

/* Mobile: sidebar becomes a sticky horizontal bar */
@media (max-width: 768px) {
  .explore-shell {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    padding-top: 5rem;
  }

  .explore-sidebar {
    position: sticky;
    top: 4.4rem;
    z-index: 100;
    margin: 0 -1.5rem;
    padding: 0.6rem 1.5rem;
    background: rgb(var(--site-bg-rgb) / 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgb(var(--site-ink-rgb) / 0.06);
  }

  .sidebar-label {
    display: none;
  }

  .sidebar-nav {
    flex-direction: row;
    gap: 0.35rem;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .sidebar-item {
    flex-shrink: 0;
    padding: 0.4rem 0.7rem;
    border-radius: 9999px;
    border: 1px solid transparent;

    &--active {
      border-color: rgb(var(--site-accent-rgb) / 0.3);
    }
  }

  .item-icon-wrap {
    width: auto;
    height: auto;
    background: none;
    border: none;
  }

  .item-icon {
    font-size: 0.9rem;
  }

  .item-desc {
    display: none;
  }

  .item-label {
    font-size: 0.8rem;
  }
}
</style>
