<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-option-group
        color="primary"
        dense
        type="checkbox"
        :options="options"
        @input="onInput"
        :value="selected"
      >
      </q-option-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxComponent",
  props: {
    options: Array,
    label: String
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.selected);
    }
  }
};
</script>

<style></style>
