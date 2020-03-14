<template>
  <q-card>
    <modal-title
      title="Add Funding Source"
      @close="$emit('close')"
    ></modal-title>
    <modal-body v-model="fundingSource"></modal-body>
    <q-card-section align="right">
      <q-btn flat label="CANCEL" @click="$emit('close')"></q-btn>
      <q-btn
        label="ADD"
        color="primary"
        class="q-ml-md"
        @click="addToFundingSourceRow"
      ></q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapMutations } from 'vuex';
import ModalTitle from '../../FundingSources/Components/Shared/ModalTitle';
import ModalBody from '../../FundingSources/Components/Shared/ModalBody';

export default {
  name: 'AddFundingSource',
  components: { ModalBody, ModalTitle },
  data() {
    return {
      fundingSource: {
        id: null,
        target_2016: '',
        target_2017: '',
        target_2018: '',
        target_2019: '',
        target_2020: '',
        target_2021: '',
        target_2022: '',
        target_2023: '',
        target_total: ''
      }
    };
  },
  methods: {
    ...mapMutations('project', ['addFundingSourceRow']),
    addToFundingSourceRow() {
      if (!this.fundingSource.id) {
        alert('Please select funding source.');
      } else {
        this.addFundingSourceRow(this.fundingSource);
        this.$emit('close');
      }
    }
  }
};
</script>
