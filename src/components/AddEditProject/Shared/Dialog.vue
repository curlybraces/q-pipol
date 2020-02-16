<template>
  <q-card class="q-pa-sm" style="width:400px;">
    <q-form class="q-gutter-y-md">
      <q-item-label>Add Row</q-item-label>
      <q-input
        outlined
        :value="title"
        @input="$emit('update:title', $event.target.value)"
      ></q-input>
      <q-input outlined v-model="input1"></q-input>
      <q-input outlined v-model="input2"></q-input>
      <q-input outlined v-model="input3"></q-input>
      <q-input outlined v-model="input4"></q-input>
      <q-input outlined v-model="input5"></q-input>
      <q-input outlined v-model="input6"></q-input>
      <q-btn
        class="full-width"
        color="primary"
        label="Add Row"
        @click="addData"
      ></q-btn>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: "DialogComponent",
  props: [
    "addRow",
    "title",
    "input1",
    "input2",
    "input3",
    "input4",
    "input5",
    "input6"
  ],
  methods: {
    addData() {
      this.$emit("addData");
    }
  }
};
</script>
