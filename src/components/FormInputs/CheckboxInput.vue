<template>
  <q-checkbox
    v-model="model"
    :label="label"
    :dense="dense"
    :hint="hint"
    @input="handleInput"
    stack-label
    outlined
    readonly
    color="orange-10"
    :val="true"
  >
  </q-checkbox>
</template>

<script>
export default {
  name: "CheckboxInput",
  props: {
    label: String,
    hint: String,
    dense: {
      type: Boolean,
      default: false
    },
    val: Boolean
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    }
  },
  mounted() {
    this.model = this.val;
  }
};
</script>
