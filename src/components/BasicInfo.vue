<template>
    <div 
        class="d-flex align-center justify-center"
        style="height: 50vh;"
    >
        <v-card 
            min-width="350"
            max-width="350"
            class="d-flex flex-column align-center justify-center"
            flat
            color="#192129"
        >
            <v-avatar
                size="200px"
            >
                <v-img
                    alt="Avatar"
                    src="https://media.licdn.com/dms/image/C4D03AQG6CeTFvdRjSA/profile-displayphoto-shrink_800_800/0/1658758059106?e=1709164800&v=beta&t=q38Ub1eSc1oIGqRBj8eDGcfuxN0n9_7_JmgjPb1ox9I"
                ></v-img>
            </v-avatar>
            <v-card-title>Ilhan Kalač</v-card-title>

            <v-card-subtitle class="pt-4">
            Frontend developer
            </v-card-subtitle>

            <v-card-text class="d-flex justify-end">
                <v-chip
                    class="ma-2"
                    append-icon="mdi-star"
                >
                    Javascript
                </v-chip>
                <v-chip
                    class="ma-2"
                    append-icon="mdi-star"
                >
                    Vue 3
                </v-chip> <br>
            </v-card-text>

            <v-card-text class="d-flex justify-end">
                <v-chip
                    class="ma-2"
                    append-icon="mdi-star"
                >
                    Vuetify
                </v-chip>
                 <v-chip
                    class="ma-2"
                    append-icon="mdi-star"
                >
                    Git version control
                </v-chip>
            </v-card-text>

            <v-card-actions>
            <v-btn>
                Download CV
            </v-btn>

            <v-btn>
                Github
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts" setup>
</script>