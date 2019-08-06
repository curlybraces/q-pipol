<template>
  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn fab icon="add" color="secondary" :to="link" size="25px" />
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
  },
  data() {
    return {};
  }
};
</script>

<style></style>
