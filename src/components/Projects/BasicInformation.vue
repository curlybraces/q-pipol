<template>
  <q-list>
    <q-item>
      <text-input
        v-model="title"
        label="Program/Project Title"
        hint="The title of the program or project"
        maxlength="250"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
    <q-item>
      <single-select
        v-model="type_id"
        label="Type"
        :options="TYPES"
        color="orange-10"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
    <q-item>
      <single-select
        v-model="operating_unit_id"
        label="Implementing Agency"
        :options="operating_units"
        hint="Proponent of the program/project"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
    <q-item>
      <text-input
        v-model="description"
        label="Description"
        type="textarea"
        hint="Description of the program/project (e.g. location, components, design, etc.)"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
    <q-item>
      <money-input
        label="Total Project Cost"
        outlined
        prefix="PhP"
        v-model="total_project_cost"
        hint="Indicative project cost in absolute PhP"
        :rules="[positive]"
      ></money-input>
    </q-item>
    <q-item>
      <single-select
        v-model="project_status_id"
        label="Status"
        :options="project_statuses"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
    <q-item>
      <single-select
        v-model="typology_id"
        label="Typology"
        :options="typologies"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { TYPES } from '../../data/dropdown-values.js';

export default {
  components: {
    'money-input': () => import('../FormInputs/MoneyInput.vue'),
    'single-select': () => import('../FormInputs/SingleSelect.vue'),
    'text-input': () => import('../FormInputs/TextInput.vue')
  },
  name: 'BasicInformation',
  computed: {
    ...mapFields('project', [
      'project.title',
      'project.type_id',
      'project.description',
      'project.project_status_id',
      'project.total_project_cost',
      'project.operating_unit_id',
      'project.typology_id'
    ]),
    ...mapState('options', ['operating_units', 'project_statuses','typologies'])
  },
  data() {
    return {
      TYPES
    };
  },
  methods: {
    positive(val) {
      return val.replace(/,/g, '') > 0 || '* Required';
    }
  }
};
</script>
