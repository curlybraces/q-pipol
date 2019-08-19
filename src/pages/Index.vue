<template>
  <q-page padding>
    <p>Dashboard</p>

    <welcome-dialog />
  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
