<template>
	<v-container>
		<NavBar />
		<router-view />
	</v-container>

</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
//
</script>

<style>
body {
	background-color: #6D8287;
	color: white;
}
</style>