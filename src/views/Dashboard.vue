<template>
	<div class="text-white">
    <h3>Dashboard</h3>
    <v-btn block @click="logout">Logout</v-btn>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { firebaseAuth, logOut } from '@/firebase'
import router from '@/router';
let auth: any;

onMounted(() => {
  auth = firebaseAuth;
});

const logout = async () => {
  try {
    await logOut(auth).then(() => {
      router.push('/login');
    });
  } catch (error) {
    console.error(error);
  }
}
</script>