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
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["label", "dense", "value", "readonly"],
  data() {
    return {
      model: null
    };
  }
};
</script>
