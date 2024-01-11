
<template>
	<v-col>
		<div class="d-flex align-center">  
			<v-row class="mb-2 d-flex flex-column">
                <h2>{{ title }}</h2>
                <div v-if="text">
                    {{ text }}
                </div>
                <slot v-else></slot>
			</v-row>
		</div>
	</v-col>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string
  text?: string
}>()
</script>


<style scoped>
.v-responsive {
	border: 1px solid white;
}

</style>