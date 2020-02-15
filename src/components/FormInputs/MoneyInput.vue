<template>
  <q-input
    :outlined="outlined"
    stack-label
    :label="label"
    :prefix="prefix"
    :value="value"
    @input="handleInput"
    v-money="money"
    :dense="dense"
  />
</template>

<script>
import { VMoney } from "v-money";

export default {
  name: "MoneyInput",
  props: ["label", "value", "dense", "prefix","outlined"],
  data() {
    return {
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    }
  },
  directives: {
    money: VMoney
  }
};
</script>
