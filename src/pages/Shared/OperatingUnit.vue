<template>
  <div>
    <select-component
      :options="operating_units"
      @input="onInput"
      :value="selected">
    </select-component>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "OperatingUnit",
    data() {
      return {
        selected: null
      }
    },
    computed: {
      ...mapState("operating_units",["operating_units"])
    },
    methods: {
      ...mapActions("operating_units",["loadOperatingUnits"]),
      onInput(val) {
        this.$emit("input", val);
      }
    },
    mounted() {
      this.loadOperatingUnits();
    }
  }
</script>
