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
  { id: '4', name: 'Recommendations', sectionId: 'recommendations' },
  { id: '5', name: 'Explore', sectionId: 'explore' },
]

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isActiveSection = (sectionId: string) => {
  return activeSection.value === sectionId
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
    justify-content: space-between;
    padding: 16px 32px;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 1);
    }

    &--active {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(255, 255, 255, 0.12);
      font-weight: 500;
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
  }

  &__mobile-link-icon {
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s ease;
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
