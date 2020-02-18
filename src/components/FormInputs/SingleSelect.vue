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
  >
    <template v-slot:prepend>
      <q-icon name="swap_vert" />
    </template>
  </q-select>
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
    value: String,
    hint: { type: String }
  },
  data() {
    return {
      model: this.value
    };
  },
  methods: {
    handleInput() {
      console.log(this.model);
      this.$emit("input", this.model);
    }
  }
};
</script>
