<template>
  <q-input
    filled
    dense
    type="number"
    input-class="text-right"
    @input="onInput"
    :value="value"
    :readonly="readonly"
  ></q-input>
</template>

<script>
export default {
  name: "TableInput",
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: 0
    };
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    }
  }
};
</script>
