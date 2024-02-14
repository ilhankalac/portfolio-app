<template>
  <Section
    class="skills-section"
    :header="'Get in Touch'"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
    :sectionId="'section5'"
    :textColor="'white'"
    :colsNumber="12"
  >
    <div class="my-8">
      <v-text-field
        v-model="email"
        label="Your Email"
        color="white"
        variant="outlined"
        bg-color="secondary"
      />
  
      <v-textarea
        v-model="message"
        label="Your Message"
        color="white"
        variant="outlined"
        bg-color="secondary"
      />
  
      <v-btn
        class="mt-5"
        block
        color="white"
        variant="outlined"
        @click="sendEmail"
      >
        Send
      </v-btn>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/Section.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";
const { smAndDown } = useDisplay();

const email = ref("");
const message = ref("");

const sendEmail = () => {
  console.log("Email: ", email.value);
  console.log("Message: ", message.value);

  email.value = "";
  message.value = "";
};

</script>
