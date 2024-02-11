<template>
  <Section
    :sectionId="'section4'"
    :class="'recommendations-section'"
    header="Recommendations"
    :textColor="'white'"
  >
  <div
    v-for="recommendation in recommendations"
    class="text-justify font-weight-light text-white" 
  >
    <span class="text-h2">&#x201F;</span> 
    <p :class="smAndDown ? '': ''">{{ recommendation.text }}</p>
    <v-card-actions>
      <v-avatar size="60">
        <v-img :src="recommendation.avatarSrc" alt="avatar" />
      </v-avatar>
      <v-card-title class="d-flex text-overline font-weight-light" :class="smAndDown ? 'flex-column' : ''"> 
        <span> {{ recommendation.fullName }} </span> {{ smAndDown ? "" : " - " }}
        <span style="opacity: 0.7">{{ recommendation.role }}</span>
      </v-card-title> 
    </v-card-actions>
    <v-divider /><br>
  </div>
  </Section>
</template>

<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/Section.vue";
import { computed, Ref, ref } from "vue";
const { smAndDown } = useDisplay();

const recommendations: Ref<IColleagueInfo[]> = ref([{
  id: 1,
  text: "Ilhan is a standout talent in frontend development, with a deep understanding of Vue.js and TypeScript. His ability to craft intuitive and responsive web applications sets him apart as a top-tier engineer in our field. Beyond his technical expertise, Ilhan's approachable nature and collaborative spirit make him a joy to work with. He brings creativity and innovation to every project, making him an invaluable asset to any frontend team.",
  fullName: "Omar Đečević",
  role: "Backend Developer",
  avatarSrc: "https://scontent.ftgd4-1.fna.fbcdn.net/v/t1.18169-9/13256525_10201679964757137_2384082117543394068_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7a1959&_nc_ohc=noAtQ0RD6hAAX96hJY8&_nc_ht=scontent.ftgd4-1.fna&oh=00_AfCLmGp9XcTkb1M7xQjDXOZHH21thKyWD8p5IA3g5hslgQ&oe=65F09633"
},
  {
  id: 2,
  text: "It is my pleasure to write this recommendation for my colleague, Ilhan, with whom I had the opportunity to collaborate on different projects during our studies. His professional approach, creativity, devotion and ability to quickly identify and resolve problems made him an indispensable member of our team. Ilhan’s ability to analyze complex issues in detail and propose effective solutions, sets him apart as a top software engineer. With over three years of proven professional experience, I highly recommend Ilhan as a software engineer for projects that require a high level of professionalism, expertise and commitment. I am confident that he will bring new value and contribute to the organization and development team he joins.",
  fullName: "Andreja Bićanin",
  role: "Frontend Developer",
  avatarSrc: "https://media.licdn.com/dms/image/D4D03AQGqJNmudz5Czw/profile-displayphoto-shrink_800_800/0/1678096006944?e=1713398400&v=beta&t=Ok29QXvkcy7AKWWoaWQrj56NDKSCrojKfRLU3x5U6oU"
  },
])
</script>

<style lang="scss" scoped>
.recommendations-section {
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 50%;
}

@keyframes fade {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
</style>
