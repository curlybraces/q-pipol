<template>
  <q-select
    dense
    :outlined="outlined"
    :dark="dark"
    :label="$q.screen.lt.md ? label : void 0"
    :stack-label="$q.screen.lt.md"
    :readonly="readonly"
    :disabled="disabled"
    :options="options"
    :multiple="multiple"
    :hint="hint"
    :color="dark ? 'white' : 'primary'"
    :rules="rules"
    @input="onInput"
    :use-chips="multiple"
    :value="value"
    map-options
    emit-value
    clearable
    :counter="multiple"
  >
  </q-select>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectComponent",
  props: {
    label: {
      type: String,
      required: true
    },
    options: Array,
    multiple: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    hint: String,
    rules: Array,
    value: {
      type: [Number, String, Array]
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
