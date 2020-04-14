<template>
  <q-list>
    <q-item>
      <text-input label="Beneficiaries" v-model="beneficiaries" />
    </q-item>

    <q-item>
      <text-input
        outlined
        stack-label
        label="Employment Generated"
        v-model="employment_generated"
      />
    </q-item>

    <q-item>
      <number-input label="GAD Score" type="number" v-model="gad_score" />
    </q-item>

    <q-item>
      <text-input
        label="Implementation Risks"
        type="textarea"
        v-model="implementation_risk"
      />
    </q-item>

    <q-item>
      <text-input
        label="Mitigation Strategies"
        type="textarea"
        v-model="mitigation_strategy"
      />
    </q-item>

    <q-item>
      <text-input
        label="Estimated Project Life"
        v-model="estimated_project_life"
      />
    </q-item>

    <q-item>
      <q-item-section class="col-6 q-gutter-y-md">
        <money-input
          label="Financial Net Present Value (FNPV)"
          v-model="financial_net_present_value"
          :dense="dense"
        ></money-input>

        <number-input
          label="Financial Benefit-Cost Ratio (FBCR)"
          v-model="financial_benefit_cost_ratio"
          :dense="dense"
        />

        <number-input
          label="Financial Internal Rate of Return (FIRR)"
          v-model="financial_internal_rate_return"
          :dense="dense"
          suffix="%"
        />
      </q-item-section>

      <q-item-section class="col-6 q-gutter-y-md">
        <money-input
          label="Economic Net Present Value (ENPV)"
          v-model="economic_net_present_value"
          :dense="dense"
        ></money-input>

        <number-input
          label="Economic Benefit-Cost Ratio (EBCR)"
          v-model="economic_benefit_cost_ratio"
          :dense="dense"
        />

        <number-input
          label="Economic Internal Rate Return (EIRR)"
          v-model="economic_internal_rate_return"
          :dense="dense"
          suffix="%"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'money-input': () => import('../../form-inputs/MoneyInput.vue'),
    'number-input': () => import('../../form-inputs/NumberInput.vue'),
    'text-input': () => import('../../form-inputs/TextInput.vue')
  },
  name: 'FinancialAnalysis',
  props: ['dense'],
  computed: {
    ...mapFields('project', [
      'project.beneficiaries',
      'project.employment_generated',
      'project.gad_score',
      'project.implementation_risk',
      'project.mitigation_strategy',
      'project.estimated_project_life',
      'project.financial_benefit_cost_ratio',
      'project.financial_net_present_value',
      'project.financial_internal_rate_return',
      'project.economic_benefit_cost_ratio',
      'project.economic_net_present_value',
      'project.economic_internal_rate_return'
    ])
  }
};
</script>
