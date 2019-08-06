<template>
  <div class="row items-start q-my-md">
    <div class="col-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-input
        :label="label"
        dense
        :type="type"
        outlined
        :hint="hint"
        :rules="rules"
        lazy-rules
        @input="onInput"
        :value="value"
        :readonly="readonly"
        :stack-label="$q.screen.lt.sm"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    label: String,
    hint: String,
    type: String,
    value: [String,Number],
    rules: Array,
    readonly: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>

<style></style>
