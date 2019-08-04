<template>
  <div class="row items-start q-my-md">
    <div class="col-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-input
        dense
        :type="type"
        :step="step"
        outlined
        :placeholder="label"
        :hint="hint"
        @input="onInput"
        v-model="input"
        :value="value"
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
    step: Number,
    value: String
  },
  data() {
    return {
      input: ''
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.input);
    }
  }
};
</script>

<style></style>
