<template>
  <q-card>
    <modal-title title="Update Region" @close="$emit('close')"></modal-title>
    <modal-body v-model="regionToEdit" />
    <q-card-section align="right">
      <q-btn flat label="CANCEL" @click="$emit('close')"></q-btn>
      <q-btn
        label="UPDATE"
        color="primary"
        class="q-ml-md"
        @click="updateThisRegionRow"
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
  props: ['region', 'index'],
  name: 'EditRegion',
  data() {
    return {
      regionToEdit: {}
    };
  },
  methods: {
    ...mapMutations('project', ['updateRegionRow']),
    updateThisRegionRow() {
      const payload = {
        index: this.$props.index,
        region: this.regionToEdit
      };
      this.updateRegionRow(payload);
      this.$emit('close');
    }
  },
  created() {
    this.regionToEdit = Object.assign({}, this.$props.region);
  }
};
</script>
