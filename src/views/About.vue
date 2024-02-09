<template>
  <Section
    :class="'about-section'"
    sectionId="section2"
    header="About Me"
    :customStyle="'background: linear-gradient(rgb(var(--v-theme-secondary)), rgb(var(--v-theme-primary))); min-height: 33vh'"
  >
    <div class="font-weight-light text-justify">
      <div
        :class="smAndDown ? 'd-flex flex-column ga-5' : 'd-flex align-center ga-10'"
      >
        <div style="white-space: nowrap; min-width: 200px">
          <div class="d-flex flex-column align-center ga-5">
            <v-avatar :size="smAndDown ? 150 : 210" variant="outlined">
              <v-img src="@/assets/profile_photo.jpg" alt="avatar" />
            </v-avatar>
          </div>
        </div>
        <v-divider :thickness="2" vertical />
        <v-sheet style="background: linear-gradient(rgb(var(--v-theme-secondary))); color: white;">

          <p>
            I'm a Frontend Developer with a passion for creating seamless user
            experiences and a keen interest in expanding my skills.
          </p>
          <br />
          <p>
            <strong>Frontend Proficiency:</strong> Advanced skills in Vue.js and
            TypeScript, specializing in crafting responsive and intuitive web
            applications.
          </p>
          <br />
          <p>
            <strong>Initial Backend Experience:</strong> I started my journey in
            the programming world with a focus on C# and ASP.NET Core, gaining
            foundational knowledge in Transact-SQL. While my backend experience
            is from my early career, I am actively expanding and refining my
            skills in frontend development. Additionally, I have hands-on
            experience with Firebase services, enhancing my understanding of
            serverless architectures and cloud-based solutions.
          </p>
          <br />
          <p>
            <strong>Mentorship and Collaboration:</strong> With a history of
            mentoring aspiring developers and a collaborative approach, I'm
            dedicated to sharing knowledge and fostering growth within the
            developer community.
          </p>
        </v-sheet>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import Section from "@/components/Section.vue";
const { smAndDown } = useDisplay();
</script>
