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
            :icon="dense ? 'unfold_more' : 'unfold_less'"
            @click="dense = !dense"
          >
            <q-tooltip>Toggle View</q-tooltip>
          </q-btn>
        </div>

        <q-option-group
          v-model="type_id"
          label="Type"
          :options="types"
          inline
          :dense="dense"
        ></q-option-group>

        <text-input
          v-model="title"
          label="Program/Project Title"
          stack-label
          outlined
          :dense="dense"
          hint="The title of the program or project"
          maxlength="250"
          required
        />

        <single-select
          v-model="operating_unit_id"
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
          v-model="spatial_coverage_id"
          label="Spatial Coverage"
          :dense="dense"
          :options-dense="dense"
          :options="SPATIAL_COVERAGES"
        />

        <multi-select
          v-if="spatial_coverage_id == 2 || spatial_coverage_id == 3"
          v-model="regions"
          label="Regions"
          :options="REGIONS_OPTIONS"
          :dense="dense"
          :options-dense="dense"
        />

        <multi-select
          v-if="regions.length > 0"
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

        <money-input
          label="Total Project Cost"
          v-model="total_project_cost"
        ></money-input>

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
import { STATUSES } from "../data/dropdown-values";
import { OPERATING_UNITS } from "../data/operating_units.js";
import { REGIONS_OPTIONS } from "../data/regions.js";
import { PROVINCES_OPTIONS } from "../data/provinces.js";
import { SPATIAL_COVERAGES } from "../data/spatial_coverages.js";
import { createProject } from "../functions/function-create-project";

import PageBreadcrumbs from "../components/PageBreadcrumbs";

import { Dialog } from "quasar";

export default {
  components: {
    PageBreadcrumbs,
    "multi-select": () => import("../components/FormInputs/MultiSelect.vue"),
    "single-select": () => import("../components/FormInputs/SingleSelect.vue"),
    "date-input": () => import("../components/FormInputs/DateInput.vue"),
    "text-input": () => import("../components/FormInputs/TextInput.vue"),
    "money-input": () => import("../components/FormInputs/MoneyInput.vue")
  },
  name: "AddProject",
  data() {
    return {
      success: true,
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
          value: 1
        },
        {
          label: "Project",
          value: 2
        }
      ],
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      REGIONS_OPTIONS,
      PROVINCES_OPTIONS,
      STATUSES,
      type_id: 1,
      title: "Title",
      operating_unit_id: 1,
      description: "Description",
      outcomes: "Outcomes",
      expected_outputs: "Outputs",
      spatial_coverage_id: 2,
      regions: [1, 2, 3],
      provinces: [1, 2, 3],
      implementation_start_date: null,
      implementation_end_date: null,
      total_project_cost: null,
      status_update: null,
      dense: false
    };
  },
  computed: {
    filteredProvinces() {
      return this.PROVINCES_OPTIONS.filter(province => {
        return this.regions.includes(province.region_id);
      });
    }
  },
  methods: {
    save() {
      createProject(this).then(res => {
        if (res) {
          this.$router.push("/pip/" + res.id);
        } else {
          return;
        }
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
