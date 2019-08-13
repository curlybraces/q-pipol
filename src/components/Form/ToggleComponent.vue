<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12 q-col-lg">
      <q-btn-toggle
        :options="options"
        @input="onInput"
        :value="value"
        spread>
      </q-btn-toggle>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleComponent",
  props: {
    label: {
      type: String,
      default: "No Label Specified"
    },
    options: Array
  },
  data() {
    return {
      value: false
    };
  },
  methods: {
    onInput(val) {
      this.$emit("input", val)
    }
  }
};
</script>

<style></style>
