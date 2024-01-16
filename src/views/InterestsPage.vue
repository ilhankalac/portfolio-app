<template>
    <v-container 
		class="d-flex "
		:class="smAndDown ? 'flex-column' : 'flex-row justify-center'"
	>
		<v-col style="font-size: 15px;" :cols="smAndDown ? 12 : 6">
            <div>Hello from interests</div>
        </v-col>
    </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();
</script>