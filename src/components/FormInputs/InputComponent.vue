<template>
  <q-input
    dense
    :outlined="outlined"
    :dark="dark"
    :type="type"
    :label="$q.screen.lt.md ? label : void 0"
    :hint="hint"
    @input="onInput"
    :value="value"
    :readonly="readonly"
    :disabled="disabled"
    :stack-label="$q.screen.lt.md"
    :color="dark ? 'white' : 'primary'"
    :rules="rules"
    clearable
    lazy-rules
    :input-class="type == 'number' ? 'text-right' : void 0"
  />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InputComponent",
  props: {
    label: String,
    hint: String,
    type: String,
    value: [String, Number],
    rules: Array,
    readonly: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
