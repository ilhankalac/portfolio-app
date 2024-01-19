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
			:selectedExperience="selectedExperience"
			@close="jobDialog = false"
		/>
	</v-dialog>
</template>

<script lang="ts" setup>

interface IExperience {
	id: number;
	title?: string;
	date?: string;
	description?: string;
	logoSrc?: string;
	projects: any
}

import BasicInfo from "@/components/BasicInfo.vue";
import ExperienceCard from "@/components/ExperienceCard.vue";
import { ref, Ref } from "vue";
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();

const experiences : Ref<any[]> = ref(
	[
		{
			key: 1,
			title: "Comtrade · Internship",
			date: "Oct 2019 - Feb 2021 · 1 yr 5 mos",
			description: "Comtrade is a dynamic and well-established group of technology companies, with a 30-year track record of innovation and steady development. Founded as a software engineering and services company, today it stands at the forefront of the industry in Southeast Europe, offering high quality vendor and proprietary software solutions, as well as outstanding system integration services to improve digital transformation across industries.",
			logoSrc: 'https://itkonekt.com/media/2022/09/Comtrade_transparent.png',
			position: "Backend Engineer",
			projects: [
				{
					name: "Comtrade Digital Services",
					description: "Comtrade Digital Services is a provider of strategic software engineering services and solutions. We help companies across different industries reinvent their business models using innovative technology so they can succesfully address business challenges, embrace digital transformation and become industry leaders in their domains.",
					startDate: "Oct 2019",
					endDate: "Feb 2021",
				},
				{
					name: "Comtrade Digital Services",
					description: "Comtrade Digital Services is a provider of strategic software engineering services and solutions. We help companies across different industries reinvent their business models using innovative technology so they can succesfully address business challenges, embrace digital transformation and become industry leaders in their domains.",
					startDate: "Oct 2019",
					endDate: "Feb 2021",
				}
			]
		},
		{
			key: 2,
			title: "Galilei · Freelance",
			date: "Apr 2018 - Oct 2018 · 7 mos",
			description: "Established in 1993 in Belgrade, Serbia, has been a key player in various information technology domains. Over the last 21 years, the primary focus has been on designing and developing web applications, particularly specialized school management software. Founded by Nebojša Obradović, a software engineer, the company collaborates with top experts from diverse IT fields.",
			logoSrc: 'https://galilej.com/wp-content/uploads/2022/08/galilei-en-300x87-1-200x58.png',
			position: "Frontend Engineer",
			projects: [
				{
					name: "Musical instruments WEB application",
					description: "Galis is a web application that allows users to create and manage their own personal galleries. Users can upload images, create albums, and share their galleries with other users. The application is built using ASP.NET Core 2.1 and Angular 6. The frontend is built using Angular 6 and Bootstrap 4. The backend is built using ASP.NET Core 2.1 and Entity Framework Core 2.1. The application is hosted on Microsoft Azure.",
					startDate: "Apr 2018",
					endDate: "Oct 2018",
					technologies: ["TypeScript", "Angular 8", "Angular Material", "HTML", "CSS",  "Git", "Linux", "ASP.NET Core 2.1", "Firebase"]
				}, 
			]
		},
		{
			key: 3,
			title: "Codeus",
			date: "Feb 2021 - Present · " + (new Date().getFullYear() - 2021) + " yrs ·" + (new Date().getMonth() > 0 ? new Date().getMonth() : '	') + " mos",
			description: "Company for crafting elegant web and mobile solutions. From app development to system design, we bring ideas to life. Specializing in efficient backend solutions and offering expert consultancy, we ensure your projects thrive. Transform concepts into reality with Codeus.",
			logoSrc: 'https://codeus.me/img/codeus_logo.png',
			position: "Frontend Engineer",
			projects: [
				{
					name: "Seqster",
					description: "Seqster is a US-based company that provides a platform for individuals, researchers, and healthcare providers to aggregate, manage, and share their health data securely.",
					startDate: "Jan 2023",
					endDate: "Present",
					technologies: ["JavaScript", "Vue.js 2 and 3", "Vuetify", "TypeScript", "HTML", "CSS",  "Git", "Linux"]
				},
				{
					name: "Aria and Allegra",
					description: "POS software solution that streamlines operations, enhances communication, provides real-time insights and improves overall customer experiences for independent restaurants, bars, and pubs.",
					startDate: "Feb 2021",
					endDate: "Present",
					technologies: ["JavaScript", "Vue.js 2", "Vuetify", "TypeScript", "HTML", "CSS",  "Git", "Linux"]
				},
				
			]
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
.timeline-item:hover {
	background-color: rgba(180, 180, 180, 0.1);
}
</style>