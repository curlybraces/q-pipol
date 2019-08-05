<template>
  <div class="row items-center">
    <div class="col-2">
      {{ label }}
    </div>
    <q-input
      class="col-10"
      outlined
      dense
      rounded
      v-model="input"
      @input="onInput"
      :rules="rules"
    ></q-input>
  </div>
</template>

<script>
export default {
  name: "InputValidation",
  props: {
    label: String,
    errorMessage: String,
    rules: Array
  },
  data() {
    return {
      input: ""
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
