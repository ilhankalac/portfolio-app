<template>
	<v-container 
		class="d-flex "
		:class="smAndDown ? 'flex-column' : 'flex-row justify-center align-center'"
		id="section2"
		style="min-height: 100vh; max-width: 1000px;"
	>
    <div
      v-if="!isDataLoaded"
      class="d-flex flex-column ga-3"
    >
      <v-skeleton-loader
        color="primary"
        class="mx-auto mb-10"
        type="heading"
        :min-width="smAndDown ? '100px' : '700px'"
      >

      </v-skeleton-loader>
      <v-skeleton-loader
        v-for="index in 5"
        color="primary"
        class="mx-auto border"
        type="list-item-three-line"
        :min-width="smAndDown ? '100px' : '700px'"
      />
    </div>
		<v-col
      v-else
      :style="smAndDown ? 'font-size: 12px;' : 'font-size: 15px;'"
    >
			<p 
				class="text-center text-overline pb-10" 
				style="font-size: 30px !important;"
			> 
				My Professional Developer Journey 
			</p>
			<v-timeline 
				side="end"
				line-color="secondary"
			>
        <v-timeline-item 
					v-for="experience in experiences" 
					:key="experience.id"
					dot-color="white"
					size="large"
				>
					<template
            v-slot:icon
          >
            <v-tooltip :text="`${experience.title} Web Page`">
              <template v-slot:activator="{ props }">
                <v-avatar
                  v-bind="props"
                  :image="experience.logoSrc"
                  @click="openCompanyLink(experience.company_link)"
                  style="cursor: pointer;"
                />
              </template>
          </v-tooltip>
					</template>
          <template 
            v-if="!smAndDown" 
            v-slot:opposite
          >
            {{ experience.date  }}
          </template>
          <div 
						class="timeline-item pa-2"
						:class="smAndDown ? 'text-center' : 'text-justify'"
						style="cursor: pointer;"
						@click="openDialog(experience)"
					>
          <div class="text-h6">{{ experience.title }}</div>
          <div 
            class="text-subtitle-1"
            style="opacity: 0.5"
          >
            {{ experience.position }}
          </div>
          <p>
						{{ experience.description }}
          </p>
          </div>
        </v-timeline-item>
      </v-timeline>
		</v-col>
	</v-container>
	<v-dialog 
		v-model="jobDialog"
		max-width="700"
	>
		<ExperienceCard
			:selected-item="selectedExperience"
			@close="jobDialog = false"
		/>
	</v-dialog>
</template>

<script lang="ts" setup>

import BasicInfo from "@/components/BasicInfo.vue";
import ExperienceCard from "@/components/ExperienceCard.vue";
import { IExperience } from "@/types";
import { onMounted, ref, Ref } from "vue";
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();
import {  getVal } from "@/services/DataService"


const experiences = ref([])
const jobDialog = ref(false);
const selectedExperience = ref<IExperience | null>(null);
const isDataLoaded = ref(false);

const openDialog = (experience: IExperience) => {
	jobDialog.value = true;
	selectedExperience.value = experience;
}

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      isDataLoaded.value = true;
      const key = Object.keys(fetchedData);
      experiences.value = fetchedData[key[0]].reverse()
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  })
};

const openCompanyLink = (link: string) => {
  window.open(link);
}

onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.mdi-close::before{
	color: white;
}
.timeline-item:hover {
	background-color: rgba(180, 180, 180, 0.1);
}
</style>