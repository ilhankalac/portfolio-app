<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon">
          <UIcon name="i-mdi-lock-outline" />
        </div>
        <h2 class="login-title">Admin Login</h2>
        <p class="login-subtitle">Sign in to manage your portfolio</p>
      </div>

      <div class="login-form">
        <div class="field">
          <label class="field-label">Email</label>
          <UInput
            v-model="email"
            placeholder="your@email.com"
            size="lg"
            class="w-full"
          />
        </div>
        <div class="field">
          <label class="field-label">Password</label>
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter password"
            size="lg"
            class="w-full"
            @keyup.enter="login"
          />
        </div>

        <div v-if="hasError" class="error-msg">
          Incorrect email or password. Please try again.
        </div>

        <UButton
          block
          color="primary"
          size="lg"
          :disabled="loading"
          :loading="loading"
          class="login-btn"
          @click="login"
        >
          Sign In
        </UButton>
      </div>
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
  hasError.value = false
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

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  padding: 2.5rem 2rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba(129, 140, 248, 0.12);
  color: #818cf8;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.login-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.login-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0.35rem 0 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.01em;
}

.error-msg {
  padding: 0.6rem 0.85rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.5rem;
  color: #f87171;
  font-size: 0.8rem;
}

.login-btn {
  margin-top: 0.25rem;
}
</style>
