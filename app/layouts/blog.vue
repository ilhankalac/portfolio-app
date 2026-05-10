<template>
  <div class="min-h-screen">
    <BaseNavigation origin="configure" />

    <!-- Cover image -->
    <div class="cover-wrap">
      <img
        src="/images/blog/header.webp"
        alt=""
        class="cover-img"
      />
      <div class="cover-overlay" />
    </div>

    <!-- Tabs -->
    <div class="tab-bar">
      <div class="tab-bar-inner">
        <!-- Desktop Tabs -->
        <div class="tab-pills">
          <button
            v-for="tab in tabConfig"
            :key="tab.value"
            class="tab-pill"
            :class="{ active: activeTab === tab.value }"
            @click="openRoute(tab.path)"
          >
            <UIcon :name="tab.icon" class="tab-pill-icon" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Mobile Dropdown -->
        <div class="tab-mobile">
          <UDropdownMenu :items="mobileMenuItems">
            <button class="tab-mobile-btn">
              <UIcon :name="activeTabIcon" class="tab-mobile-icon" />
              {{ activeTabLabel }}
              <UIcon name="i-mdi-chevron-down" class="tab-mobile-chevron" />
            </button>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="blog-layout-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseNavigation from '~/components/base/BaseNavigation.vue'

const router = useRouter()

const tabConfig = [
  { label: 'Blog', value: 'one', path: '/blogs', icon: 'i-mdi-post' },
  { label: 'Films', value: 'three', path: '/list-of-seen-films', icon: 'i-mdi-filmstrip' },
  { label: 'Quotes', value: 'two', path: '/favorite-quotes', icon: 'i-mdi-format-quote-close' },
  { label: 'Now', value: 'four', path: '/now', icon: 'i-mdi-pulse' },
]

const activeTab = ref('one')

const activeTabIcon = computed(() => tabConfig.find(t => t.value === activeTab.value)?.icon || 'i-mdi-post')
const activeTabLabel = computed(() => tabConfig.find(t => t.value === activeTab.value)?.label || 'Blog')

const mobileMenuItems = computed(() => [
  tabConfig.map(t => ({
    label: t.label,
    icon: t.icon,
    onSelect: () => openRoute(t.path),
  }))
])

const openRoute = (path: string) => {
  activeTab.value = tabConfig.find(t => t.path === path)?.value || 'one'
  navigateTo(path)
}

onMounted(() => {
  const currentPath = router.currentRoute.value.path
  const matchedTab = tabConfig.find(t => currentPath.startsWith(t.path))
  if (matchedTab) {
    activeTab.value = matchedTab.value
  }
})
</script>

<style scoped lang="scss">
/* Cover image */
.cover-wrap {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.4) 0%,
    rgba(15, 23, 42, 0.85) 100%
  );
  pointer-events: none;
}

.tab-bar {
  position: sticky;
  top: 56px;
  z-index: 100;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tab-bar-inner {
  max-width: 64rem; /* max-w-5xl */
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
}

.tab-pills {
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media (max-width: 640px) {
    display: none;
  }
}

.tab-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  letter-spacing: 0.01em;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.08);
  }
}

.tab-pill-icon {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Mobile dropdown */
.tab-mobile {
  display: none;

  @media (max-width: 640px) {
    display: block;
  }
}

.tab-mobile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

.tab-mobile-icon {
  font-size: 0.9rem;
  color: #818cf8;
}

.tab-mobile-chevron {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-left: auto;
}

/* Content area */
.blog-layout-content {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
  min-height: 70vh;
}
</style>
