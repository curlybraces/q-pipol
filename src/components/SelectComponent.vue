<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-select
        dense
        outlined
        :options="options"
        option-value="id"
        option-label="name"
        emit-value
        @input="onInput"
        :multiple="multiple"
        :hint="hint"
        :label="label"
        v-model="selected"
        map-options
      >
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    label: String,
    options: Array,
    multiple: {
      type: Boolean,
      default: false
    },
    hint: String
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
