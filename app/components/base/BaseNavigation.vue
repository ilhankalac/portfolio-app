<template>
  <nav class="nav" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="nav-inner">
      <!-- Brand -->
      <div class="nav-brand" @click="navigateToSection('initial')">
        <span class="brand-name">
          <span class="brand-first">Ilhan</span>
          <span class="brand-last">Kalač</span>
        </span>
      </div>

      <!-- Desktop links -->
      <div class="nav-links">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click="navigateToSection(item.id)"
        >
          {{ item.label }}
        </button>

        <UDropdownMenu :items="exploreMenuItems">
          <button class="nav-link">
            Explore
            <UIcon name="i-mdi-chevron-down" class="text-xs ml-0.5 opacity-60" />
          </button>
        </UDropdownMenu>
      </div>

      <!-- Mobile toggle -->
      <button class="nav-toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span class="toggle-bar" :class="{ open: mobileOpen }"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="nav-mobile">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="mobile-link"
          :class="{ active: activeSection === item.id }"
          @click="navigateToSection(item.id)"
        >
          {{ item.label }}
        </button>

        <div class="mobile-divider"></div>

        <button
          v-for="item in exploreItems"
          :key="item.route"
          class="mobile-link mobile-link--sub"
          @click="goTo(item.route)"
        >
          <UIcon :name="item.icon" class="text-sm opacity-50" />
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
  origin?: string
}>()

const router = useRouter()
const route = useRoute()

const mobileOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('initial')

const navItems = [
  { id: 'initial', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'freetime-projects', label: 'Projects' },
  { id: 'recommendations', label: 'Recommendations' },
]

const exploreItems = [
  { label: 'Blogs', route: '/blogs/list', icon: 'i-mdi-post' },
  { label: 'Films', route: '/list-of-seen-films', icon: 'i-mdi-filmstrip' },
  { label: 'Quotes', route: '/favorite-quotes', icon: 'i-mdi-format-quote-close' },
]

const exploreMenuItems = computed(() => [
  exploreItems.map(item => ({
    label: item.label,
    icon: item.icon,
    click: () => goTo(item.route),
  }))
])

const goTo = (path: string) => {
  mobileOpen.value = false
  navigateTo(path)
}

const navigateToSection = async (sectionId: string) => {
  mobileOpen.value = false

  if (sectionId === 'initial') {
    router.replace({ path: '/', hash: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (props.origin === 'configure') {
    await navigateTo('/')
    await navigateTo({ hash: `#${sectionId}` })
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return
  }

  const el = document.getElementById(sectionId)
  if (el) {
    router.push({ hash: `#${sectionId}` })
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Scroll detection
  const onScroll = () => {
    scrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Section observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id && id !== 'shadow-host-companion') {
            activeSection.value = id
            const url = id === 'initial' ? '/' : `/#${id}`
            window.history.replaceState({}, '', url)
          }
        }
      })
    },
    { threshold: 0.25 }
  )
  document.querySelectorAll('section').forEach((s) => observer.observe(s))

  // Hash scroll
  const hash = route.hash.slice(1)
  if (hash) {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    observer.disconnect()
  })
})
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(15, 23, 42, 0.85);
    border-bottom-color: rgba(255, 255, 255, 0.06);
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.875rem 2rem;

  @media (max-width: 640px) {
    padding: 0.75rem 1.25rem;
  }
}

/* Brand */
.nav-brand {
  cursor: pointer;
}

.brand-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.01em;
}

.brand-first {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.brand-last {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-left: 0.2rem;
}

/* Desktop links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 960px) {
    display: none;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
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
    font-weight: 500;
  }
}

/* Mobile toggle - animated hamburger */
.nav-toggle {
  display: none;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 960px) {
    display: flex;
  }
}

.toggle-bar {
  position: relative;
  width: 20px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &::before { top: -6px; }
  &::after { top: 6px; }

  &.open {
    background: transparent;
    &::before { top: 0; transform: rotate(45deg); }
    &::after { top: 0; transform: rotate(-45deg); }
  }
}

/* Mobile menu */
.nav-mobile {
  padding: 0.5rem 1.25rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (min-width: 961px) {
    display: none;
  }
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.07);
    font-weight: 500;
  }

  &--sub {
    padding-left: 1.25rem;
    font-size: 0.75rem;
  }
}

.mobile-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0.5rem 0.75rem;
}

/* Mobile menu transition */
.mobile-menu-enter-active {
  animation: slideIn 0.25s ease-out;
}

.mobile-menu-leave-active {
  animation: slideIn 0.2s ease-in reverse;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
