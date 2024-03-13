<template>
	<div class="text-white d-flex justify-center align-center" style="min-height: 100vh;">
    <div style="min-width: 500px;">
      <v-text-field 
        v-model="email"
        label="Email"
      />
      <div>
        <v-text-field 
          v-model="password"
          type="password"
          label="Password"
        />
      </div>
      <v-btn block @click="login">Login</v-btn>
    </div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { firebaseAuth, signIn } from '@/firebase';


const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
  console.log(email.value, password.value);
  try {
    await signIn(firebaseAuth, email.value, password.value).then(() => {
      router.push('/');
    });
  } catch (error) {
    console.error(error);
  }
}

</script>