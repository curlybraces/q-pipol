/* eslint-disable */
<template>
  <q-list>
    <q-item-label header>Project Preparation Documents</q-item-label>
    <list-option-group
      v-model="selected_technical_readinesses"
      :options="technical_readinesses_options"
    />

    <q-item>
      <other-costs />
    </q-item>

    <q-item-label header>Processing Level</q-item-label>
    <q-item>
      <q-item-section class="col-6">
        <checkbox-input
          v-model="clearinghouse"
          label="Approved by DA Clearinghouse"
        />
      </q-item-section>
      <q-item-section class="col-6" v-if="clearinghouse">
        <date-input
          label="Date Approved by Clearinghouse Committee"
          v-model="clearinghouse_date"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="col-6">
        <checkbox-input v-model="neda_submission" label="NEDA Submission" />
      </q-item-section>
      <q-item-section class="col-6" v-if="neda_submission">
        <date-input
          class="col-6"
          label="Date submitted to NEDA"
          v-model="neda_submission_date"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <checkbox-input
          v-model="neda_secretariat_review"
          label="NEDA Secretariat Review"
        />
      </q-item-section>
      <q-item-section class="col-6" v-if="neda_secretariat_review">
        <date-input
          label="Date reviewed by NEDA Secretariat"
          v-model="neda_secretariat_review_date"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <checkbox-input v-model="icc_endorsed" label="ICC Endorsed" />
      </q-item-section>
      <q-item-section class="col-6" v-if="icc_endorsed">
        <date-input label="Date endorsed by ICC" v-model="icc_endorsed_date" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <checkbox-input v-model="icc_approved" label="ICC Approved" />
      </q-item-section>
      <q-item-section class="col-6" v-if="icc_approved">
        <date-input
          label="Date approved by the ICC"
          v-model="icc_approved_date"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="col-6">
        <checkbox-input v-model="neda_board" label="NEDA Board" />
      </q-item-section>
      <q-item-section class="col-6" v-if="neda_board">
        <date-input
          label="Date approved by the NEDA Board"
          v-model="neda_board_date"
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
    'checkbox-input': () => import('../../form-inputs/CheckboxInput.vue'),
    'date-input': () => import('../../form-inputs/DateInput.vue'),
    'list-option-group': () => import('../../form-inputs/ListOptionGroup.vue'),
    'other-costs': () => import('./OtherCosts.vue')
  },
  name: 'TechnicalReadiness',
  computed: {
    ...mapFields('project', [
      'project.selected_technical_readinesses',
      'project.clearinghouse',
      'project.clearinghouse_date',
      'project.neda_submission',
      'project.neda_submission_date',
      'project.neda_secretariat_review',
      'project.neda_secretariat_review_date',
      'project.neda_board',
      'project.neda_board_date',
      'project.icc_approved',
      'project.icc_approved_date',
      'project.icc_endorsed',
      'project.icc_endorsed_date'
    ]),
    ...mapState('options', ['technical_readinesses_options'])
  }
};
</script>
