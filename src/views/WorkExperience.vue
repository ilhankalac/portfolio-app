<template>
	<v-container 
		class="d-flex "
		:class="smAndDown ? 'flex-column' : 'flex-row justify-center align-center'"
		id="section2"
		style="min-height: 100vh; max-width: 1000px;"
	>
		<v-col :style="smAndDown ? 'font-size: 12px;' : 'font-size: 15px;'">
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
					<template v-slot:icon>
						<v-avatar :image="experience.logoSrc"></v-avatar>
					</template>
            <template v-slot:opposite>
              {{ experience.date  }}
            </template>
          <div 
						class="timeline-item pa-2"
						:class="smAndDown ? 'text-center' : 'text-justify'"
						style="cursor: pointer;"
						@click="openDialog(experience)"
					>
          <div class="text-h6">{{ experience.title }}</div>
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

const openDialog = (experience: IExperience) => {
	jobDialog.value = true;
	selectedExperience.value = experience;
}

const getData = async () => {
  await getVal("working-experience").then((fetchedData) => {
    if (fetchedData) {
      const key = Object.keys(fetchedData);
      experiences.value = fetchedData[key[0]];
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error("Error fetching data from Firebase.");
    }
  })
};

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