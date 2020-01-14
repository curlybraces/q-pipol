<template>
  <div class="q-gutter-y-sm">
    <q-option-group
      v-model="generalInformation.classification"
      label="Type"
      :options="types"
      inline
    ></q-option-group>
    <q-input
      v-model="generalInformation.title"
      label="Program/Project Title"
      stack-label
      outlined
      dense
      hint="The title of the program or project"
      counter
      maxlength="250"
    />
    <q-select
      v-model="generalInformation.implementing_agency"
      label="Implementing Agency"
      stack-label
      outlined
      dense
      :options="OPERATING_UNITS"
      hint="Proponent of the program/project"
    />
    <q-input
      v-model="generalInformation.description"
      label="Description"
      type="textarea"
      stack-label
      outlined
      dense
      hint="Description of the program/project (e.g. location, components, design, etc.)"
    />
    <q-input
      v-model="generalInformation.expected_outputs"
      label="Expected Outputs"
      type="textarea"
      stack-label
      outlined
      dense
      hint="Physical deliverables of the project (indicate unit)"
    />
    <q-select
      v-model="generalInformation.spatial_coverage"
      label="Spatial Coverage"
      stack-label
      outlined
      dense
      :options="generalInformation.SPATIAL_COVERAGES"
    />
    <q-select
      v-model="generalInformation.regions"
      label="Region/s"
      stack-label
      outlined
      dense
      :options="REGIONS"
      multiple
      use-chips
    />
    <q-select
      v-model="generalInformation.provinces"
      label="Province/s"
      stack-label
      outlined
      dense
      :options="PROVINCES"
      multiple
      use-chips
    />
    <q-input
      v-model="generalInformation.implementation_start_date"
      label="Implementation Start"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to start."
    />
    <q-input
      v-model="generalInformation.implementation_end_date"
      label="Implementation End"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to be completed."
    />
    <q-input
      v-model="generalInformation.total_project_cost"
      label="Total Project Cost"
      stack-label
      outlined
      dense
      hint="Indicative project cost in absolute PhP"
    />
    <q-select
      v-model="generalInformation._update"
      label="Status"
      stack-label
      outlined
      dense
      :options="STATUSES"
    />
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
  props: {
    generalInformation: Object
  },
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
      STATUSES
    };
  }
};
</script>
