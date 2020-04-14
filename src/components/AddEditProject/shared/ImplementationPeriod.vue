<template>
  <q-list>
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
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'date-input': () => import('../../form-inputs/DateInput.vue')
  },
  name: 'ImplementationPeriod',
  props: ['dense'],
  computed: {
    ...mapState('options', ['years']),
    ...mapFields('project', [
      'project.target_start_year',
      'project.target_end_year',
      'project.implementation_start_date',
      'project.implementation_end_date'
    ])
  }
};
</script>
