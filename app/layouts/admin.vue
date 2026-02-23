<template>
  <div class="min-h-screen bg-slate-900">
    <!-- App Bar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/10">
      <div class="flex items-center h-14 px-4">
        <UButton
          icon="i-mdi-menu"
          variant="ghost"
          color="neutral"
          class="text-white"
          @click="showDrawer = !showDrawer"
        />
        <h1
          class="ml-3 text-white text-lg cursor-pointer"
          @click="navigateTo('/admin-panel')"
        >
          {{ currentRouteName ? 'Configure ' + currentRouteName : 'Admin Panel' }}
        </h1>
        <div class="ml-auto">
          <UButton
            icon="i-mdi-logout"
            variant="ghost"
            color="neutral"
            class="text-white"
            @click="logout"
          />
        </div>
      </div>
    </header>

    <!-- Navigation Drawer -->
    <Transition name="slide">
      <aside
        v-if="showDrawer"
        class="fixed top-14 left-0 bottom-0 w-64 bg-slate-900 border-r border-white/10 z-40 overflow-y-auto"
      >
        <!-- Portfolio Sections -->
        <div class="p-3">
          <button
            class="flex items-center gap-2 w-full px-3 py-2 text-white/70 text-sm uppercase tracking-wider"
            @click="sectionsOpen = !sectionsOpen"
          >
            <UIcon name="i-mdi-account-circle" class="text-lg" />
            <span>Portfolio Sections</span>
            <UIcon
              :name="sectionsOpen ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'"
              class="ml-auto"
            />
          </button>
          <div v-if="sectionsOpen" class="ml-4 mt-1 flex flex-col gap-1">
            <button
              v-for="item in portfolioSections"
              :key="item.path"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors w-full text-left"
              @click="openSection(item.path)"
            >
              <UIcon :name="`i-mdi-${item.icon}`" />
              {{ item.name }}
            </button>
          </div>
        </div>

        <!-- Creative Tools -->
        <div class="p-3">
          <button
            class="flex items-center gap-2 w-full px-3 py-2 text-white/70 text-sm uppercase tracking-wider"
            @click="toolsOpen = !toolsOpen"
          >
            <UIcon name="i-mdi-palette" class="text-lg" />
            <span>Creative Tools</span>
            <UIcon
              :name="toolsOpen ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'"
              class="ml-auto"
            />
          </button>
          <div v-if="toolsOpen" class="ml-4 mt-1 flex flex-col gap-1">
            <button
              v-for="item in creativeTools"
              :key="item.path"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors w-full text-left"
              @click="openSection(item.path)"
            >
              <UIcon :name="`i-mdi-${item.icon}`" />
              {{ item.name }}
            </button>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Main Content -->
    <main
      class="pt-14 text-white transition-all duration-300"
      :class="showDrawer ? 'md:ml-64' : ''"
    >
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const showDrawer = ref(true)
const sectionsOpen = ref(true)
const toolsOpen = ref(false)

const portfolioSections = [
  { name: 'About', icon: 'information', path: 'configure-about' },
  { name: 'Experience', icon: 'list-box', path: 'configure-experience' },
  { name: 'Free Time Projects', icon: 'chart-ppf', path: 'configure-free-time-projects' },
  { name: 'Recommendations', icon: 'account-group', path: 'configure-recommendations' },
  { name: 'Skills', icon: 'hammer', path: 'configure-skills' },
  { name: 'Get In Touch', icon: 'card-account-mail', path: 'configure-get-in-touch' },
]

const creativeTools = [
  { name: 'Write Blog', icon: 'file-document-edit', path: 'write-blog' },
  { name: 'Write Quote', icon: 'format-quote-close', path: 'write-quote' },
  { name: 'Configure Films', icon: 'filmstrip', path: 'configure-films' },
]

const currentRouteName = computed(() => {
  const routePath = route.path.split('/')
  return portfolioSections.find(section => section.path === routePath[2])?.name
})

const openSection = (path: string) => {
  navigateTo('/admin-panel/' + path)
}

const logout = async () => {
  const { $firebaseAuth, $logOut } = useNuxtApp()
  try {
    await $logOut($firebaseAuth)
    navigateTo('/login')
  } catch (error) {
    console.error(error)
  }
}

// Hide drawer on mobile
onMounted(() => {
  if (window.innerWidth < 768) {
    showDrawer.value = false
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
