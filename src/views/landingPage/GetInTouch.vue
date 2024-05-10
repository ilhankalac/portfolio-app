<template>
  <Section
    class="get-in-section"
    :header="'Get in Touch'"
    :customStyle="'background: rgb(var(--v-theme-primary)); min-height: 33vh'"
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
        bg-color="primary"
        @blur="validateEmail"
      /> <br>

      <v-textarea
        v-model="message"
        label="Your Message"
        color="white"
        variant="outlined"
        bg-color="primary"
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
import Section from "@/components/landingPage/Section.vue"
import { ref } from "vue"
import { pushVal } from "@/services/DataService"

const email = ref("")
const message = ref("")
const snackbar = ref(false)
const text = ref("Your message has been sent!")
const errorMessage = ref("")
const emailInput = ref<HTMLInputElement | null>(null)

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return errorMessage.value = !emailRegex.test(email.value) ? "Please enter a valid email" : ""
}

const timeStamp = () => {
  const currentDate = new Date()
  const day = currentDate.getDate().toString().padStart(2, '0') 
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getFullYear()
  const hours = currentDate.getHours().toString().padStart(2, '0') 
  const minutes = currentDate.getMinutes().toString().padStart(2, '0') 
  const timestamp = `${day}.${month}.${year}. ${hours}:${minutes}`
  return timestamp
}

const sendEmail = () => {

  if (!!validateEmail()) {
    emailInput.value?.focus()
    return
  }

  const dataObj = {
    email: email.value,
    message: message.value,
    timeStamp: timeStamp()
  }

  pushVal("contacted", dataObj)
  snackbar.value = true

  email.value = ""
  message.value = ""
}
</script>
