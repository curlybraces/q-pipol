<template>
  <q-list>
    <q-item>
      <text-input
        v-model="title"
        label="Program/Project Title"
        hint="The title of the program or project"
        maxlength="250"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>

    <q-item>
      <q-item-section>
        <radio-input
          label="PAP Type"
          :options="types"
          v-model="type_id"
          :recode="true"
        >
        </radio-input>
      </q-item-section>
      <q-item-section>
        <radio-input
          label="Infrastructure"
          :options="[
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]"
          v-model="infrastructure"
          :recode="false"
        >
        </radio-input>
      </q-item-section>
    </q-item>

    <q-item>
      <single-select
        v-model="operating_unit_id"
        label="Implementing Agency"
        :options="operating_units"
        hint="Proponent of the program/project"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>

    <q-item>
      <text-input
        v-model="description"
        label="Description"
        type="textarea"
        hint="Description of the program/project (e.g. location, components, design, etc.)"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>

    <q-item>
      <money-input
        label="Total Project Cost"
        outlined
        prefix="PhP"
        v-model="total_project_cost"
        hint="Indicative project cost in absolute PhP"
        :rules="[positive]"
      ></money-input>
    </q-item>

    <q-item>
      <single-select
        v-model="project_status_id"
        label="Status"
        :options="project_statuses"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>

    <q-item>
      <single-select
        v-model="typology_id"
        label="Typology"
        :options="typologies"
        :rules="[val => !!val || '* Required']"
      />
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <single-select
          v-model="target_start_year"
          label="Target Start Year"
          :options="years"
        />
      </q-item-section>

      <q-item-section class="col-6">
        <single-select
          v-model="target_end_year"
          label="Target Completion Year"
          :options="years"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import RadioInput from '../../../modules/shared/components/form-inputs/RadioInput';

export default {
  components: {
    RadioInput,
    'money-input': () => import('../../../modules/shared/components/form-inputs/MoneyInput.vue'),
    'single-select': () => import('../../../modules/shared/components/form-inputs/SingleSelect.vue'),
    'text-input': () => import('../../../modules/shared/components/form-inputs/TextInput.vue')
  },
  name: 'BasicInformation',
  computed: {
    ...mapFields('project', [
      'project.title',
      'project.type_id',
      'project.infrastructure',
      'project.description',
      'project.project_status_id',
      'project.total_project_cost',
      'project.operating_unit_id',
      'project.typology_id',
      'project.target_start_year',
      'project.target_end_year'
    ]),
    ...mapState('options', [
      'operating_units',
      'project_statuses',
      'typologies',
      'years',
      'types'
    ])
  },
  methods: {
    positive(val) {
      return val.replace(/,/g, '') > 0 || '* Required';
    }
  }
};
</script>
