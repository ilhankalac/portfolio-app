<template>
  <div class="text-white">
    <v-container v-if="!isDataLoaded">
      <v-row class="d-flex flex-column ga-3">
        <v-col>
          <v-skeleton-loader
            color="primary"
            class="mx-auto mb-10"
            type="heading"
            :min-width="smAndDown ? '100px' : '700px'"
          >
          </v-skeleton-loader>
          <v-skeleton-loader
            color="primary"
            class="mx-auto border"
            type="article"
            :min-width="smAndDown ? '100px' : '700px'"
          />
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <div class="font-weight-light" :class="smAndDown ? 'text-h6' : 'text-h5'">
        {{ blog.title }}
      </div>
      <div class="font-weight-light font-italic mt-1">
        <span style="opacity: 0.6">Piše</span> {{ blog.author }}
        <span style="opacity: 0.6">objavljeno</span> {{ blog.date }}
      </div>
      <v-divider class="mb-10" />
      <div class="text-greyText text-justify" v-html="blog.html"></div>
    </div>
  </div>
</template>

<script setup>
import { getVal } from "@/services/DataService";
import { is } from "@babel/types";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const router = useRouter();

const key = ref("");
const blog = ref({});
const isDataLoaded = ref(false);

const getBlog = () => {
  isDataLoaded.value = false;
  const key = router.currentRoute.value.params.id.split("key=")[1];
  getVal("blog/posts/").then((val) => {
    if (val) {
      blog.value = val[key];
      isDataLoaded.value = true;
    }
  });
};

onMounted(() => {
  key.value = router.currentRoute.value.params.id;
  getBlog();
});
watch(() => router.currentRoute.value.params.id, getBlog);
</script>
