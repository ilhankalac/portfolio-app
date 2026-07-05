<template>
  <div class="p-6">
    <h2 class="text-2xl font-light text-white">Welcome to the Admin Panel</h2>
    <p class="text-white/60 mt-2">Select a section from the sidebar to begin editing.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'admin' })
</script>
