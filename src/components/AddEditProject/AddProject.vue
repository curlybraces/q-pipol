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
					:options="[ { 'id': true, 'name': 'Yes' }, { 'id': false, 'name': 'No' } ]"
					:rules="rules.notEmpty"
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
        :options="funding_sources_options"
        label="Main Funding Source"
        :rules="rules.notEmpty"
      />
    </div>

		<div class="row">
			<single-select
				v-model="spatial_coverage_id"
				label="Spatial Coverage"
				:options="spatial_coverages"
				:rules="rules.notEmpty">
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

    <div class="row">
      <money-input
        v-model="total_project_cost"
        label="Total Project Cost (PhP)"
        :rules="rules.notZero"
      ></money-input>
    </div>

    <div class="row q-pl-sm q-pt-sm q-col-gutter-sm">
      <div class="col-6">
        <q-btn
          label="Reset"
          type="reset"
          class="full-width"
          outline
          color="primary"
        ></q-btn>
      </div>
      <div class="col">
        <q-btn
          label="Save"
          type="submit"
          class="full-width"
          color="primary"
          :loading="loading"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import TextInput from '../form-inputs/TextInput';
import SingleSelect from '../form-inputs/SingleSelect';
import MoneyInput from '../form-inputs/MoneyInput';

export default {
  name: 'AddProject',
  components: {
    MoneyInput,
    SingleSelect,
    TextInput
  },
  data() {
    return {
      rules: {
        required: [val => !!val || '* Required'],
        notEmpty: [val => !!val || '* Select one'],
        notLower: [
          val =>
            (!!val && val >= this.target_start_year) ||
            '* Should be higher than start year'
        ],
        notZero: [val => !!val || '* Should be positive number']
      }
    };
  },
  computed: {
    ...mapState('project', ['project', 'loading']),
    ...mapState('options', [
    	'spatial_coverages',
      'currencies',
      'funding_sources_options',
      'operating_units',
      'project_statuses',
      'types',
      'years'
    ]),
    ...mapFields('project', [
      'project.title',
      'project.description',
      'project.operating_unit_id',
      'project.project_status_id',
      'project.type_id',
      'project.infrastructure',
      'project.main_funding_source_id',
      'project.spatial_coverage_id',
      'project.target_start_year',
      'project.target_end_year',
	    'project.total_project_cost'
    ]),
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
    ...mapActions('project', ['createProject','clearProject']),
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
        total_project_cost: this.total_project_cost
      };
      this.createProject(payload);
    },
	  handleReset() {
    	console.log('resetting')
			this.clearProject()
		}
  },
	mounted() {

	}
};
</script>
