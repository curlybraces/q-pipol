<template>
  <div class="row items-start q-my-md">
    <div class="col-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <!-- <q-input
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
      /> -->
      <input-component></input-component>
    </div>
  </div>
</template>

<script>
import InputComponent from "../../components/FormInputs/InputComponent";

export default {
  components: { InputComponent },
  name: "InputComponent",
  props: {
    label: String
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>

<style></style>
