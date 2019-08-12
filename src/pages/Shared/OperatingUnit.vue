<template>
  <div>
    <select-component
      :options="operating_units"
      label="Operating Unit"
      @input="$emit('update:operating_unit', $event)"
      :value="operating_unit"
    >
    </select-component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SelectComponent from "../../components/Form/SelectComponent";

export default {
  components: {
    SelectComponent
  },
  name: "OperatingUnit",
  props: ["operating_unit"],
  data() {
    return {};
  },
  computed: {
    ...mapState("operating_units", ["operating_units"])
  },
  methods: {
    ...mapActions("operating_units", ["loadOperatingUnits"])
  },
  mounted() {
    this.loadOperatingUnits();
  }
};
</script>
