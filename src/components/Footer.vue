<template>
  <div class="footer-container">
    <footer class="footer-content">
      <div class="d-flex" :class="[{'flex-column': smAndDown, 'justify-space-around': !smAndDown}]">
        <div class="footer-section">
          <div class="footer-heading text-overline text-grey-lighten-1">Useful Links</div>
          <div class="footer-links ga-2" :class="smAndDown ? 'd-flex' : 'flex-column'">
            <span v-for="link in navigationLinks" :key="link">{{ link }}</span>
          </div>
        </div>
        <div class="footer-section">
          <div class="footer-heading text-overline text-grey-lighten-1">Other interests</div>
          <div class="footer-links ga-2" :class="smAndDown ? 'd-flex' : 'flex-column'">
            <span v-for="link in otherInterestsLinks" :key="link">{{ link }}</span>
          </div>
        </div>
        <div class="footer-section">
          <div class="footer-heading text-overline text-grey-lighten-1">Social Media</div>
          <div class="footer-links ga-2" :class="smAndDown ? 'd-flex' : 'flex-column'">
            <span v-for="link in socialMediaLinks" :key="link">{{ link }}</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>
          <span>&copy; {{ new Date().getFullYear() }}</span>
          <span> • </span>
          <span>Designed and developed by me</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

const navigationLinks = ["Home", "About", "Experience", "Recommendations", "Skills", "Get in touch"];
const otherInterestsLinks = ["Blog", "Projects", "Resume"];
const socialMediaLinks = ["LinkedIn", "GitHub", "Twitter"];

</script>

<style scoped lang="scss">
.footer-container {
  background: rgb(var(--v-theme-primary));

  .footer-content {
    padding: 1rem;
    .footer-heading {
      font-size: 17px !important;
      font-weight: 800;
      margin-bottom: 1rem;
      @media screen and (max-width: 600px){
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

        span {
          cursor: pointer;
          color: grey;
          font-size: smaller;

          &:hover {
            color: #BDBDBD;
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
</style>
