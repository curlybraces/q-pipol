<template>
  <!--
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="secondary" :to="link" />
  </q-page-sticky>
  -->
  <div class="absolute-bottom text-center q-mb-md">
    <q-btn :to="link" round color="secondary" size="25px" icon="add" />
  </div>
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
