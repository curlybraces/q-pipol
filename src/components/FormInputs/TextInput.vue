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
  props: ["label", "dense", "value", "readonly", "rules", "maxlength", "hint"],
  data() {
    return {
      model: null
    };
  }
};
</script>
