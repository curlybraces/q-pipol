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
        :multiple="multiple"
        :hint="hint"
        :label="label"
        :rules="rules"
        map-options
        @input="onInput"
        :value="value"
        clearable
        :stack-label="$q.screen.lt.sm"
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
    hint: String,
    rules: Array,
    value: {
      type: [Number, String, Array]
    }
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
