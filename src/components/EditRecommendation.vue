<template>
  <div class="text-white">
    <v-card color="primary" :max-height="origin === 'configure' ? 700 : null" style="overflow-y: auto">
      <v-card-title v-if="origin === 'configure'">
        <h3>{{ props.selectedRecommendation?.fullName }}</h3>
      </v-card-title>
      <v-card-title v-else class="font-weight-light">
      <p class="text-subtitle">Write recommendation for Ilhan Kalač</p>
      </v-card-title>
      <v-card-text>
        <v-text-field 
          v-model="props.selectedRecommendation.fullName"
          label="Full Name"
          required
        />
        <v-text-field 
          v-model="selectedRecommendation.role"
          label="Role"
          required
        />
        <QuillEditor v-model:content="selectedRecommendation.textHtml" contentType="html" theme="snow"></QuillEditor> 
        <p style="opacity:0.6; font-size: smaller;" class="text-left mb-2"> 
          This is where you can share why you'd recommend me as a frontend engineer. Your insights provide valuable perspective for potential collaborators and employers. Let's showcase my skills and professionalism together!
        </p>
        <v-text-field 
          v-model="selectedRecommendation.avatarSrc"
          label="Avatar URL"
          required
        />
        <v-text-field 
          v-model="selectedRecommendation.githubLink"
          label="GitHub Link"
          required
        />
        <v-text-field 
          v-model="selectedRecommendation.linkedinLink"
          label="LinkedIn Link"
          required
        />
        <v-text-field 
          v-model="selectedRecommendation.instagramLink"
          label="Instagram link"
          required
        />
        <v-checkbox
          v-if="origin === 'configure'"
          v-model="selectedRecommendation.showPublic" 
          label="Show Public"
          class="ma-0 pa-0"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn block variant="outlined" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { IColleagueInfo } from "@/types/other";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { setVal } from "@/services/DataService";

const props = defineProps<{
  selectedRecommendation: IColleagueInfo;
  selectedRecommendationIndex?: number;
  origin?: string;
}>();

const emit = defineEmits(['close']);

const save = async () => {
  if (props.origin === 'configure') {
    setVal('recommendations/' + props.selectedRecommendationIndex, props.selectedRecommendation);
    emit("close");
  }
};

</script>

<style scoped lang="scss">

</style>