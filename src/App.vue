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
	color: white;
  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
}
</style>