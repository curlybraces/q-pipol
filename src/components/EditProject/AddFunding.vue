<template>
  <q-dialog>
    <q-form ref="form">
      <select-component
        :options="financialType == 'region' ? regions : funding_sources"
      >
      </select-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <input-component></input-component>

      <q-btn color="primary" label="Add" />
    </q-form>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SelectComponent from "../../components/Form/SelectComponent";
import InputComponent from "../../components/Form/InputComponent";

export default {
  name: "AddFunding",
  components: {
    SelectComponent,
    InputComponent
  },
  props: {
    financialType: {
      type: String,
      default: "region"
    }
  },
  data() {},
  computed: {
    ...mapState("dropdown", ["funding_sources", "regions"])
  },
  methods: {
    ...mapActions("dropdown", ["loadRegions", "loadFundingSources"])
  },
  mounted() {
    if (this.financialType == "region") {
      this.loadRegions();
    } else {
      this.loadFundingSources();
    }
  }
};
</script>
