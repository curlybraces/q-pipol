<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">
      {{ label }}
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-select
        dense
        outlined
        :readonly="readonly"
        :disabled="disabled"
        :options="options"
        option-value="id"
        option-label="name"
        emit-value
        @input="onInput"
        :value="value"
        multiple
        :hint="hint"
        :label="label"
        :rules="rules"
        :stack-label="$q.screen.lt.sm"
        map-options
        clearable
      >
      </q-select>
    </div>
  </div>
</template>

<script>
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
    onChange: {
      type: Function,
      default: null
    },
    hint: String,
    rules: Array,
    value: Array
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>

<style></style>
