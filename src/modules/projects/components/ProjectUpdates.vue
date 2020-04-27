<template>
  <q-list>
    <q-item>
      <single-select v-model="tier_id" label="Tier" :options="tiers" />
    </q-item>
    <q-item>
      <q-item-section class="col-9">
        <text-input label="Updates" type="textarea" v-model="updates" />
      </q-item-section>
      <q-item-section class="col-3" top>
        <date-input label="As of Date" v-model="updates_date"></date-input>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-label>Financial Accomplishments</q-item-label>
    </q-item>
    <q-item>
      <financial-accomplishment />
    </q-item>
  </q-list>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapState } from 'vuex';
import FinancialAccomplishment from './shared/FinancialAccomplishment';
import DateInput from '../../ui/form-inputs/DateInput';
import SingleSelect from '../../ui/form-inputs/SingleSelect';
import TextInput from '../../ui/form-inputs/TextInput';

export default {
  components: {
    TextInput,
    SingleSelect,
    DateInput,
    FinancialAccomplishment
  },
  computed: {
    ...mapFields('project', [
      'project.tier_id',
      'project.updates',
      'project.updates_date'
    ]),
    ...mapState('options', ['tiers'])
  },
  name: 'ProjectUpdates'
};
</script>
