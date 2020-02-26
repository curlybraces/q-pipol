<template>
  <q-card>
    <modal-title title="Add Region" @close="$emit('close')"></modal-title>
    <modal-body v-model="regionToAdd" />
    <q-card-section align="right">
      <q-btn flat label="CANCEL" @click="$emit('close')"></q-btn>
      <q-btn label="ADD" color="primary" class="q-ml-md" @click="addToRegionRow"></q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapMutations } from "vuex";
import ModalTitle from "./Shared/ModalTitle";
import ModalBody from "./Shared/ModalBody";

export default {
  components: {
    ModalBody,
    ModalTitle
  },
  name: "AddRegion",
  data() {
    return {
      regionToAdd: {
        id: null,
        target_2016: "",
        target_2017: "",
        target_2018: "",
        target_2019: "",
        target_2020: "",
        target_2021: "",
        target_2022: "",
        target_2023: "",
        target_total: ""
      }
    }
  },
  methods: {
    ...mapMutations("project",["addRegionRow"]),
    addToRegionRow() {
      if (!this.regionToAdd.id) {
        alert("Please select a region.");
      } else {
        this.addRegionRow(this.regionToAdd);
        this.regionToAdd = {};
        this.$emit('close');
      }
    }
  }
}
</script>
