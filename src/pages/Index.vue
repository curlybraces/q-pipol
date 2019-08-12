<template>
  <q-page padding>
    <p>Index</p>

    <welcome-dialog />

<<<<<<< HEAD
    <q-btn v-model="dialog" label="Open Dialog" @click="dialog = !dialog"/>

    <q-dialog
      v-model="dialog"
      transition-show="slide-up"
      transition-hide="slide-down"
      >
      <q-card
        class="bg-primary text-white"
        >
        <q-bar>
          <q-space/>
          <q-btn
            round
            dense
            icon="close"
            flat
            v-close-popup/>
        </q-bar>

        <q-card-section class="bg-white"></q-card-section>

        <q-card-actions>
          <q-space/>
          <q-btn
            round
            icon="save"
            flat/>
        </q-card-actions>
      </q-card>
    </q-dialog>
=======
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
>>>>>>> 841df3555835c443c3d3be9e4d92145ff97feec5
  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";
<<<<<<< HEAD
=======
import CardComponent from "../components/Dashboard/CardComponent";
>>>>>>> 841df3555835c443c3d3be9e4d92145ff97feec5

export default {
  name: "PageIndex",
  components: {
<<<<<<< HEAD
=======
    CardComponent,
>>>>>>> 841df3555835c443c3d3be9e4d92145ff97feec5
    WelcomeDialog
  },
  data() {
    return {
<<<<<<< HEAD
      dialog: true
=======
      operating_unit: 1
>>>>>>> 841df3555835c443c3d3be9e4d92145ff97feec5
    };
  },
  mounted() {}
};
</script>
