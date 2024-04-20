<template>
  <h3>Hi from page {{ key }}</h3>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const key = ref('');

onMounted(() => {
  key.value = router.currentRoute.value.params.id;
});
</script>
