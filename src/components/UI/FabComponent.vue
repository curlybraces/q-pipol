<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="note_add" color="secondary" :to="link" size="25px" />
  </q-page-sticky>
</template>

<script>
export default {
  name: "FabComponent",
  props: {
    link: {
      type: String,
      default: "#"
    }
  }
};
</script>

<style></style>
