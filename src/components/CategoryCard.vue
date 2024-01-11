
<template>
	<v-col>
		<div class="d-flex align-center">  
			<v-row class="mb-2">
				<v-responsive class="border pa-4" content-class="white">
                    <h2>{{ title }}</h2>
                    <div v-if="text">
                        {{ text }}
                    </div>
                    <slot v-else></slot>
				</v-responsive>
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
