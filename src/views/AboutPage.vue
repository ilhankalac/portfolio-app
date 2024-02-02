<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-row>
      <v-col>
        <v-sheet 
          id="section2"
          class="d-flex text-white"
          style="background-color: rgb(var(--v-theme-secondary)); "
          :class="smAndDown ? 'flex-column justify-center px-4 py-8' : 'flex-row justify-center pa-8 py-16'"
          :style="smAndDown ? '' : 'height: 50vh;'"
        >
          <div 
            class="d-flex ga-10 align-center font-weight-light "
            :class="smAndDown ? 'flex-column text-left' : ' flex-column justify-center text-justify'"
            :style="smAndDown ? 'max-width: 500px;' : 'max-width: 1000px;'"
          >
            <span 
              class="text-h4 mb-2 text-overline"
              :style="smAndDown ? 'font-size: 20px !important' : 'font-size: 30px !important'"
            >
              About me
            </span>
            <div 
              :class="smAndDown ? 'd-flex flex-column ga-5' : 'd-flex align-center ga-10'"
            >
              <div
                style="white-space: nowrap; min-width: 200px;"
              >
              <div class="d-flex flex-column align-center ga-5">
                <v-avatar size="150" variant="outlined">
                  <v-img
                    src="@/assets/profile_photo.jpg"
                    alt="avatar"
                  />
                </v-avatar>
              </div>
              </div>
              <v-divider :thickness="2" vertical/>
              <v-sheet color="secondary">
                <p>I'm a Frontend Developer with a passion for creating seamless user experiences and a keen interest in expanding my skills. </p><br>
                <p><strong>Frontend Proficiency:</strong> Advanced skills in Vue.js and TypeScript, specializing in crafting responsive and intuitive web applications.</p><br>
                <p><strong>Initial Backend Experience:</strong> I started my journey in the programming world with a focus on C# and ASP.NET Core, gaining foundational knowledge in Transact-SQL. While my backend experience is from my early career, I am actively expanding and refining my skills in frontend development. Additionally, I have hands-on experience with Firebase services, enhancing my understanding of serverless architectures and cloud-based solutions.</p><br>
                <p><strong>Mentorship and Collaboration:</strong> With a history of mentoring aspiring developers and a collaborative approach, I'm dedicated to sharing knowledge and fostering growth within the developer community.</p>
              </v-sheet>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay();
</script>