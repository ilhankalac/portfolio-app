<template>
  <div class="min-h-screen bg-white">
    <BaseNavigation origin="configure" />

    <!-- Header Image -->
    <div class="w-full h-[200px]">
      <img
        src="https://i.ibb.co/28dkxvJ/2023-05-24-07-36-IMG-9646.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Tabs -->
    <div class="bg-gray-100">
      <div class="max-w-3xl mx-auto">
        <!-- Desktop Tabs -->
        <div class="hidden md:flex">
          <UTabs
            :items="tabs"
            :default-value="activeTab"
            @update:model-value="onTabChange"
          />
        </div>

        <!-- Mobile Dropdown -->
        <div class="md:hidden p-4">
          <UDropdownMenu :items="mobileMenuItems">
            <UButton
              variant="ghost"
              class="text-black w-full justify-between"
              trailing-icon="i-mdi-chevron-down"
            >
              <UIcon :name="activeTabIcon" class="text-black" />
              {{ activeTabLabel }}
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-3xl mx-auto px-4 py-6" style="min-height: 70vh;">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseNavigation from '~/components/base/BaseNavigation.vue'

const router = useRouter()

const tabConfig = [
  { label: 'Blog', value: 'one', path: '/blogs/list', icon: 'i-mdi-post' },
  { label: 'Films', value: 'three', path: '/list-of-seen-films', icon: 'i-mdi-filmstrip' },
  { label: 'Favorite Quotes', value: 'two', path: '/favorite-quotes', icon: 'i-mdi-format-quote-close' },
]

const tabs = tabConfig.map(t => ({ label: t.label, value: t.value }))

const activeTab = ref('one')

const activeTabIcon = computed(() => tabConfig.find(t => t.value === activeTab.value)?.icon || 'i-mdi-post')
const activeTabLabel = computed(() => tabConfig.find(t => t.value === activeTab.value)?.label || 'Blog')

const mobileMenuItems = computed(() => [
  tabConfig.map(t => ({
    label: t.label,
    icon: t.icon,
    click: () => openRoute(t.path),
  }))
])

const openRoute = (path: string) => {
  activeTab.value = tabConfig.find(t => t.path === path)?.value || 'one'
  navigateTo(path)
}

const onTabChange = (value: string | number) => {
  const tab = tabConfig.find(t => t.value === value)
  if (tab) {
    navigateTo(tab.path)
  }
}

onMounted(() => {
  const currentPath = '/' + router.currentRoute.value.path.split('/')[1]
  const matchedTab = tabConfig.find(t => t.path === currentPath)
  if (matchedTab) {
    activeTab.value = matchedTab.value
  }
})
</script>
