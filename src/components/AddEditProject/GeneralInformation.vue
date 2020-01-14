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
      emit-value
      map-options
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
      :options="SPATIAL_COVERAGES"
      emit-value
      map-options
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
      emit-value
      map-options
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
      emit-value
      map-options
    />
    <q-input
      filled
      v-model="generalInformation.implementation_start_date"
      mask="date"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to start."
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="generalInformation.implementation_start_date"
              @input="() => $refs.qDateProxy.hide()"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      filled
      v-model="generalInformation.implementation_end_date"
      mask="date"
      stack-label
      outlined
      dense
      hint="Indicate what year the project is expected to start."
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="generalInformation.implementation_end_date"
              @input="() => $refs.qDateProxy.hide()"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
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
      emit-value
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
