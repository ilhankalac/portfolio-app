<template>
  <nav class="navigation" :class="{ 'navigation--mobile-expanded': isMobileMenuOpen && isMobile }">
    <div class="navigation__container">
      <!-- Avatar & Name -->
      <div class="navigation__brand">
        <img
          src="~/assets/images/ilhan_kalac_small.png"
          alt="Ilhan Kalac"
          class="w-10 h-10 rounded-full transition-transform duration-200 hover:scale-105"
        />
        <div class="navigation__name">
          <span class="navigation__name-first">ILHAN </span><span class="navigation__name-last">KALAČ</span>
        </div>
      </div>

      <!-- Desktop Navigation Links -->
      <div v-if="!isMobile" class="navigation__links-wrapper">
        <div
          v-for="item in navigationItems"
          :key="item.id"
          class="navigation__link"
          :class="{ 'navigation__link--active': isActiveSection(item.sectionId) }"
          @click="navigateToSection(item.sectionId)"
        >
          {{ item.name }}
        </div>

        <!-- Explore Dropdown -->
        <UDropdownMenu :items="exploreMenuItems">
          <div class="navigation__link navigation__link--dropdown">
            Explore
            <UIcon name="i-mdi-chevron-down" class="ml-1 text-sm" />
          </div>
        </UDropdownMenu>
      </div>

      <!-- Mobile Menu Toggle -->
      <UButton
        v-if="isMobile"
        :icon="isMobileMenuOpen ? 'i-mdi-close' : 'i-mdi-menu'"
        variant="ghost"
        color="neutral"
        class="text-white opacity-90 hover:opacity-100"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation menu"
      />
    </div>

    <!-- Mobile Navigation Menu -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      class="navigation__mobile-menu"
    >
      <div
        v-for="item in navigationItems"
        :key="item.id"
        class="navigation__mobile-link"
        :class="{ 'navigation__mobile-link--active': isActiveSection(item.sectionId) }"
        @click="navigateToSection(item.sectionId)"
      >
        <UIcon name="i-mdi-chevron-right" class="text-sm text-white/50" />
        <span>{{ item.name }}</span>
      </div>

      <!-- Mobile Explore Section -->
      <div class="navigation__mobile-divider">Explore</div>
      <div
        v-for="item in exploreItems"
        :key="item.id"
        class="navigation__mobile-link navigation__mobile-link--sub"
        @click="navigateToRoute(item.route)"
      >
        <UIcon :name="item.icon" class="text-sm text-white/50" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
  origin?: string
}>()

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const activeSection = ref('initial')
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 960
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  setupSectionObserver()
  scrollToInitialSection()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const navigationItems = [
  { id: '0', name: 'Home', sectionId: 'initial' },
  { id: '1', name: 'About', sectionId: 'about' },
  { id: '2', name: 'Experience', sectionId: 'experience' },
  { id: '3', name: 'Projects', sectionId: 'freetime-projects' },
  { id: '4', name: 'Skills', sectionId: 'explore' },
  { id: '5', name: 'Recommendations', sectionId: 'recommendations' },
]

const exploreItems = [
  { id: 'blogs', name: 'Blogs', route: '/blogs/list', icon: 'i-mdi-post' },
  { id: 'films', name: 'Films', route: '/list-of-seen-films', icon: 'i-mdi-filmstrip' },
  { id: 'quotes', name: 'Quotes', route: '/favorite-quotes', icon: 'i-mdi-format-quote-close' },
]

const exploreMenuItems = computed(() => [
  exploreItems.map(item => ({
    label: item.name,
    icon: item.icon,
    click: () => navigateToRoute(item.route),
  }))
])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isActiveSection = (sectionId: string) => {
  return activeSection.value === sectionId
}

const navigateToRoute = (routePath: string) => {
  isMobileMenuOpen.value = false
  navigateTo(routePath)
}

const navigateToSection = async (sectionId: string) => {
  isMobileMenuOpen.value = false

  if (sectionId === 'initial') {
    router.replace({ path: '/', hash: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (props.origin === 'configure') {
    await navigateTo('/')
    await navigateTo({ hash: `#${sectionId}` })
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    router.push({ hash: `#${sectionId}` })
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const setupSectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id')
          if (sectionId && sectionId !== 'shadow-host-companion') {
            const url = sectionId === 'initial' ? '/' : `/#${sectionId}`
            window.history.pushState({}, '', url)
            activeSection.value = sectionId
          }
        }
      })
    },
    { threshold: 0.25 }
  )

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
  })
}

const scrollToInitialSection = () => {
  const sectionId = route.hash.slice(1)
  if (sectionId) {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background-color: rgb(var(--color-primary));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);

  &__container {
    display: flex;
    align-items: center;
    padding: 16px 32px;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    flex: 1;
  }

  &__name {
    font-family: 'Poppins', sans-serif;
    font-size: 1.25rem;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.95);
    white-space: nowrap;
  }

  &__name-first {
    font-weight: 100;
    letter-spacing: 0.4rem;
    opacity: 0.8;
    font-size: smaller;
  }

  &__name-last {
    font-weight: 400;
    letter-spacing: 0.4rem;
    opacity: 0.9;
    font-size: smaller;
  }

  &__links-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: flex-end;
  }

  &__link {
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    padding: 8px 16px;
    text-transform: uppercase;
    font-size: 0.813rem;
    font-weight: 400;
    letter-spacing: 0.8px;
    border-radius: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 1);
    }

    &--active {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(255, 255, 255, 0.12);
      font-weight: 500;
    }

    &--dropdown {
      display: flex;
      align-items: center;
    }
  }

  &__mobile-menu {
    animation: slideDown 0.3s ease-out;
    padding: 8px 24px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  &__mobile-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    padding: 12px 16px;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.8px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 1);
    }

    &--active {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(255, 255, 255, 0.1);
      font-weight: 500;
    }

    &--sub {
      padding-left: 32px;
      opacity: 0.9;
    }
  }

  &__mobile-divider {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 16px 16px 8px;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@keyframes slideDown {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 500px; }
}

@media (max-width: 960px) {
  .navigation__container {
    padding: 12px 20px;
  }
}
</style>
