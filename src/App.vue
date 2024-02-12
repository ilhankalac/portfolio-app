<template>
	<router-view />
</template>

<script lang="ts" setup>
</script>

<style>
:root {
  height: 100%;
}
body {
	background-color: rgba(var(--v-theme-secondary));
  font-size: 1rem !important;
  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.95rem !important;
  }
}
</style>