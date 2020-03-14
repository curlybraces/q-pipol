<template>
  <q-card>
    <modal-title
      title="Update Funding Source"
      @close="$emit('close')"
    ></modal-title>
    <modal-body v-model="fundingSourceToEdit" />
    <q-card-section align="right">
      <q-btn flat label="CANCEL" @click="$emit('close')"></q-btn>
      <q-btn
        label="UPDATE"
        color="primary"
        class="q-ml-md"
        @click="updateThisFundingSourceRow"
      ></q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapMutations } from 'vuex';
import ModalTitle from './Shared/ModalTitle';
import ModalBody from './Shared/ModalBody';

export default {
  components: {
    ModalBody,
    ModalTitle
  },
  props: ['funding_source', 'index'],
  name: 'EditFundingSource',
  data() {
    return {
      fundingSourceToEdit: {}
    };
  },
  methods: {
    ...mapMutations('project', ['updateFundingSourceRow']),
    updateThisFundingSourceRow() {
      const payload = {
        index: this.$props.index,
        funding_source: this.fundingSourceToEdit
      };
      this.updateFundingSourceRow(payload);
      this.$emit('close');
    }
  },
  created() {
    this.fundingSourceToEdit = Object.assign({}, this.$props.funding_source);
  }
};
</script>
