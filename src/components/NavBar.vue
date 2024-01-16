<template>
    <div
        class="mb-8 d-flex justify-center align-center"
        :class="smAndDown ? 'flex-column' : 'flex-row'"
        style="height: 100px;"
    >   
        <v-btn 
            :variant="clickedButton === '0' ? 'tonal' : 'text'" 
            @click="changeThePage('0', 'GuestLayout')"
        >   
            PROFESSIONAL CAREER 
        </v-btn> 
        <v-btn 
            :variant="clickedButton === '1' ? 'tonal' : 'text'" 
            @click="changeThePage('1', 'Interests')"
        >
            PERSONAL INTERESTS
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'

const { smAndDown } = useDisplay()
const clickedButton: Ref<string> = ref('0')
const router = useRouter()

const changeThePage = (buttonNumber: string, pageName: string) => {
    clickedButton.value = buttonNumber;
    router.push({ name: pageName }); 
}
</script>