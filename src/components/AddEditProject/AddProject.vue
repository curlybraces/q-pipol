<template>
  <div class="column q-pa-sm">
    {{ project }}
    <div class="row">
      <q-form class="column q-gutter-sm">
        <div class="col">
          <text-input label="Title" v-model="title"></text-input>
        </div>
        <single-select
          v-model="type_id"
          label="Type"
          :options="types"
        ></single-select>
        <text-input label="Description" v-model="description"></text-input>
        <single-select
          v-model="operating_unit_id"
          :options="operating_units"
          label="Implementing Agency"
        ></single-select>
        <single-select
          v-model="main_funding_source_id"
          :options="funding_sources_options"
          label="Main Funding Source"
        ></single-select>
        <single-select
          v-model="project_status_id"
          :options="project_statuses"
          label="Project Status"
        ></single-select>
        <money-input
          v-model="total_project_cost"
          label="Total Project Cost (PhP)"
        ></money-input>
      </q-form>
      <div class="col-6"></div>
      <div class="col-md-6 col-sm-12">
        <basic-information></basic-information>
      </div>
    </div>

    <q-separator spaced color="primary" />

    <div class="row">
      <div class="col-4">
        <div class="text-subtitle1 text-primary">
          Technical Readiness
        </div>
        <div class="text-caption">Basic information of the project</div>
      </div>
      <div class="col-8">
        <technical-readiness></technical-readiness>
      </div>
    </div>

    <q-separator spaced color="primary" />

    <div class="row">
      <div class="col-4">
        <div class="text-subtitle1 text-primary"></div>
        <div class="text-caption">Basic information of the project</div>
      </div>
      <div class="col-8"></div>
    </div>

    <q-separator spaced />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import TechnicalReadiness from './shared/TechnicalReadiness';
import TextInput from '../form-inputs/TextInput';
import SingleSelect from '../form-inputs/SingleSelect';
import BasicInformation from './shared/BasicInformation';
import MoneyInput from '../form-inputs/MoneyInput';

export default {
  name: 'AddProject',
  components: {
    MoneyInput,
    BasicInformation,
    SingleSelect,
    TextInput,
    TechnicalReadiness
  },
  computed: {
    ...mapState('project', ['project']),
    ...mapState('options', [
      'funding_sources_options',
      'operating_units',
      'project_statuses',
      'types'
    ]),
    ...mapFields('project', [
      'project.title',
      'project.description',
      'project.operating_unit_id',
      'project.total_project_cost',
      'project.project_status_id',
      'project.type_id',
      'project.main_funding_source_id'
    ])
  }
};
</script>
