<template>
  <nav class="navigation" :class="{ 'navigation--mobile-expanded': isMobileMenuOpen && isMobile }">
    <div class="navigation__container">
      <!-- Avatar & Name -->
      <div class="navigation__brand">
        <v-avatar class="navigation__avatar" size="40">
          <v-img src="@/assets/ilhan_kalac_small.png" alt="Ilhan Kalac" />
        </v-avatar>
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
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <div
              v-bind="props"
              class="navigation__link navigation__link--dropdown"
            >
              Explore
              <v-icon size="small" class="ml-1">mdi-chevron-down</v-icon>
            </div>
          </template>
          <v-list class="navigation__dropdown-list">
            <v-list-item
              v-for="item in exploreItems"
              :key="item.id"
              @click="navigateToRoute(item.route)"
              class="navigation__dropdown-item"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" size="small" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Mobile Menu Toggle -->
      <v-btn
        v-if="isMobile"
        icon
        variant="text"
        color="white"
        class="navigation__menu-toggle"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation menu"
      >
        <v-icon>{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-btn>
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
        <v-icon size="small" class="navigation__mobile-link-icon">
          mdi-chevron-right
        </v-icon>
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
        <v-icon size="small" class="navigation__mobile-link-icon">
          {{ item.icon }}
        </v-icon>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'

// Props
const props = defineProps<{
  origin?: string
}>()

// Composables
const { smAndDown } = useDisplay()
const router = useRouter()
const route = useRoute()

// State
const isMobileMenuOpen = ref(false)
const activeSection = ref('initial')

// Computed
const isMobile = computed(() => smAndDown.value)

// Navigation items
const navigationItems = [
  { id: '0', name: 'Home', sectionId: 'initial' },
  { id: '1', name: 'About', sectionId: 'about' },
  { id: '2', name: 'Experience', sectionId: 'experience' },
  { id: '3', name: 'Projects', sectionId: 'freetime-projects' },
  { id: '4', name: 'Skills', sectionId: 'explore' },
  { id: '5', name: 'Recommendations', sectionId: 'recommendations' },
]

// Explore dropdown items
const exploreItems = [
  { id: 'blogs', name: 'Blogs', route: '/blogs/list', icon: 'mdi-post' },
  { id: 'films', name: 'Films', route: '/list-of-seen-films', icon: 'mdi-filmstrip' },
  { id: 'quotes', name: 'Quotes', route: '/favorite-quotes', icon: 'mdi-format-quote-close' },
]

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isActiveSection = (sectionId: string) => {
  return activeSection.value === sectionId
}

const navigateToRoute = (routePath: string) => {
  isMobileMenuOpen.value = false
  router.push(routePath)
}

const navigateToSection = (sectionId: string) => {
  isMobileMenuOpen.value = false

  // Navigate to home (top of page)
  if (sectionId === 'initial') {
    // Use replace to avoid adding to history
    router.replace({ path: '/', hash: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  // Handle navigation from configure page
  if (props.origin === 'configure') {
    router.push('/').then(() => {
      router.push({ hash: `#${sectionId}` })
      // Scroll after navigation
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
    return
  }

  // Navigate to section with smooth scroll
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

  // Observe all sections
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

// Lifecycle
onMounted(() => {
  setupSectionObserver()
  scrollToInitialSection()
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background-color: rgb(var(--v-theme-primary));
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

  &__avatar {
    transition: transform 0.2s ease;
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

  &__brand:hover &__avatar {
    transform: scale(1.05);
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

  &__dropdown-list {
    background-color: rgb(var(--v-theme-primary)) !important;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    min-width: 180px;
  }

  &__dropdown-item {
    color: rgba(255, 255, 255, 0.85) !important;
    text-transform: uppercase;
    font-size: 0.813rem;
    letter-spacing: 0.8px;
    transition: all 0.2s ease;
    padding: 12px 16px;

    :deep(.v-list-item-title) {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.813rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    :deep(.v-icon) {
      color: rgba(255, 255, 255, 0.7);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;

      :deep(.v-list-item-title) {
        color: rgba(255, 255, 255, 1);
      }

      :deep(.v-icon) {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  &__menu-toggle {
    opacity: 0.9;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
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

      .navigation__mobile-link-icon {
        color: rgba(255, 255, 255, 1);
      }
    }

    &--sub {
      padding-left: 32px;
      opacity: 0.9;
    }
  }

  &__mobile-link-icon {
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s ease;
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
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

@media (max-width: 960px) {
  .navigation__container {
    padding: 12px 20px;
  }
}
</style>
