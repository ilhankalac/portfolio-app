<template>
  <SectionWrapper
    class="get-in-section"
    label="Let's connect"
    header="Get in Touch"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
    textColor="white"
    sectionId="get-in-touch"
  >
    <div class="max-w-lg mx-auto my-8">
      <UInput
        ref="emailInput"
        v-model="email"
        placeholder="Your Email"
        variant="outline"
        size="lg"
        class="mb-4"
        :color="errorMessage ? 'error' : undefined"
      />
      <p v-if="errorMessage" class="text-red-400 text-sm mb-2">{{ errorMessage }}</p>

      <UTextarea
        v-model="message"
        placeholder="Your Message"
        variant="outline"
        size="lg"
        :rows="5"
        class="mb-4"
      />

      <UButton
        class="mt-2 w-full"
        variant="outline"
        size="lg"
        color="neutral"
        @click="sendEmail"
      >
        Send Message
      </UButton>
    </div>
  </SectionWrapper>
</template>

<script lang="ts" setup>
import SectionWrapper from '~/components/portfolio/SectionWrapper.vue'

const { pushVal } = useFirebase()
const { errorMessage, validateEmail, timeStamp } = useHelpers()
const toast = useToast()

const email = ref('')
const message = ref('')
const emailInput = ref(null)

const sendEmail = () => {
  if (!!validateEmail(email)) {
    return
  }

  const dataObj = {
    email: email.value,
    message: message.value,
    timeStamp: timeStamp()
  }

  pushVal('contacted', dataObj)
  toast.add({ title: 'Your message has been sent!', color: 'success' })

  email.value = ''
  message.value = ''
}
</script>
