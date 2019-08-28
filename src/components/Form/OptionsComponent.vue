<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12 q-col-lg">
      <q-option-group
        color="primary"
        dense
        :options="options"
        @input="onInput"
        :value="value"
        :inline="inline"
      >
      </q-option-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsComponent",
  props: {
    label: String,
    options: Array,
    value: [Number, String, Boolean],
    inline: {
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
