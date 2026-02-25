<template>
  <SectionWrapper
    class="get-in-section"
    label="Let's connect"
    header="Get in Touch"
    :customStyle="`background: rgb(var(--color-primary-rgb));`"
    textColor="white"
    sectionId="get-in-touch"
  >
    <div class="contact-form">
      <p class="contact-desc">Have a question or want to work together? Drop me a message.</p>
      <UInput
        ref="emailInput"
        v-model="email"
        placeholder="Your Email"
        variant="outline"
        size="md"
        class="mb-3"
        :color="errorMessage ? 'error' : undefined"
      />
      <p v-if="errorMessage" class="text-red-400 text-[0.75rem] mb-2">{{ errorMessage }}</p>

      <UTextarea
        v-model="message"
        placeholder="Your Message"
        variant="outline"
        size="md"
        :rows="4"
        class="mb-3"
      />

      <UButton
        variant="outline"
        size="md"
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

<style scoped lang="scss">
.contact-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.contact-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
</style>
