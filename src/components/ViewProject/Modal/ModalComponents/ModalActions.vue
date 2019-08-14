<template>
  <q-card-actions>
    <q-space />
    <q-btn color="negative" label="Cancel" @click="onClick" />
    <q-btn color="primary" label="Save" @click="saveData" />
  </q-card-actions>
</template>

<script>
export default {
  name: "ModalActions",
  methods: {
    onClick() {
      this.$emit("close");
    },
    saveData() {
      this.$emit("save");
    }
  }
};
</script>
