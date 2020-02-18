<template>
  <q-input
    outlined
    stack-label
    :label="label"
    :prefix="prefix"
    :value="value"
    @input="handleInput"
    v-money="money"
    :dense="dense"
    filled
    label-color="orange-10"
    :readonly="readonly"
  />
</template>

<script>
import { VMoney } from "v-money";

export default {
  name: "MoneyInput",
  props: ["label", "value", "dense", "prefix", "readonly"],
  data() {
    return {
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
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
