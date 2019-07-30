<template>
  <q-page padding>
    <p>View Programs</p>

    <fab-component link="/programs/add-activities"/>
  </q-page>
</template>

<script>
import FabComponent from "../../components/FabComponent";
export default {
  components: {FabComponent},
  name: "PageViewActivities",
  data() {
    return {};
  }
};
</script>
