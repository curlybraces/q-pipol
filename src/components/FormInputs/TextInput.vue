<template>
  <div class="col">
    <q-input
      v-model="model"
      :type="type"
      :label="label"
      stack-label
      :dense="dense"
      outlined
      @input="val => $emit('input', val)"
      :readonly="readonly"
      :rules="rules"
      :max-length="maxlength"
      counter
      :hint="hint"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: [
    "type",
    "label",
    "dense",
    "value",
    "readonly",
    "rules",
    "maxlength",
    "hint"
  ],
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
.q-textarea .q-field__native {
  resize: none;
}
</style>
