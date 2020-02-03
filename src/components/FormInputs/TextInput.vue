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
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["label", "dense", "value", "readonly", "rules"],
  data() {
    return {
      model: null
    };
  }
};
</script>
