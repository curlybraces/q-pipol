<template>
  <q-select
    v-model="model"
    @input="handleInput"
    :options="options"
    :label="label"
    option-label="label"
    option-value="value"
    stack-label
    behavior="dialog"
    :dense="dense"
    :options-dense="optionsDense"
    outlined
    filled
    map-options
    emit-value
    clearable
    :hint="hint"
    use-input
    label-color="orange-10"
  />
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    label: {
      type: String,
      default: ""
    },
    dense: {
      type: Boolean,
      default: false
    },
    optionsDense: {
      type: Boolean,
      default: false
    },
    options: Array,
    value: [String, Number],
    hint: { type: String }
  },
  data() {
    return {
      model: this.value
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    }
  }
};
</script>
