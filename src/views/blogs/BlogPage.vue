<template>
  <div class="text-white">
    <div 
      class="font-weight-light"
      :class="smAndDown ? 'text-h6' : 'text-h5'"
    >
      {{ blog.title }}
    </div>
    <div class="font-weight-light font-italic mt-1"> <span style="opacity: 0.6;">Piše</span> {{ blog.author }} <span style="opacity: 0.6;">objavljeno</span> {{ blog.date }}</div>
    <v-divider class="mb-10" />
    <div class="text-greyText" v-html="blog.html"></div>

  </div>
</template>

<script setup>
import { getVal } from '@/services/DataService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const key = ref('');
const blog = ref({});

const getBlog = () => {
  const key = router.currentRoute.value.params.id.split('key=')[1];
  console.log(key);
  getVal('blog/posts/').then((val) => {
    if (val) {
      blog.value = val[key];
    }
  });
};

onMounted(() => {
  key.value = router.currentRoute.value.params.id;
  getBlog();
});
</script>
