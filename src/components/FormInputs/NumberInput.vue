<template>
  <q-input
    v-model="model"
    :label="label"
    stack-label
    :dense="dense"
    @input="val => $emit('input', val)"
    :readonly="readonly"
    :rules="rules"
    :hint="hint"
    clearable
    type="number"
    :suffix="suffix"
    filled
    label-color="orange-10"
    class="col"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: ["label", "dense", "value", "readonly", "rules", "hint", "suffix"],
  data() {
    return {
      model: null
    };
  },
  mounted() {
    this.model = this.value;
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
