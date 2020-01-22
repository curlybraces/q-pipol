<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card class="q-pa-md">
      <q-form class="q-gutter-y-sm" @submit="save">
        <div class="row">
          <q-space></q-space>
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
        />
        <q-select
          v-model="implementing_agency"
          label="Implementing Agency"
          stack-label
          outlined
          :dense="dense"
          :options-dense="dense"
          :options="OPERATING_UNITS"
          hint="Proponent of the program/project"
          emit-value
          map-options
          behavior="dialog"
        />
        <q-input
          v-model="description"
          label="Description"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Description of the program/project (e.g. location, components, design, etc.)"
        />
        <q-input
          v-model="outcomes"
          label="Outcomes"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Desired outcome of the program/project (e.g. Increase productivity)"
        ></q-input>
        <q-input
          v-model="expected_outputs"
          label="Expected Outputs"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          hint="Physical deliverables of the project (indicate unit)"
        />
        <q-select
          v-model="spatial_coverage"
          label="Spatial Coverage"
          stack-label
          outlined
          :dense="dense"
          :options-dense="dense"
          :options="SPATIAL_COVERAGES"
          emit-value
          map-options
          behavior="dialog"
        />
        <q-select
          v-model="regions"
          label="Region/s"
          stack-label
          outlined
          :dense="dense"
          :options-dense="dense"
          :options="region_options"
          multiple
          use-chips
          emit-value
          map-options
          behavior="dialog"
        >
          <template v-slot:before-options>
            <q-item>
              <q-item-section avatar>
                <q-btn label="Select all" @click="selectAllRegions" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <q-checkbox v-model="regions" :val="scope.opt.value" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label"></q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-if="regions.length" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="regions = []"
              class="cursor-pointer"
            />
          </template>
        </q-select>
        <q-select
          v-model="provinces"
          label="Province/s"
          stack-label
          outlined
          :dense="dense"
          :options-dense="dense"
          :options="filteredProvinces"
          multiple
          use-chips
          emit-value
          map-options
          behavior="dialog"
        >
          <template v-slot:before-options>
            <q-item>
              <q-item-section avatar>
                <q-btn label="Select all" @click="selectAllProvinces" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <q-checkbox v-model="provinces" :val="scope.opt.value" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label"></q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-if="provinces.length" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="provinces = []"
              class="cursor-pointer"
            />
          </template>
        </q-select>
        <q-input
          v-model="implementation_start_date"
          mask="date"
          label="Implementation Start Date"
          stack-label
          outlined
          :dense="dense"
          hint="Indicate what year the project is expected to start."
        >
          <template v-slot:prepend>
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
          :dense="dense"
          hint="Indicate what year the project is expected to start."
        >
          <template v-slot:prepend>
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
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
          prefix="PhP"
        />
        <q-select
          v-model="status_update"
          label="Status"
          stack-label
          outlined
          :dense="dense"
          :options-dense="dense"
          :options="STATUSES"
          emit-value
          behavior="dialog"
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
      status_update: null,
      dense: false
    };
  },
  computed: {
    filteredProvinces() {
      return PROVINCES.filter(province => {
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
