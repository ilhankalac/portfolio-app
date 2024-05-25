<template> 
  <v-card color="primary pa-4">
    <v-container v-if="!isStatsDataLoaded" fluid>
      <v-row>
        <v-col class="d-flex flex-column ga-3">
          <v-skeleton-loader v-for="index in 2" color="primary" type="article" />
        </v-col>
      </v-row>
    </v-container>
    <template v-else>
      <div class="font-weight-light text-white text-h6">
        Basic stats
      </div>
      <div class="d-flex justify-space-between mt-4 text-overline">
        <span style="opacity: 0.6" class="font-weight-light"> <v-icon>mdi-film</v-icon> Total film seen  </span> <span>{{ filmStatsData?.totalFilms }}</span>
      </div> 
      <v-divider />
      <div class="d-flex justify-space-between text-overline mt-4">
        <span style="opacity: 0.6" class="font-weight-light"> <v-icon>mdi-clock</v-icon> Total watch time  </span> <span>{{ filmStatsData?.totalWatchTime }}</span>
      </div> 
      <v-divider />
      <div class="d-flex justify-space-between text-overline mt-4">
        <span style="opacity: 0.6" class="font-weight-light"> <v-icon>mdi-calendar</v-icon> Average year  </span> <span>{{ filmStatsData?.averageFilmYear }}</span>
      </div> 
      <v-divider />
      <div class="d-flex justify-space-between text-overline mt-4">
        <span style="opacity: 0.6" class="font-weight-light"> <v-icon>mdi-star</v-icon> Average rating  </span> <span>{{ filmStatsData?.averageRating }}</span>
      </div> 
      <v-divider />
  
      <div>
        <div class="font-weight-light text-white text-h6 mt-4">
          Count of seen films by directors
        </div>
        <div style="max-height: 200px; overflow-y: auto" class="pr-2">
          <template v-for="(director, index) in filmStatsData?.directorStats">
            <div class="d-flex justify-space-between text-overline">
              <span style="opacity: 0.6" class="font-weight-light">{{ `${index + 1}. ${director?.name}` }} </span> <span>{{ director?.count }}</span>
            </div> 
          </template>
        </div>
      </div>
    </template>
    <v-card-actions class="pa-0 mt-2">
      <v-btn variant="outlined" block @click="emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  filmStatsData: any
  isStatsDataLoaded: Boolean
}>()
const emit = defineEmits(['close'])
</script>