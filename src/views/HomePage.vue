<template>
	<v-container 
		class="d-flex "
		:class="smAndDown ? 'flex-column' : 'flex-row justify-center'"
	>
		<BasicInfo />
		<v-col style="font-size: 15px;" :cols="smAndDown ? 12 : 6">
			<CategoryCard
				:title="'About'"
				:text="'Experienced frontend engineer with strong proficiency in JavaScript, Vue.js 2, and Vue.js 3. Throughout my career, I have honed my skills in developing interactive and dynamic web applications, leveraging these technologies to create seamless user experiences.'"
			/>
			<v-divider class="mb-4"></v-divider>

			<CategoryCard
				:title="'Experience'"
			>
				<v-expansion-panels >
					<v-expansion-panel
						:key="1"
						v-for="(experience, index) in experiences"
					>
						<v-expansion-panel-title color="#6D8287">
							<div class="d-flex align-center">
								<div>
									<div> <b>{{ experience.title }}</b> • <span style="opacity:70%">{{ experience.date }}</span></div>
								</div>
							</div>
						</v-expansion-panel-title>
						<v-expansion-panel-text style="background-color: #6D8287; color:white;">
							<div class="d-flex align-center">
								<div class="d-flex align-center">
									{{ experience.description }}   
									<v-btn
										color="#6D8287"
										class="mt-2" flat icon="mdi-open-in-new"
										@click="openDialog(experience)"
									/>
								</div>
							</div>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</CategoryCard>
			<v-divider class="mb-4"></v-divider>
			<CategoryCard
				:title="'Education'"
				:text="`Information Technology School Bachelor's degree, Computer Programming, Belgrade Serbia 2016 - 2020`"
			> 
			</CategoryCard>
		</v-col>
	</v-container>

	<v-dialog 
		v-model="jobDialog"
		max-width="700"
	>
		<v-card>
			<v-card-title style="height: 60px; background-color: #596a6e;" class="text-white d-flex justify-space-between">
				<span class="ma-2">{{ selectedExperience?.title }}</span>
				<div>
					<v-btn
						style="color:white;"
						color="#596a6e"
						flat 
						icon="mdi-close"
						@click="jobDialog = false"
					/>
				</div>
			</v-card-title>
			<v-sheet 
				class="d-flex pa-2"
				:class="smAndDown ? 'flex-column justify-center align-center' : 'flex-row'"
			>
				<div style="max-width: 200px; max-height: 150px; overflow: hidden;">
					<img style="width: 100%; height: 100%; object-fit: contain;" :src="selectedExperience.logoSrc" alt="">
				</div>
				<v-card-text>
					{{ selectedExperience?.description }}
				</v-card-text>
			</v-sheet>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
interface IExperience {
	key: number;
	title: string;
	date: string;
	description: string;
	logoSrc?: string;
}

import BasicInfo from "@/components/BasicInfo.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import { Interface } from "readline";
import { ref, Ref } from "vue";
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();

const experiences : Ref<any[]> = ref(
	[
		{
			key: 1,
			title: "Comtrade Group · Internship",
			date: "Oct 2019 - Feb 2021 · 1 yr 5 mos",
			description: "Developed an ASP.NET Core Web-Api application for a College dorm. Worked on laying entire backend groundwork based on repository pattern design using C# language. Collaborated with 6 team members (SCRUM).",
			logoSrc: 'https://itkonekt.com/media/2022/09/Comtrade_transparent.png'
		},
		{
			key: 2,
			title: "Galis · Freelance",
			date: "Apr 2018 - Oct 2018 · 7 mos",
			description: "Developed an ASP.NET Core Web-Api application for a College dorm. Worked on laying entire backend groundwork based on repository pattern design using C# language. Collaborated with 6 team members (SCRUM).",
			logoSrc: 'data:image/jpeg;base64,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'
		},
		{
			key: 3,
			title: "Codeus",
			date: "Feb 2021 - Present · " + (new Date().getFullYear() - 2021) + " yrs " + (new Date().getMonth() - 2) + " mos",
			description: "The current project I am working on as a Frontend Engineer, utilizing Vue.js 2 and Vuetify to develop a sophisticated and intuitive user interface for seamless data management and integration within the healthcare domain. Leveraging the power of Vue.js 2 and the rich UI components provided by Vuetify, I am able to create a visually appealing and user-friendly experience for healthcare providers and patients, implementing responsive design principles and optimizing the frontend architecture.",
			logoSrc: 'https://codeus.me/img/codeus_logo.png'
		}
	].reverse()
);
const jobDialog = ref(false);
const selectedExperience = ref<IExperience | null>(null);

const openDialog = (experience: IExperience) => {
	jobDialog.value = true;
	selectedExperience.value = experience;
}
</script>

<style lang="scss" scoped>
.mdi-close::before{
	color: white;
}
</style>