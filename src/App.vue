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
	background-color: rgb(var(--v-theme-primary));
	color: white;

  position: relative;
  overflow-x: hidden;
  height: 100%;

  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
}
</style>