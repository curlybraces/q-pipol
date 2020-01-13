<template>
  <div class="q-gutter-y-sm">
    <q-form ref="form1" @submit="validate">
      <q-option-group label="Type" :options="types" inline></q-option-group>
      <q-input
        v-model="title"
        label="Program/Project Title"
        stack-label
        outlined
        dense
        hint="The title of the program or project"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        label="Implementing Agency"
        stack-label
        outlined
        dense
        :options="OPERATING_UNITS"
        hint="Proponent of the program/project"
      />
      <q-input
        label="Description"
        type="textarea"
        stack-label
        outlined
        dense
        hint="Description of the program/project (e.g. location, components, design, etc.)"
      />
      <q-input
        label="Expected Outputs"
        type="textarea"
        stack-label
        outlined
        dense
        hint="Physical deliverables of the project (indicate unit)"
      />
      <q-select
        label="Spatial Coverage"
        stack-label
        outlined
        dense
        :options="SPATIAL_COVERAGES"
      />
      <q-select
        label="Region/s"
        stack-label
        outlined
        dense
        :options="REGIONS"
        multiple
      />
      <q-select
        label="Province/s"
        stack-label
        outlined
        dense
        :options="PROVINCES"
        multiple
      />
      <q-input
        label="Implementation Start"
        stack-label
        outlined
        dense
        hint="Indicate what year the project is expected to start."
      />
      <q-input
        label="Implementation End"
        stack-label
        outlined
        dense
        hint="Indicate what year the project is expected to be completed."
      />
      <q-input
        label="Total Project Cost"
        stack-label
        outlined
        dense
        hint="Indicative project cost in absolute PhP"
      />
      <q-select label="Status" stack-label outlined dense :options="STATUSES" />
      <q-btn
        type="submit"
        class="q-mt-md"
        label="CONTINUE"
        color="primary"
        @click="validate"
      />
    </q-form>
  </div>
</template>

<script>
import {
  OPERATING_UNITS,
  SPATIAL_COVERAGES,
  REGIONS,
  PROVINCES,
  STATUSES
} from "../../data/dropdown-values";

export default {
  name: "GeneralInformation",
  data() {
    return {
      types: [
        {
          label: "Program"
        },
        {
          label: "Project"
        }
      ],
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      REGIONS,
      PROVINCES,
      STATUSES,
      title: null
    };
  },
  methods: {
    validate() {
      this.$refs.form1.validate().then(success => {
        if (success) {
          console.log("validated form");
          this.$emit("next");
        } else {
          console.log("Please review your inputs.");
        }
      });
    }
  }
};
</script>
