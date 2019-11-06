<template>
  <q-page-sticky position="bottom" :offset="[18, 10]">
    <q-btn fab icon="add" :to="link" size="25px" />
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
    ...mapState("auth", ["isEncoder"])
  }
};
</script>
