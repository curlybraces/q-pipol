<template>
  <q-form
    class="q-pa-sm q-gutter-sm"
    ref="addProject"
    greedy
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <span class="text-red">* All fields are required.</span>

    <div class="row">
      <text-input label="Title" v-model="title" :rules="rules.required" />
    </div>

    <div class="row q-pl-sm q-col-gutter-sm">
      <div class="col-6">
        <single-select
          v-model="type_id"
          label="Type"
          :options="types"
          :rules="rules.notEmpty"
        />
      </div>
      <div class="col-6">
        <single-select
          v-model="infrastructure"
          label="Infrastructure Project"
          :options="[
            { id: true, name: 'Yes' },
            { id: false, name: 'No' }
          ]"
					:rules="rules.notNull"
        />
      </div>
    </div>

    <div class="row">
      <text-input
        label="Description"
        type="textarea"
        v-model="description"
        :rules="rules.required"
      />
    </div>

    <div class="row">
      <single-select
        v-model="operating_unit_id"
        :options="operating_units"
        label="Implementing Agency"
        :rules="rules.notEmpty"
      />
    </div>

    <div class="row">
      <single-select
        v-model="main_funding_source_id"
        :options="funding_sources"
        label="Main Funding Source"
        :rules="rules.notEmpty"
      />
    </div>

    <div class="row">
      <single-select
        v-model="spatial_coverage_id"
        label="Spatial Coverage"
        :options="spatial_coverages"
        :rules="rules.notEmpty"
      >
      </single-select>
    </div>

    <div class="row">
      <single-select
        v-model="project_status_id"
        :options="project_statuses"
        label="Project Status"
        :rules="rules.notEmpty"
      />
    </div>

    <div class="row q-pl-sm q-col-gutter-sm">
      <div class="col-6">
        <single-select
          v-model="target_start_year"
          :options="years"
          label="Implementation Start"
          :rules="rules.notEmpty"
        />
      </div>

      <div class="col-6">
        <single-select
          v-model="target_end_year"
          :options="filteredYears"
          label="Implementation End"
          :rules="rules.notLower"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm q-pl-sm">
			<div class="col-3">
				<single-select label="Currency" v-model="currency_id" :options="currencies" :rules="rules.required"></single-select>
			</div>
			<div class="col-9">
				<money-input
					v-model="total_project_cost"
					label="Total Project Cost"
					:rules="rules.greaterThanZero"
				></money-input>
			</div>
    </div>

    <div class="row q-gutter-sm justify-center">
      <q-btn
        label="Reset"
        type="reset"
        outline
        color="primary"
      ></q-btn>
      <q-btn
        label="Save"
        type="submit"
        color="primary"
        :loading="loading"
      ></q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TextInput from '../../ui/form-inputs/TextInput';
import SingleSelect from '../../ui/form-inputs/SingleSelect';
import MoneyInput from '../../ui/form-inputs/MoneyInput';
import {
  FETCH_CURRENCIES,
  FETCH_OPERATING_UNITS,
  FETCH_FUNDING_SOURCES,
  FETCH_PROJECT_STATUSES,
  FETCH_SPATIAL_COVERAGES,
  FETCH_TYPES,
  FETCH_YEARS
} from 'src/graphql/queries'
import {convertToNumber} from '../../../functions/function-convert-to-number'

export default {
  name: 'AddProject',
  components: {
    MoneyInput,
    SingleSelect,
    TextInput
  },
  apollo: {
    currencies: {
      query: FETCH_CURRENCIES
    },
    operating_units: {
      query: FETCH_OPERATING_UNITS
    },
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    },
    project_statuses: {
      query: FETCH_PROJECT_STATUSES
    },
    spatial_coverages: {
      query: FETCH_SPATIAL_COVERAGES
    },
    types: {
      query: FETCH_TYPES
    },
    years: {
      query: FETCH_YEARS
    }
  },
  data() {
    return {
      operating_units: [],
      funding_sources: [],
      project_statuses: [],
      spatial_coverages: [],
      currencies: [],
      types: [],
      years: [],
      rules: {
        required: [val => !!val || '* Required'],
        notEmpty: [val => !!val || '* Select one'],
        notLower: [
          val =>
            (!!val && val >= this.target_start_year) ||
            '* Should be higher than start year'
        ],
        greaterThanZero: [val => this.checkPositiveNumber(val) || '* Should be positive number'],
				notNull: [
					val => val !== null || '* Select one'
				]
      },
      title: null,
      description: null,
      operating_unit_id: null,
      project_status_id: null,
      type_id: null,
      infrastructure: null,
      main_funding_source_id: null,
      spatial_coverage_id: null,
      target_start_year: null,
      target_end_year: null,
      currency_id: null,
      total_project_cost: null
    };
  },
  computed: {
    ...mapState('project', ['project', 'loading']),
    filteredYears() {
      const years = this.years;
      const start = this.target_start_year;

      let filteredYears = [];

      if (start) {
        filteredYears = years.filter(year => year.id >= start);

        return filteredYears;
      }
      return years;
    }
  },
  methods: {
    ...mapActions('project', ['createProject', 'clearProject']),
    handleSubmit() {
      const payload = {
        title: this.title,
        description: this.description,
        operating_unit_id: this.operating_unit_id,
        project_status_id: this.project_status_id,
        type_id: this.type_id,
        infrastructure: this.infrastructure,
        main_funding_source_id: this.main_funding_source_id,
        spatial_coverage_id: this.spatial_coverage_id,
        target_start_year: this.target_start_year,
        target_end_year: this.target_end_year,
				currency_id: this.currency_id,
        total_project_cost: this.total_project_cost
      };
      this.createProject(payload);
    },
    handleReset() {
      console.log('resetting');
      this.clearProject();
    },
		checkPositiveNumber(val) {
    	const value = convertToNumber(val)

			if (value > 0) {
				return true
			}
			return false
		}
  }
};
</script>
