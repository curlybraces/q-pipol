<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card class="q-pa-md">
      <q-form class="q-gutter-y-sm">
        <q-option-group
          v-model="classification"
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
          counter
          maxlength="250"
        />
        <q-select
          v-model="implementing_agency"
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
          v-model="description"
          label="Description"
          type="textarea"
          stack-label
          outlined
          dense
          hint="Description of the program/project (e.g. location, components, design, etc.)"
        />
        <q-input
          v-model="outcomes"
          label="Outcomes"
          type="textarea"
          stack-label
          outlined
          dense
          hint="Desired outcome of the program/project (e.g. Increase productivity)"
        ></q-input>
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
          emit-value
          map-options
        />
        <q-select
          v-model="regions"
          label="Region/s"
          stack-label
          outlined
          dense
          :options="region_options"
          multiple
          use-chips
          emit-value
          map-options
        />
        <q-select
          v-model="provinces"
          label="Province/s"
          stack-label
          outlined
          dense
          :options="province_options"
          multiple
          use-chips
          emit-value
          map-options
        />
        <q-input
          v-model="implementation_start_date"
          mask="date"
          label="Implementation Start Date"
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
                  v-model="implementation_start_date"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="implementation_end_date"
          mask="date"
          label="Implementation End Date"
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
                  v-model="implementation_end_date"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="total_project_cost"
          label="Total Project Cost"
          stack-label
          outlined
          dense
          hint="Indicative project cost in absolute PhP"
          prefix="PhP"
        />
        <q-select
          v-model="status_update"
          label="Status"
          stack-label
          outlined
          dense
          :options="STATUSES"
          emit-value
        />
        <q-btn type="submit" label="Save" color="primary" />
        <q-btn flat type="reset" label="Reset" class="q-ml-sm" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import {
  OPERATING_UNITS,
  SPATIAL_COVERAGES,
  REGIONS,
  PROVINCES,
  STATUSES
} from "../data/dropdown-values";

import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: { PageBreadcrumbs },
  name: "AddProject",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/projects"
        },
        {
          title: "Add Project"
        }
      ],
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
      region_options: REGIONS,
      province_options: PROVINCES,
      STATUSES,
      classification: null,
      title: null,
      implementing_agency: null,
      description: null,
      outcomes: null,
      expected_outputs: null,
      spatial_coverage: null,
      regions: [],
      provinces: [],
      implementation_start_date: null,
      implementation_end_date: null,
      total_project_cost: null,
      status_update: null
    };
  }
};
</script>
