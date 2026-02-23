<template>
  <div class="text-white flex justify-center items-center min-h-screen" style="background-color: rgb(var(--color-primary-rgb));">
    <div class="w-full max-w-md mx-2">
      <h2 class="mb-4 font-light text-2xl">Portfolio login</h2>
      <UInput
        v-model="email"
        placeholder="Email"
        size="lg"
        class="mb-4"
      />
      <UInput
        v-model="password"
        type="password"
        placeholder="Password"
        size="lg"
        class="mb-4"
        @keyup.enter="login"
      />
      <div v-if="hasError" class="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
        Your email or password is incorrect, please try again...
      </div>
      <UButton
        block
        variant="outline"
        color="neutral"
        size="lg"
        :disabled="loading"
        :loading="loading"
        @click="login"
      >
        Login
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $firebaseAuth, $signIn } = useNuxtApp()

const email = ref('')
const password = ref('')
const loading = ref(false)
const hasError = ref(false)

const login = async () => {
  loading.value = true
  try {
    await $signIn($firebaseAuth, email.value, password.value)
    navigateTo('/admin-panel')
  } catch (error) {
    console.error(error)
    hasError.value = true
  } finally {
    loading.value = false
  }
}
</script>
