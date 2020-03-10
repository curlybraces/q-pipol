<template>
  <q-input
    outlined
    stack-label
    :value="value"
    :label="label"
    :prefix="prefix"
    @input="val => $emit('input', val)"
    v-money="money"
    :dense="dense"
    filled
    label-color="orange-10"
    :readonly="readonly"
    class="col"
    input-class="text-right"
    :rules="rules"
  />
</template>

<script>
import { VMoney } from "v-money";

export default {
  name: "MoneyInput",
  props: ["label", "value", "dense", "prefix", "readonly", "rules"],
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
  directives: {
    money: VMoney
  }
};
</script>
