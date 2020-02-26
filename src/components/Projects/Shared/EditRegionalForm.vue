<template>
  <q-card>
    <modal-title title="Edit Region" />
    <modal-body />
    <div class="q-ml-md">
      <q-btn class="full-width" color="primary" @click="saveRegion"
      >Add</q-btn
      >
    </div>
  </q-card>
</template>

<script>
import { REGIONS } from "../../../data/dropdown-values";
import { mapMutations } from "vuex";
import ModalTitle from "../RegionFinancial/Components/Shared/ModalTitle";
import ModalBody from "../RegionFinancial/Components/Shared/ModalBody";

export default {
  components: {
    ModalBody,
    ModalTitle
  },
  props: ["region", "id"],
  name: "EditRegionalForm",
  data() {
    return {
      REGIONS,
      regionToEdit: {}
    };
  },
  methods: {
    ...mapMutations("project", ["updateRegionRow"]),
    saveRegion() {
      this.updateRegionRow({
        index: this.$props.id,
        region: this.regionToEdit
      });
    }
  },
  mounted() {
    this.regionToEdit = Object.assign({}, this.$props.region);
  }
};
</script>
