<template>
  <q-list>
    <q-item>
      <multi-select
        label="Implementation Bases"
        v-model="selected_bases"
        :options-dense="dense"
        :options="IMPLEMENTATION_BASES"
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
import { mapFields } from 'vuex-map-fields';
import { IMPLEMENTATION_BASES } from '../../data/dropdown-values';

export default {
  components: {
    'multi-select': () => import('../form-inputs/MultiSelect.vue'),
    'text-input': () => import('../form-inputs/TextInput.vue')
  },
  name: 'AdditionalInformation',
  props: ['dense'],
  computed: {
    ...mapFields('project', [
      'project.selected_bases',
      'project.description',
      'project.goals',
      'project.outcomes',
      'project.purpose',
      'project.expected_outputs'
    ])
  },
  data() {
    return {
      IMPLEMENTATION_BASES
    };
  }
};
</script>
