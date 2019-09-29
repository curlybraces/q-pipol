<template>
  <q-page-sticky position="bottom" :offset="[18, 10]">
    <q-btn
      fab
      icon="add"
      :color="dark ? 'info' : 'primary'"
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
    ...mapState("settings", ["dark"]),
    ...mapState("auth", ["isEncoder"])
  }
};
</script>
