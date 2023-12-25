<template>
    <v-container fill-height="100%">
        <v-row>
            <div style="height: 200px;">

            </div>
        </v-row>
        <v-row justify="center" fill-height>
            <v-col cols="4">
                <HomePage />
            </v-col>
            <v-col>
                <div
                    class="d-flex align-center"
                >
                    <v-responsive class="border pa-4">
                        Experienced frontend engineer with strong proficiency in JavaScript, Vue.js 2, and Vue.js 3. Throughout my career, I have honed my skills in developing interactive and dynamic web applications, leveraging these technologies to create seamless user experiences.
                    </v-responsive>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script lang="ts" setup>
import HomePage from '@/views/HomePage.vue';
</script>