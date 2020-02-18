<template>
  <div class="col">
    <q-input
      v-model="model"
      :type="type"
      :label="label"
      stack-label
      :dense="dense"
      filled
      @input="val => $emit('input', val)"
      :readonly="readonly"
      :rules="rules"
      :max-length="maxlength"
      :counter="type == 'textarea'"
      :hint="hint"
      clearable
      label-color="orange-10"
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
