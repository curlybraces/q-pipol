<template>
  <q-input
    outlined
    stack-label
    :label="label"
    prefix="PhP"
    :value="value"
    @input="handleInput"
    v-money="money"
  />
</template>

<script>
import { VMoney } from "v-money";

export default {
  name: "MoneyInput",
  props: ["label", "value"],
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
