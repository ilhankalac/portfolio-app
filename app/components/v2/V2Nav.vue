<template>
  <header class="nav" :class="{ scrolled }">
    <NuxtLink to="/" class="logo" aria-label="Ilhan Kalač — home">
      <span>Ilhan</span>
      <span>Kalač</span>
    </NuxtLink>

    <nav class="pill" aria-label="Sections">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="item.to"
        class="pill-link"
        :class="{ active: active === item.id }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <span class="status">[ Open to remote ]</span>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-label="Menu"
      @click="menuOpen = !menuOpen"
    >
      <UIcon :name="menuOpen ? 'i-mdi-close' : 'i-mdi-menu'" />
    </button>

    <Transition name="menu">
      <nav v-if="menuOpen" class="sheet" aria-label="Sections">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="item.to"
          class="sheet-link"
          :class="{ active: active === item.id }"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <span class="sheet-status">[ Open to remote ]</span>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

/** Home sections link by hash; "Explore" covers the blog, films, quotes, songs and now pages. */
const sections = ['home', 'why', 'projects', 'about', 'experience', 'contact']
const items = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'why', label: 'Why me', to: '/#why' },
  { id: 'projects', label: 'Projects', to: '/#projects' },
  { id: 'about', label: 'About', to: '/#about' },
  { id: 'experience', label: 'Experience', to: '/#experience' },
  { id: 'explore', label: 'Explore', to: '/blogs' },
  { id: 'contact', label: 'Contact', to: '/#contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)
const homeSection = ref('home')

const active = computed(() => (route.path === '/' ? homeSection.value : 'explore'))

watch(() => route.fullPath, () => (menuOpen.value = false))

onMounted(() => {
  const update = () => {
    scrolled.value = window.scrollY > 10
    if (route.path !== '/') return
    let current = 'home'
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
    }
    homeSection.value = current
  }

  window.addEventListener('scroll', update, { passive: true })
  watch(() => route.path, () => nextTick(update))
  update()
  onUnmounted(() => window.removeEventListener('scroll', update))
})
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.1rem 2rem;
  transition: background-color 0.3s ease;

  &.scrolled {
    background: linear-gradient(180deg, rgba(11, 11, 10, 0.85), rgba(11, 11, 10, 0));
  }

  @media (max-width: 900px) {
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 0.9rem 1rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr auto;
  }
}

.logo {
  display: flex;
  flex-direction: column;
  font-family: var(--v2-display);
  font-weight: 800;
  font-size: 0.82rem;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--v2-text);
  text-decoration: none;
  justify-self: start;
}

.pill {
  display: flex;
  gap: 0.25rem;
  padding: 0.3rem;
  border: 1px solid var(--v2-border-strong);
  border-radius: 9999px;
  background: rgba(20, 20, 19, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media (max-width: 900px) {
    justify-self: end;
  }

  /* Below this the pill would be clipped — the menu sheet takes over. */
  @media (max-width: 720px) {
    display: none;
  }
}

.pill-link {
  position: relative;
  padding: 0.45rem 0.9rem;
  border-radius: 9999px;
  font-family: var(--v2-display);
  font-size: 0.82rem;
  color: var(--v2-faint);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: var(--v2-text);
  }

  &.active {
    color: var(--v2-text);

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0.15rem;
      width: 1rem;
      height: 2px;
      border-radius: 2px;
      background: var(--v2-text);
      transform: translateX(-50%);
    }
  }

  @media (max-width: 900px) {
    padding: 0.45rem 0.7rem;
  }
}

.status {
  justify-self: end;
  font-family: var(--v2-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v2-faint);

  @media (max-width: 900px) {
    display: none;
  }
}

.menu-toggle {
  display: none;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--v2-border-strong);
  border-radius: 50%;
  background: rgba(20, 20, 19, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  color: var(--v2-text);
  font-size: 1.2rem;
  cursor: pointer;

  @media (max-width: 720px) {
    display: grid;
  }
}

.sheet {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid var(--v2-border-strong);
  border-radius: 1.25rem;
  background: rgba(20, 20, 19, 0.95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.sheet-link {
  padding: 0.85rem 1rem;
  border-radius: 0.8rem;
  font-family: var(--v2-display);
  font-size: 1.05rem;
  color: var(--v2-muted);
  text-decoration: none;

  &.active {
    color: var(--v2-text);
    background: var(--v2-surface-2);
  }
}

.sheet-status {
  padding: 0.85rem 1rem 0.5rem;
  font-family: var(--v2-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v2-faint);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
