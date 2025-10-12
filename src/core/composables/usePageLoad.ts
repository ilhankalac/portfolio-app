import { ref, computed } from 'vue'

// Global state to track which sections have finished loading
const loadedSections = ref<Set<string>>(new Set())
const expectedSections = ref<string[]>([])
const isInitialized = ref(false)

export function usePageLoad() {
  // Initialize the expected sections list
  const initializeSections = (sections: string[]) => {
    expectedSections.value = sections
    loadedSections.value.clear()
    isInitialized.value = true
  }

  // Mark a section as loaded
  const markSectionLoaded = (sectionId: string) => {
    loadedSections.value.add(sectionId)
  }

  // Check if all sections are loaded
  const allSectionsLoaded = computed(() => {
    if (!isInitialized.value || expectedSections.value.length === 0) {
      return false
    }
    return expectedSections.value.every(section => loadedSections.value.has(section))
  })

  // Reset state (useful for navigation)
  const reset = () => {
    loadedSections.value.clear()
    isInitialized.value = false
  }

  return {
    initializeSections,
    markSectionLoaded,
    allSectionsLoaded,
    reset
  }
}
