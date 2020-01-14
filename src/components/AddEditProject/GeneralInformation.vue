<template>
  <q-form class="q-gutter-y-sm" ref="form1" @submit="validate">
    <q-option-group
      v-model="type"
      label="Type"
      :options="types"
      inline
    ></q-option-group>
    <q-input
      v-model="title"
      label="Program/Project Title"
      stack-label
      outlined
      dense
      hint="The title of the program or project"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Title is required']"
    />
    <q-select
      v-model="implementing_agency"
      label="Implementing Agency"
      stack-label
      outlined
      dense
      :options="OPERATING_UNITS"
      hint="Proponent of the program/project"
    />
    <q-input
      v-model="description"
      label="Description"
      type="textarea"
      stack-label
      outlined
      dense
      hint="Description of the program/project (e.g. location, components, design, etc.)"
    />
    <q-input
      v-model="expected_outputs"
      label="Expected Outputs"
      type="textarea"
      stack-label
      outlined
      dense
      hint="Physical deliverables of the project (indicate unit)"
    />
    <q-select
      v-model="spatial_coverage"
      label="Spatial Coverage"
      stack-label
      outlined
      dense
      :options="SPATIAL_COVERAGES"
    />
    <q-select
      v-model="regions"
      label="Region/s"
      stack-label
      outlined
      dense
      :options="REGIONS"
      multiple
      use-chips
    />
    <q-select
      v-model="provinces"
      label="Province/s"
      stack-label
      outlined
      dense
      :options="PROVINCES"
      multiple
      use-chips
    />
    <q-input
      v-model="implementation_start"
      label="Implementation Start"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to start."
    />
    <q-input
      v-model="implementation_end"
      label="Implementation End"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to be completed."
    />
    <q-input
      v-model="total_project_cost"
      label="Total Project Cost"
      stack-label
      outlined
      dense
      hint="Indicative project cost in absolute PhP"
    />
    <q-select
      v-model="status"
      label="Status"
      stack-label
      outlined
      dense
      :options="STATUSES"
    />
    <q-btn
      type="submit"
      class="q-mt-md"
      label="CONTINUE"
      color="primary"
      @click="validate"
    />
  </q-form>
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
          label: "Program",
          value: "program"
        },
        {
          label: "Project",
          value: "project"
        }
      ],
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      REGIONS,
      PROVINCES,
      STATUSES,
      title: null,
      type: null,
      implementing_agency: null,
      description: null,
      expected_outputs: null,
      spatial_coverage: null,
      regions: [],
      provinces: [],
      implementation_start: null,
      implementation_end: null,
      total_project_cost: null,
      status: null
    };
  },
  methods: {
    validate() {
      this.$refs.form1.validate().then(success => {
        if (success) {
          console.log("validated form");

          const {
            title,
            type,
            implementing_agency,
            description,
            expected_outputs,
            spatial_coverage,
            regions,
            provinces,
            implementation_start,
            implementation_end,
            total_project_cost,
            status
          } = this;
          console.log(
            title,
            type,
            implementing_agency,
            description,
            expected_outputs,
            spatial_coverage,
            regions,
            provinces,
            implementation_start,
            implementation_end,
            total_project_cost,
            status
          );
        } else {
          console.log("Please review your inputs.");
        }
      });
      this.$emit("next");
    }
  }
};
</script>
