<template>
  <q-page padding>
    <p>Index</p>

    <welcome-dialog />

    <div class="row q-col-gutter-md">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <card-component icon="list"></card-component>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <card-component></card-component>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <card-component></card-component>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <card-component></card-component>
      </div>
    </div>
  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";
import CardComponent from "../components/Dashboard/CardComponent";

export default {
  name: "PageIndex",
  components: {
    CardComponent,
    WelcomeDialog
  },
  data() {
    return {
      operating_unit: 1
    };
  },
  mounted() {}
};
</script>
