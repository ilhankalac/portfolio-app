<template>
	<router-view />
</template>

<script lang="ts" setup>
</script>

<style>
body {
	background-color: rgb(var(--v-theme-primary));
	color: white;

  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
}
</style>