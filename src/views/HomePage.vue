<template>
	<v-container 
		class="d-flex"
		:class="smAndDown ? 'flex-column' : 'flex-row'"
	>
		<BasicInfo />
		<v-col style="font-size: 15px;">
			<CategoryCard
				:title="'About'"
				:text="'Experienced frontend engineer with strong proficiency in JavaScript, Vue.js 2, and Vue.js 3. Throughout my career, I have honed my skills in developing interactive and dynamic web applications, leveraging these technologies to create seamless user experiences.'"
			/>
			<CategoryCard
				:title="'Experience'"
			>
				<v-sheet 
					v-for="(experience, index) in experiences" 
					:key="experience.key"
				>
					<div class="py-2">
						<div> <b>{{ experience.title }}</b> • <span style="opacity:60%">{{ experience.date }}</span></div>
						<div>
							- {{ experience.description }}
						</div>
					</div>
					<v-divider v-if="experiences.length - 1 !== index"></v-divider>
				</v-sheet>
			</CategoryCard>
		</v-col>
	</v-container>
</template>

<script lang="ts" setup>
import BasicInfo from "@/components/BasicInfo.vue";
import CategoryCard from "@/components/CategoryCard.vue";
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
		},
		{
			key: 2,
			title: "Galis · Freelance",
			date: "Apr 2018 - Oct 2018 · 7 mos",
			description: "Developed an ASP.NET Core Web-Api application for a College dorm. Worked on laying entire backend groundwork based on repository pattern design using C# language. Collaborated with 6 team members (SCRUM).",
		},
		{
			key: 3,
			title: "Codeus",
			date: "Feb 2021 - Present · " + (new Date().getFullYear() - 2021) + " yrs " + (new Date().getMonth() - 2) + " mos",
			description: "The current project I am working on as a Frontend Engineer, utilizing Vue.js 2 and Vuetify to develop a sophisticated and intuitive user interface for seamless data management and integration within the healthcare domain. Leveraging the power of Vue.js 2 and the rich UI components provided by Vuetify, I am able to create a visually appealing and user-friendly experience for healthcare providers and patients, implementing responsive design principles and optimizing the frontend architecture."
		}
	].reverse()
);
</script>
