<template>
  <q-list>
    <q-item>
      <multi-select
        label="Implementation Bases"
        v-model="selected_bases"
        :options-dense="dense"
        :options="bases"
        @clear="selected_bases = []"
      />
    </q-item>

    <q-item>
      <text-input
        v-model="goals"
        label="Goals"
        type="textarea"
        :dense="dense"
      />
    </q-item>

    <q-item>
      <text-input
        v-model="outcomes"
        label="Outcomes"
        type="textarea"
        :dense="dense"
        hint="Desired outcome of the program/project (e.g. Increase productivity)"
      />
    </q-item>

    <q-item>
      <text-input
        v-model="purpose"
        label="Purpose"
        type="textarea"
        :dense="dense"
      />
    </q-item>

    <q-item>
      <text-input
        v-model="expected_outputs"
        label="Expected Outputs"
        type="textarea"
        :dense="dense"
        hint="Physical deliverables of the project (indicate unit)"
      />
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'multi-select': () => import('../../form-inputs/MultiSelect.vue'),
    'text-input': () => import('../../form-inputs/TextInput.vue')
  },
  name: 'AdditionalInformation',
  props: ['dense'],
  computed: {
    ...mapState('options', ['bases']),
    ...mapFields('project', [
      'project.selected_bases',
      'project.description',
      'project.goals',
      'project.outcomes',
      'project.purpose',
      'project.expected_outputs'
    ])
  }
};
</script>
