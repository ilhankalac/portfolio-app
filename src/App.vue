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
	background-color: rgba(var(--v-theme-primary));
  font-size: 1rem !important;
  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.9rem !important;
  }
}

ul, ol {
  list-style: revert !important;
}

ul {
  list-style-type: disc !important;
}

ol {
  list-style-type: decimal !important;
}

li {
  display: list-item !important;
}
</style>