<template>
  <div class="min-h-screen p-4" style="background-color: rgb(var(--color-primary));">
    <CreateRealtimeData />
  </div>
</template>

<script setup lang="ts">
import CreateRealtimeData from '~/components/common/CreateRealtimeData.vue'

definePageMeta({ middleware: 'auth' })
</script>
