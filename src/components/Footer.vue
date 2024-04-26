<template>
  <div class="footer-container">
    <Section>
      <footer class="footer-content">
        <div
          class="d-flex"
          :class="[
            { 'flex-column': smAndDown, 'justify-space-between': !smAndDown },
          ]"
        >
          <div class="footer-section">
            <div
              class="footer-heading text-overline text-with-underline text-white"
            >
              Useful Links
            </div>
            <div
              class="footer-links ga-2"
              :class="smAndDown ? 'd-flex flex-wrap' : 'flex-column'"
            >
              <span v-for="link in navigationLinks" :key="link.sectionId">
                <div class="d-flex" @click="changeTheRoute(link.sectionId)">
                  <div>
                    <v-icon v-if="!smAndDown">mdi-chevron-right</v-icon>
                    {{ link.text }}
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div class="footer-section">
            <div
              class="footer-heading text-with-underline text-overline text-white"
            >
              Explore my work
            </div>
            <div
              class="footer-links ga-2"
              :class="smAndDown ? 'd-flex' : 'flex-column'"
            >
              <template v-for="link in otherInterestsLinks">
                <a v-if="link.text === 'Resume'" href="ilhan-kalac-resume.pdf" target="blank">Resume</a>
                <span
                  v-else
                  @click="openOtherInterestsLink(link.url)"
                  >
                  {{ link.text }}
                </span>
              </template>
            </div>
          </div>
          <div class="footer-section">
            <div
              class="footer-heading text-overline text-with-underline text-white"
            >
              Social Media
            </div>
            <div
              class="footer-links ga-2"
              :class="smAndDown ? 'd-flex' : 'flex-column'"
            >
              <span v-for="link in socialMediaLinks" :key="link.url">
                <div @click="openLink(link.url)" target="blank">
                  {{ link.text }}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="footer-bottom pt-5">
          <div>
            <span>&copy; {{ new Date().getFullYear() }}</span>
            <span> • </span>
            <span>Designed and developed by me</span>
          </div>
        </div>
      </footer>
    </Section>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import Section from "@/components/landingPage/Section.vue";

const navigationLinks = [
  { text: "Home", sectionId: "initial" },
  { text: "About", sectionId: "about" },
  { text: "Experience", sectionId: "experience" },
  { text: "Free time projects", sectionId: "freetime-projects" },
  { text: "Recommendations", sectionId: "recommendations" },
  { text: "Explore", sectionId: "explore" },
];
// const otherInterestsLinks = ["Blog", "Projects", "Resume"]

const otherInterestsLinks = [
  {
    text: "Blog",
    url: "blogs/list",
  },
  // {
  //   text: "Projects",
  //   url: "#freetime-projects",
  // },
  {
    text: "Resume",
    url: "ilhan-kalac-resume.pdf",
  },
];
const socialMediaLinks = [
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/ilhankalac/",
  },
  {
    text: "GitHub",
    url: "https://github.com/ilhankalac",
  },
  {
    text: "Twitter",
    url: "https://twitter.com/privatizova",
  },
  {
    text: 'Instagram',
    url: 'https://www.instagram.com/vizija/',
  }
];

const changeTheRoute = (sectionId: string = "") => {
  if (sectionId === "initial") {
    router.push({ path: "/" });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }
  router.push({ hash: "#" + sectionId });
};

const openLink = (link: string) => {
  window.open(link, "_blank");
};

const openOtherInterestsLink = (path: string) => {
  if (path.includes("#")) {
    changeTheRoute(path.split("#")[1])
    return
  }
  router.push({ path });
};
</script>

<style scoped lang="scss">
.footer-container {
  background: rgb(var(--v-theme-primary));

  .footer-content {
    .footer-heading {
      font-size: 17px !important;
      font-weight: 300;
      margin-bottom: 1rem;

      @media screen and (max-width: 600px) {
        font-size: 12px !important;
      }
    }
    .flex-column {
      gap: 1rem;
    }

    .footer-section {
      text-overline {
        font-size: 16px !important;
      }

      .footer-links {
        display: flex;
        gap: 5px;

        span, a {
          text-decoration: none;
          cursor: pointer;
          color: rgb(var(--v-theme-greyText));
          font-size: smaller;

          &:hover {
            color: #bdbdbd;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .footer-bottom {
    background: rgb(var(--v-theme-primary));
    color: white;
    text-align: center;
    font-size: smaller;
  }
}

.text-with-underline {
  position: relative;
  display: inline-block;
}

.text-with-underline::after {
  content: "";
  position: absolute;
  right: 10%;
  bottom: -2px;
  width: 60%;
  height: 1px;
  background-color: #eeeeee;
  transform: translateX(-50%);
}
</style>
