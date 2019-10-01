<template>
  <q-card style="min-width: 360px">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        Add Submission
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn
        color="primary"
        label="Save"
        @click="addSubmission"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddEditSubmission",
  computed: {
    ...mapState("operating_units", ["operatingUnits"])
  },
  methods: {
    addSubmission() {
    }
  }
};
</script>
