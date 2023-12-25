
<template>
	<v-col>
		<div class="d-flex align-center">  
			<div>
				<v-responsive class="border pa-4">
                    <h2>{{ title }}</h2>
                    <div v-if="text">
                        {{ text }}
                    </div>
                    <slot v-else></slot>
				</v-responsive>
			</div>
		</div>
	</v-col>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string
  text?: string
}>()
</script>
