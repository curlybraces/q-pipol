<template>
  <q-page padding>
    <p>Index</p>

    <welcome-dialog />

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
    return {
      dialog: true
    };
  },
  mounted() {}
};
</script>
