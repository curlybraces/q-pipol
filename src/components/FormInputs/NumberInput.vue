<template>
  <div class="col">
    <q-input
      v-model="model"
      :label="label"
      stack-label
      :dense="dense"
      outlined
      @input="val => $emit('input', val)"
      :readonly="readonly"
      :rules="rules"
      :hint="hint"
      clearable
      type="number"
      :suffix="suffix"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["label", "dense", "value", "readonly", "rules", "hint","suffix"],
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
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>