<template>
  <q-card-actions>
    <q-space />
    <q-btn
      color="negative"
      label="Cancel"
      @click="closeDialog" />
    <q-btn
      color="primary"
      label="Save"
      @click="saveData" />
  </q-card-actions>
</template>

<script>
export default {
  name: "ModalActions"
};
</script>
