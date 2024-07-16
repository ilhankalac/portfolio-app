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
import Section from '@/components/landingPage/Section.vue'
import { Ref, ref } from 'vue'
import { pushVal } from '@/services/DataService'
import { useHelpers } from '@/composables/helper'

const email: Ref<string> = ref('')
const message: Ref<string> = ref('')
const snackbar: Ref<boolean> = ref(false)
const text: Ref<string> = ref('Your message has been sent!')
const emailInput = ref<HTMLInputElement | null>(null)

const { errorMessage, validateEmail, timeStamp } = useHelpers()

const validateEmailWrapper = () => validateEmail(email)

const sendEmail = () => {
  if (!!validateEmailWrapper()) {
    emailInput.value?.focus()
    return
  }

  const dataObj = {
    email: email.value,
    message: message.value,
    timeStamp: timeStamp()
  }

  pushVal('contacted', dataObj)
  snackbar.value = true

  email.value = ''
  message.value = ''
}
</script>