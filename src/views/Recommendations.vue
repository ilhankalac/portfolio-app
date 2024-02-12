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
      <blockquote class="otro-blockquote font-weight-light" :style="smAndDown ? 'padding:1.2em 30px 1.2em 38px;' : 'padding:1.2em 30px 1.2em 75px;'">
        <div v-html="recommendation.text"></div>
        <div class="d-flex justify-space-between align-center">
          <div class="pa-0 mt-5 d-flex align-center">
            <v-avatar size="60" color="white">
              <v-img :src="recommendation.avatarSrc" alt="avatar" />
            </v-avatar>
            <div class="d-flex flex-column ml-3">
              <div>{{ recommendation.fullName }}</div>
              <div style="opacity: 0.5">{{ recommendation.role }}</div>
            </div>
          </div>
          <div class="d-flex ga-1 mt-3">
            <v-btn
              flat
              variant="text"
              icon="mdi-github"
              @click="openLink(recommendation.githubLink)"
            />
            <v-btn
              flat
              variant="text"
              icon="mdi-linkedin"
              @click="openLink(recommendation.linkedinLink)"
            />
          </div>
        </div>
      </blockquote>
    </div>
  </Section>
</template>



<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { useDisplay } from "vuetify";
import Section from "@/components/Section.vue";
import { computed, Ref, ref } from "vue";
const { smAndDown } = useDisplay();

const recommendations: Ref<IColleagueInfo[]> = ref([
  {
    id: 1,
    text: "<blockquote>It is my pleasure to write this recommendation for my colleague, Ilhan, with whom I had the opportunity to collaborate on different projects during our studies.</blockquote><br> <blockquote> His professional approach, creativity, devotion and ability to quickly identify and resolve problems made him an indispensable member of our team. Ilhan’s ability to analyze complex issues in detail and propose effective solutions, sets him apart as a top software engineer. </blockquote><br> With over three years of proven professional experience, I highly recommend Ilhan as a software engineer for projects that require a high level of professionalism, expertise and commitment. I am confident that he will bring new value and contribute to the organization and development team he joins.",
    fullName: "Andreja Bićanin",
    role: "Frontend Developer",
    avatarSrc: "https://media.licdn.com/dms/image/D4D03AQGqJNmudz5Czw/profile-displayphoto-shrink_800_800/0/1678096006944?e=1713398400&v=beta&t=Ok29QXvkcy7AKWWoaWQrj56NDKSCrojKfRLU3x5U6oU",
    githubLink: 'https://github.com/Andreja98',
    linkedinLink: 'https://www.linkedin.com/in/andreja-bi%C4%87anin-8a387b196/'
  },
  {
    id: 2,
    text: "<blockquote>Ilhan is a standout talent in frontend development, with a deep understanding of Vue.js and TypeScript. </blockquote> <blockquote> His ability to craft intuitive and responsive web applications sets him apart as a top-tier engineer in our field. </blockquote> <br> Beyond his technical expertise, Ilhan's approachable nature and collaborative spirit make him a joy to work with. He brings creativity and innovation to every project, making him an invaluable asset to any frontend team.",
    fullName: "Omar Đečević",
    role: "Backend Developer",
    avatarSrc: "https://scontent.ftgd4-1.fna.fbcdn.net/v/t1.18169-9/13256525_10201679964757137_2384082117543394068_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7a1959&_nc_ohc=noAtQ0RD6hAAX96hJY8&_nc_ht=scontent.ftgd4-1.fna&oh=00_AfCLmGp9XcTkb1M7xQjDXOZHH21thKyWD8p5IA3g5hslgQ&oe=65F09633",
    githubLink: 'https://github.com/drahil',
    linkedinLink: 'https://www.linkedin.com/in/omar-%C4%91e%C4%8Devi%C4%87-6a72881ab/'
  },
])


const openLink = (link: string) => {
  window.open(link);
};

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


// @import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic);


.otro-blockquote span{
  display:block;
  color:white;
  font-style: italic;
  font-weight: bold;
  margin-top:1em;
}


.otro-blockquote::before{
  font-family:Arial;
  content: "\201C";
  color:white;
  font-size:4em;
  position: absolute;
  left: 10px;
  top:-10px;
}

.otro-blockquote{
  margin:50px auto;
  color: white;
  border-left:4px solid white ;
  line-height:1.6;
  position: relative;
  background: rgb(var(--v-theme-primary));
}
</style>
