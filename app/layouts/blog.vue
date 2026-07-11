<template>
  <div class="min-h-screen">
    <BaseNavigation origin="configure" />

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
  </div>
</template>

<script setup lang="ts">
import BaseNavigation from '~/components/base/BaseNavigation.vue'

const route = useRoute()

const sections = [
  { label: 'Blog', path: '/blogs', icon: 'i-mdi-post-outline', description: 'Thoughts & knowledge' },
  { label: 'Films', path: '/list-of-seen-films', icon: 'i-mdi-filmstrip', description: 'Every film I’ve seen' },
  { label: 'Quotes', path: '/favorite-quotes', icon: 'i-mdi-format-quote-close', description: 'Lines worth remembering' },
  { label: 'Now', path: '/now', icon: 'i-mdi-pulse', description: 'What I’m up to' },
]

const isActive = (section: { path: string }) => route.path.startsWith(section.path)
</script>

<style scoped lang="scss">
.explore-shell {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 3rem;
  max-width: 72rem;
  margin: 0 auto;
  /* Top padding clears the fixed navbar (~3.3rem) so page eyebrows/titles aren't hidden */
  padding: 5.5rem 1.5rem 3rem;
  min-height: 70vh;
}

/* Sidebar */
.explore-sidebar {
  position: sticky;
  top: 5.5rem;
  align-self: start;
  /* Offset the items' internal padding so icons/text align with the navbar brand */
  margin-left: -0.75rem;
}

.sidebar-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.3);
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
    background: rgba(255, 255, 255, 0.04);

    .item-label {
      color: rgba(255, 255, 255, 0.95);
    }
  }

  &--active {
    background: rgba(129, 140, 248, 0.08);

    .item-icon-wrap {
      color: #a5b4fc;
      background: rgba(129, 140, 248, 0.14);
      border-color: rgba(129, 140, 248, 0.3);
    }

    .item-label {
      color: #e0e7ff;
    }

    &:hover {
      background: rgba(129, 140, 248, 0.12);
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
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
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
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.35;
  transition: color 0.2s ease;
}

.item-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.32);
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
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-top: 3.5rem;
  }

  .explore-sidebar {
    position: sticky;
    top: 3.5rem;
    z-index: 100;
    margin: 0 -1.5rem;
    padding: 0.6rem 1.5rem;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
      border-color: rgba(129, 140, 248, 0.3);
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
