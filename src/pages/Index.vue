<template>
  <q-page padding>
    <p>Index</p>

    <welcome-dialog />

    <infrastructure-sector/>
  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";
import InfrastructureSector from "../components/EditProject/InfrastructureSector";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog,
    InfrastructureSector
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
