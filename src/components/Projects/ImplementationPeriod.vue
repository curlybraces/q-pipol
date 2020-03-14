<template>
  <q-list>
    <q-item>
      <q-item-section class="col-6">
        <single-select
          v-model="target_start_year"
          label="Target Start Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        />
      </q-item-section>

      <q-item-section class="col-6">
        <single-select
          v-model="target_end_year"
          label="Target Completion Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <date-input
          v-model="implementation_start_date"
          mask="date"
          label="Implementation Start Date"
          hint="Indicate what year the project is expected to start."
        />
      </q-item-section>
      <q-item-section class="col-6">
        <date-input
          v-model="implementation_end_date"
          label="Implementation End Date"
          :dense="dense"
          hint="Indicate the date when the project is expected to end."
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { YEARS } from '../../data/dropdown-values';

export default {
  components: {
    'single-select': () => import('../FormInputs/SingleSelect.vue'),
    'date-input': () => import('../FormInputs/DateInput.vue')
  },
  name: 'ImplementationPeriod',
  props: ['dense'],
  computed: {
    ...mapFields('project', [
      'project.target_start_year',
      'project.target_end_year',
      'project.implementation_start_date',
      'project.implementation_end_date'
    ])
  },
  data() {
    return {
      YEARS
    };
  }
};
</script>
