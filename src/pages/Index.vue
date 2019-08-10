<template>
  <q-page padding>
    <p>Index</p>

    <welcome-dialog/>
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
