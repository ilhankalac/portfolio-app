<template>
	<div class="text-white d-flex justify-center align-center" style="min-height: 100vh;">
    <div style="width: 500px;" class="ma-2">
      <div>
        <h2 class="mb-4 font-weight-light">Portfolio login</h2>
      </div>
      <v-text-field 
        v-model="email"
        variant="outlined"
        label="Email"
      />
      <div>
        <v-text-field 
          v-model="password"
          type="password"
          label="Password"
          variant="outlined"
          @keyup.enter="login"
        />
        <v-alert
          v-if="hasError"
          value="true"
          type="error"
          class="mb-4"
        >
          Your email or password is incorrect, please try again...
        </v-alert>
      </div>
      <v-btn 
        block 
        variant="outlined"
        height="50"
        :disabled="loading"
        :loading="loading"
        @click="login"
      >
        Login
      </v-btn>
    </div>
	</div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { firebaseAuth, signIn } from '@/firebase'


const router = useRouter()
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)
const hasError: Ref<boolean> = ref(false)

const login = async () => {
  loading.value = true
  try {
    await signIn(firebaseAuth, email.value, password.value).then(() => {
      router.push('/admin-panel')
    })
  } catch (error) {
    console.error(error)
    hasError.value = true
  } finally {
    loading.value = false
  }
}

</script>