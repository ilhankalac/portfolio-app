<template>
  <nav class="nav" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="nav-inner">
      <!-- Brand -->
      <div class="nav-brand" @click="navigateToSection('initial')">
        <span class="brand-mark">IK</span>
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

        <UDropdownMenu :items="exploreMenuItems" :modal="false">
          <button class="nav-link" :class="{ active: isExploreRoute }">
            Explore
            <UIcon name="i-mdi-chevron-down" class="text-xs ml-0.5 opacity-60" />
          </button>
        </UDropdownMenu>

        <span class="nav-sep" />

        <button class="nav-cta" @click="navigateToSection('get-in-touch')">
          Get in touch
        </button>
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

        <div class="mobile-divider"></div>

        <button class="mobile-link mobile-link--cta" @click="navigateToSection('get-in-touch')">
          <UIcon name="i-mdi-email-outline" class="text-sm" />
          Get in touch
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
  { label: 'Blogs', route: '/blogs', icon: 'i-mdi-post' },
  { label: 'Films', route: '/list-of-seen-films', icon: 'i-mdi-filmstrip' },
  { label: 'Quotes', route: '/favorite-quotes', icon: 'i-mdi-format-quote-close' },
  { label: 'Now', route: '/now', icon: 'i-mdi-clock-time-four-outline' },
]

const isExploreRoute = computed(() =>
  exploreItems.some(item => route.path.startsWith(item.route)),
)

const exploreMenuItems = computed(() => [
  exploreItems.map(item => ({
    label: item.label,
    icon: item.icon,
    onSelect: () => goTo(item.route),
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
    await navigateTo({ path: '/', hash: `#${sectionId}` })
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    return
  }

  const el = document.getElementById(sectionId)
  if (el) {
    router.push({ hash: `#${sectionId}` })
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const sections = Array.from(document.querySelectorAll('section[id]')).filter(
    (s) => s.getAttribute('id') !== 'shadow-host-companion'
  ) as HTMLElement[]

  const updateActiveSection = () => {
    scrolled.value = window.scrollY > 20

    const offset = 100
    let currentId = 'initial'

    for (const section of sections) {
      const top = section.getBoundingClientRect().top
      if (top <= offset) {
        currentId = section.id
      }
    }

    if (currentId !== activeSection.value) {
      activeSection.value = currentId
      const url = currentId === 'initial' ? '/' : `/#${currentId}`
      window.history.replaceState({}, '', url)
    }
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()

  // Hash scroll
  const hash = route.hash.slice(1)
  if (hash) {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
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
  /* Match .explore-shell (72rem / 1.5rem) so the brand aligns with page content */
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;

  @media (max-width: 640px) {
    padding: 0.75rem 1.25rem;
  }
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;

  &:hover .brand-mark {
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
  }
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.55rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #fff;
  background: linear-gradient(135deg, #4f46e5, #818cf8);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
  transition: box-shadow 0.25s ease;
  flex-shrink: 0;
}

.brand-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
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
  padding: 0.4rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  letter-spacing: 0.01em;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #c7d2fe;
    background: rgba(129, 140, 248, 0.12);
  }
}

.nav-sep {
  width: 1px;
  height: 1.1rem;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 0.6rem;
  flex-shrink: 0;
}

.nav-cta {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.95rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #c7d2fe;
  background: rgba(129, 140, 248, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  letter-spacing: 0.01em;

  &:hover {
    color: #e0e7ff;
    background: rgba(129, 140, 248, 0.2);
    border-color: rgba(129, 140, 248, 0.5);
    box-shadow: 0 0 16px rgba(129, 140, 248, 0.15);
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

  &--cta {
    color: #c7d2fe;
    background: rgba(129, 140, 248, 0.1);
    border: 1px solid rgba(129, 140, 248, 0.25);
    justify-content: center;
    font-weight: 600;
    margin-top: 0.25rem;

    &:hover {
      color: #e0e7ff;
      background: rgba(129, 140, 248, 0.18);
    }
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
