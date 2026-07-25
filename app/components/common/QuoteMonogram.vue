<template>
  <span class="monogram" :class="[`monogram--${tone}`, `monogram--${size}`]">
    {{ initials }}
  </span>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  author?: string
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'sm' })

const { authorInitials, authorTone } = useQuotes()

const initials = computed(() => authorInitials(props.author))
const tone = computed(() => authorTone(props.author))
</script>

<style scoped lang="scss">
.monogram {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  user-select: none;

  &--sm {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.6rem;
    border-radius: 0.4rem;
  }

  &--md {
    width: 2.1rem;
    height: 2.1rem;
    font-size: 0.75rem;
  }

  &--lg {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 0.95rem;
    border-radius: 0.7rem;
  }

  &--indigo { color: #a5b4fc; background: rgba(129, 140, 248, 0.14); border-color: rgba(129, 140, 248, 0.25); }
  &--violet { color: #c4b5fd; background: rgba(167, 139, 250, 0.14); border-color: rgba(167, 139, 250, 0.25); }
  &--sky    { color: #7dd3fc; background: rgba(56, 189, 248, 0.13); border-color: rgba(56, 189, 248, 0.24); }
  &--teal   { color: #5eead4; background: rgba(45, 212, 191, 0.12); border-color: rgba(45, 212, 191, 0.22); }
  &--amber  { color: #fcd34d; background: rgba(251, 191, 36, 0.12); border-color: rgba(251, 191, 36, 0.22); }
  &--rose   { color: #fda4af; background: rgba(251, 113, 133, 0.12); border-color: rgba(251, 113, 133, 0.22); }
}
</style>
