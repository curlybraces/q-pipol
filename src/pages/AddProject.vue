<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card class="q-pa-md">
      <q-form class="q-gutter-y-sm" @submit="save">
        <div class="row">
          <q-space />
          <q-btn
            rounded
            dense
            flat
            :icon="dense ? 'format_line_spacing' : 'vertical_align_center'"
            @click="dense = !dense"
          >
            <q-tooltip>Toggle View</q-tooltip>
          </q-btn>
        </div>

        <q-option-group
          v-model="classification"
          label="Type"
          :options="types"
          inline
          :dense="dense"
        ></q-option-group>

        <q-input
          v-model="title"
          label="Program/Project Title"
          stack-label
          outlined
          :dense="dense"
          hint="The title of the program or project"
          counter
          maxlength="250"
          required
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <single-select
          v-model="operating_unit"
          label="Implementing Agency"
          :dense="dense"
          :options-dense="dense"
          :options="OPERATING_UNITS"
          hint="Proponent of the program/project"
        />

        <q-input
          v-model="description"
          label="Description"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Description of the program/project (e.g. location, components, design, etc.)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          v-model="outcomes"
          label="Outcomes"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Desired outcome of the program/project (e.g. Increase productivity)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          v-model="expected_outputs"
          label="Expected Outputs"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Physical deliverables of the project (indicate unit)"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <single-select
          v-model="spatial_coverage"
          label="Spatial Coverage"
          :dense="dense"
          :options-dense="dense"
          :options="SPATIAL_COVERAGES"
        />

        <multi-select
          v-model="regions"
          label="Regions"
          :options="region_options"
          :dense="dense"
          :options-dense="dense"
        />

        <multi-select
          v-model="provinces"
          label="Province/s"
          :options="filteredProvinces"
          :dense="dense"
          :options-dense="dense"
        />

        <date-input
          v-model="implementation_start_date"
          mask="date"
          label="Implementation Start Date"
          stack-label
          outlined
          :dense="dense"
          hint="Indicate what year the project is expected to start."
        />

        <date-input
          v-model="implementation_end_date"
          mask="date"
          label="Implementation End Date"
          stack-label
          outlined
          :dense="dense"
          hint="Indicate the date when the project is expected to start."
        />

        <q-input
          v-model="total_project_cost"
          label="Total Project Cost"
          stack-label
          outlined
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
          prefix="PhP"
        />

        <single-select
          v-model="status_update"
          label="Status"
          :dense="dense"
          :options-dense="dense"
          :options="STATUSES"
        />

        <q-btn type="submit" label="Save" color="primary" :dense="dense" />

        <q-btn flat type="reset" label="Reset" class="q-ml-sm" :dense="dense" />
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
import { createProject } from "../functions/function-create-project";

import PageBreadcrumbs from "../components/PageBreadcrumbs";

import { Dialog } from "quasar";

export default {
  components: {
    PageBreadcrumbs,
    "multi-select": () => import("../components/FormInputs/MultiSelect.vue"),
    "single-select": () => import("../components/FormInputs/SingleSelect.vue"),
    "date-input": () => import("../components/FormInputs/DateInput.vue")
  },
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
          url: "/pip"
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
      operating_unit: null,
      description: null,
      outcomes: null,
      expected_outputs: null,
      spatial_coverage: null,
      regions: [],
      provinces: [],
      implementation_start_date: null,
      implementation_end_date: null,
      total_project_cost: null,
      status_update: null,
      dense: false
    };
  },
  computed: {
    filteredProvinces() {
      return this.province_options.filter(province => {
        return this.regions.includes(province.region_id);
      });
    }
  },
  methods: {
    save() {
      createProject(this).then(res => {
        Dialog.create({
          title: "Success!",
          message: `The project was successfully created as Project #${res.data.data.create_project.id}.`
        }).onOk(() => {
          this.$router.push("/pip");
        });
      });
    },
    selectAllRegions() {
      const { region_options } = this;
      this.regions = [];
      region_options.forEach(region => this.regions.push(region.value));
    },
    selectAllProvinces() {
      const { filteredProvinces } = this;
      this.provinces = [];
      filteredProvinces.forEach(province =>
        this.provinces.push(province.value)
      );
    }
  },
  beforeRouteLeave(to, from, next) {
    Dialog.create({
      title: "Warning",
      message:
        "Are you sure you want to leave this page? You may have unsaved changes.",
      cancel: true
    })
      .onOk(() => {
        next();
      })
      .onCancel(() => {
        next(false);
      });
  }
};
</script>

<style>
.q-textarea .q-field__native {
  resize: none;
}
</style>
