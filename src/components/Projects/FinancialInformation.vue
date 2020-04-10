<template>
  <div>
    <q-item>
      <single-select
        v-model="implementation_mode_id"
        label="Implementation Mode"
        :options="implementation_modes"
      />
    </q-item>

    <target-investment></target-investment>

    <funding-sources></funding-sources>

    <region-financial></region-financial>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapState } from 'vuex';
import RegionFinancial from './RegionFinancial/RegionFinancial';
import FundingSources from './FundingSources/FundingSources';
import TargetInvestment from './TargetInvestment';
import SingleSelect from '../form-inputs/SingleSelect';

export default {
  components: {
    SingleSelect,
    RegionFinancial,
    FundingSources,
    TargetInvestment
  },
  name: 'FinancialInformation',
  computed: {
    ...mapState('options', ['implementation_modes']),
    ...mapFields('project', ['project.implementation_mode_id'])
  }
};
</script>
