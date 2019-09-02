<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      fab
      icon="note_add"
      :color="dark ? 'info' : 'secondary'"
      :to="link"
      size="25px"
      :dark="dark"
    />
  </q-page-sticky>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FabComponent",
  data() {
    return {
      link: "/add"
    };
  },
  computed: {
    ...mapState("settings", ["dark"])
  }
};
</script>

<style></style>
