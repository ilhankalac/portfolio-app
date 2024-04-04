<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card 
          class="ma-1 pa-2 mb-3 pl-5" 
          color="secondary"
          style="border: 1px solid black; cursor: pointer;"
          @click="openDialog()"
        >
          Add new skill +
        </v-card>
        <template v-for="(skill, key) in skills">
          <v-card 
            class="ma-1 pa-2 pl-5" 
            color="secondary"
            style="border: 1px solid black; cursor: pointer;"
            @click="openDialog(skill, key)"
          >
            <span class="font-weight-light">
              <v-icon>mdi-{{ skill.icon }}</v-icon> {{ skill.name }}
            </span>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog 
    v-model="addEditSkillDialog"
    max-width="600"
  >
    <v-card color="secondary">
      <v-card-title>
        Add new skill
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="skill.name"
          label="Skill name"
          required
        />
        <v-text-field
          v-model="skill.icon"
          label="Icon"
          required
        />
      </v-card-text>
      <v-btn 
        class="mx-6 mb-5" 
        variant="outlined" 
        @click="save(skill)"
      >
        Save
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setVal, getVal, pushVal } from '@/services/DataService'

const skills: any = ref([]);
const addEditSkillDialog = ref(false);
const origin = ref('');

const skill = ref({
  name: '',
  icon: '',
});

const openDialog = (selectedItem: any = { name: '', icon: '' }, key: any = '') => {
  selectedItem.name == '' ? origin.value = 'add' : origin.value = 'edit';
  selectedItem.key = key;
  addEditSkillDialog.value = true;
  skill.value = Object.assign({}, selectedItem);
}


const save = async (skillData: any) => {
  if (origin.value === 'add') {
    await pushVal('skills', skillData);
    skills.value.unshift(skillData);
    addEditSkillDialog.value = false;
    return;
  }

  if (skillData.key !== -1) {
    skills.value[skillData.key] = skillData;
    await setVal('skills', skills.value);
    addEditSkillDialog.value = false;
    return;
  }
}

const getSkills = () => {
  getVal('skills').then((val) => {
    if (val) {
      Object.keys(val).forEach((key) => {
        skills.value.push({ ...val[key], key });
      });
      skills.value = skills.value.reverse()
    }
  });
}

onMounted(() => {
  getSkills();
});
</script>
