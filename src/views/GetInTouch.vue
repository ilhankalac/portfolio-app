<template>
  <Section
    class="get-in-section"
    :header="'Get in Touch'"
    :customStyle="'background: rgb(var(--v-theme-secondary)); min-height: 33vh'"
    :sectionId="'get-in-touch'"
    :textColor="'white'"
    :colsNumber="12"
  >
    <div class="my-8">
      <v-text-field
        ref="emailInput"
        v-model="email"
        :error-messages="errorMessage"
        label="Your Email"
        color="white"
        variant="outlined"
        bg-color="secondary"
        @blur="validateEmail"
      /> <br>

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

      <v-snackbar
        v-model="snackbar"
        color="primary"
        rounded="pill"
        location="right top"
        min-width="360"
        min-height="60"
      >
          {{ text }}
        </v-snackbar>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/Section.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { pushVal } from "@/services/DataService"

const email = ref("");
const message = ref("");
const snackbar = ref(false);
const text = ref("Your message has been sent!");
const errorMessage = ref("");
const emailInput = ref<HTMLInputElement | null>(null);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return errorMessage.value = !emailRegex.test(email.value) ? "Please enter a valid email" : "";
};

const sendEmail = () => {

  if (!!validateEmail()) {
    emailInput.value?.focus();
    return;
  }

  const dataObj = {
    email: email.value,
    message: message.value
  };

  pushVal("contacted", dataObj);
  snackbar.value = true;

  email.value = "";
  message.value = "";
};
</script>
