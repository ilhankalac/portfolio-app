<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card 
          class="ma-1 pa-2 pl-3 d-flex align-center" 
          color="secondary"
          style="border: 1px solid black; cursor: pointer;"
          @click="openDialog()"
        >
          <v-icon>mdi-plus</v-icon>  Add new skill
        </v-card>
        <div class="d-flex flex-wrap">
          <template v-for="(skill, key) in skills">
            <v-card 
              class="ma-1 pa-2" 
              color="secondary"
              style="border: 1px solid black; cursor: pointer;"
              @click="openDialog(skill, key)"
            >
              <span class="font-weight-light">
                <v-icon>mdi-{{ skill.icon }}</v-icon> {{ skill.name }}
              </span>
            </v-card>
          </template>
        </div>
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
import { onMounted, Ref, ref } from 'vue';
import { setVal, getVal, pushVal } from '@/services/DataService'
import { ISkill } from '@/types/other'

const skills: Ref<ISkill[]> = ref([]);
const skill: Ref<ISkill> = ref<ISkill>({
  key: -1,
  name: '',
  icon: '',
});
const addEditSkillDialog = ref(false);
const origin = ref('');

const openDialog = (selectedItem: ISkill = { key: -1, name: '', icon: '' }, key: number = -1) => {
  selectedItem.name == '' ? origin.value = 'add' : origin.value = 'edit';
  selectedItem.key = key;
  addEditSkillDialog.value = true;
  skill.value = Object.assign({}, selectedItem);
}

const save = async (skillData: ISkill) => {
  if (origin.value === 'add') {
    await pushVal('skills', skillData);
    skills.value.push(skillData);
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
    }
  });
}

onMounted(() => {
  getSkills();
});
</script>
