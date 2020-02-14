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

        <div class="row justify-around">
          <q-checkbox v-model="pip" :val="true">PIP</q-checkbox>
          <q-checkbox v-model="cip" :val="true">CIP</q-checkbox>
          <q-checkbox v-model="trip" :val="true">TRIP</q-checkbox>
          <q-checkbox v-model="rdip" :val="true">RDIP</q-checkbox>
          <q-checkbox v-model="pcip" :val="true">PCIP</q-checkbox>
        </div>

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

        <q-option-group
          v-model="type_id"
          label="Type"
          :options="types"
          inline
          :dense="dense"
        ></q-option-group>

        <single-select
          v-model="operating_unit_id"
          label="Implementing Agency"
          :dense="dense"
          :options-dense="dense"
          :options="OPERATING_UNITS"
          hint="Proponent of the program/project"
        />

        <single-select
          v-model="implementation_mode_id"
          label="Implementation Mode"
          :dense="dense"
          :options-dense="dense"
          :options="[]"
        ></single-select>

        <single-select
          v-model="tier_id"
          label="Tier"
          :dense="dense"
          :options-dense="dense"
          :options="[]"
        ></single-select>

        <single-select
          v-model="typology_id"
          label="Typology"
          :dense="dense"
          :options-dense="dense"
          :options="[]"
        ></single-select>

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
          v-model="goals"
          label="Goals"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
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
          v-model="purpose"
          label="Purpose"
          type="textarea"
          stack-label
          outlined
          :dense="dense"
          clearable
          counter
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <multi-select
          label="Implementation Bases"
          v-model="bases"
          :options="[]"
        ></multi-select>

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

        <q-input
          outlined
          stack-label
          label="Beneficiaries"
          v-model="beneficiaries"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Employment Generated"
          v-model="employment_generated"
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
          v-model="regions"
          label="Regions"
          :options="REGIONS_OPTIONS"
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

        <q-input
          outlined
          type="textarea"
          label="Cities and Municipalities"
          stack-label
          v-model="cities_municipalities"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-checkbox v-model="clearinghouse" :val="true"
          >Approved by DA Clearinghouse</q-checkbox
        >

        <multi-select
          stack-label
          label="Technical Readiness"
          v-model="technical_readinesses"
          :options="[]"
        ></multi-select>

        <q-input
          outlined
          stack-label
          label="Date Approved by Clearinghouse Committee"
          type="date"
          v-model="clearinghouse_date"
        ></q-input>

        <single-select
          v-model="target_start_year"
          label="Target Start Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        >
        </single-select>

        <single-select
          v-model="target_end_year"
          label="Target Completion Year"
          :options="YEARS"
          :dense="dense"
          :options-dense="dense"
        >
        </single-select>

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
          outlined
          stack-label
          label="GAD Score"
          type="number"
          v-model="gad_score"
        ></q-input>

        <money-input
          label="Total Project Cost"
          v-model="total_project_cost"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

        <q-input
          outlined
          stack-label
          label="Implementation Risks"
          type="textarea"
          v-model="implementation_risk"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Mitigation Strategies"
          type="textarea"
          v-model="mitigation_strategy"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <single-select
          v-model="project_status_id"
          label="Status"
          :dense="dense"
          :options-dense="dense"
          :options="STATUSES"
        />

        <q-input
          outlined
          stack-label
          label="Updates"
          type="textarea"
          v-model="updates"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <q-input
          outlined
          stack-label
          label="Updates"
          type="textarea"
          v-model="income_increase"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <money-input
          label="Financial Net Present Value (FNPV)"
          v-model="financial_net_present_value"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

        <q-input
          outlined
          stack-label
          label="Financial Benefit-Cost Ratio (FBCR)"
          v-model="financial_benefit_cost_ratio"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Financial Internal Rate of Return (FIRR)"
          v-model="financial_internal_rate_return"
          :dense="dense"
          suffix="%"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Economic Benefit-Cost Ratio (EBCR)"
          v-model="economic_benefit_cost_ratio"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Economic Internal Rate Return (EIRR)"
          v-model="economic_internal_rate_return"
          :dense="dense"
          suffix="%"
        ></q-input>

        <money-input
          label="Economic Net Present Value (ENPV)"
          v-model="economic_net_present_value"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

        <q-item-label header>FUNDING SOURCES</q-item-label>

        <single-select stack-label label="Funding Source"></single-select>

        <q-input
          outlined
          stack-label
          label="2016"
          v-model="target_2016"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2017"
          v-model="target_2017"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2018"
          v-model="target_2018"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2019"
          v-model="target_2019"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2020"
          v-model="target_2020"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2021"
          v-model="target_2021"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2022"
          v-model="target_2022"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="2023"
          v-model="target_2023"
        ></q-input>

        <q-input
          outlined
          stack-label
          label="Total"
          v-model="target_total"
        ></q-input>

        <q-item-label header>CIP Processing Status</q-item-label>

        <q-checkbox v-model="neda_submission" :val="true"
          >NEDA Submission</q-checkbox
        >
        <q-input outlined type="date" v-model="neda_submission_date"></q-input>
        <q-checkbox v-model="neda_secretariat_review" :val="true"
          >NEDA Secretariat Review</q-checkbox
        >
        <q-input
          outlined
          type="date"
          v-model="neda_secretariat_review_date"
        ></q-input>
        <q-checkbox v-model="icc_endorsed" :val="true">ICC Endorsed</q-checkbox>
        <q-input outlined type="date" v-model="icc_endorsed_date"></q-input>
        <q-checkbox v-model="icc_approved" :val="true">ICC Approved</q-checkbox>
        <q-input outlined type="date" v-model="icc_approved_date"></q-input>
        <q-checkbox v-model="neda_board" :val="true">NEDA Board</q-checkbox>
        <q-input outlined type="date" v-model="neda_board_date"></q-input>

        <q-item-label header>SOURCE OF FUNDING</q-item-label>

        <q-markup-table flat :dense="dense">
          <thead>
            <th class="text-left">Funding Sources</th>
            <th class="text-right">2016</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023</th>
            <th class="text-right">Total</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="i in 3" :key="i">
              <td class="text-left">Funding Source</td>
              <td class="text-right">2016</td>
              <td class="text-right">2017</td>
              <td class="text-right">2018</td>
              <td class="text-right">2019</td>
              <td class="text-right">2020</td>
              <td class="text-right">2021</td>
              <td class="text-right">2022</td>
              <td class="text-right">2023</td>
              <td class="text-right">Total</td>
              <td class="text-center">
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  color="blue"
                  size="sm"
                ></q-btn>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  color="red"
                  size="sm"
                ></q-btn>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <th class="text-left">Total</th>
            <th class="text-right">2016</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023</th>
            <th class="text-right">Total</th>
            <th></th>
          </tfoot>
        </q-markup-table>

        <q-item-label header>REGIONAL INVESTMENT</q-item-label>

        <q-markup-table flat :dense="dense">
          <thead>
            <th class="text-left">Regions</th>
            <th class="text-right">2016</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023</th>
            <th class="text-right">Total</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="i in 3" :key="i">
              <td class="text-left">Region</td>
              <td class="text-right">2016</td>
              <td class="text-right">2017</td>
              <td class="text-right">2018</td>
              <td class="text-right">2019</td>
              <td class="text-right">2020</td>
              <td class="text-right">2021</td>
              <td class="text-right">2022</td>
              <td class="text-right">2023</td>
              <td class="text-right">Total</td>
              <td class="text-center">
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  color="blue"
                  size="sm"
                ></q-btn>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  color="red"
                  size="sm"
                ></q-btn>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <th class="text-left">Total</th>
            <th class="text-right">2016</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023</th>
            <th class="text-right">Total</th>
          </tfoot>
        </q-markup-table>

        <q-btn type="submit" label="Save" color="primary" />

        <q-btn flat type="reset" label="Reset" class="q-ml-sm" />
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
import { YEARS } from "../data/year";

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
      YEARS,
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      REGIONS_OPTIONS,
      PROVINCES_OPTIONS,
      STATUSES,
      type_id: 1,
      title: null,
      operating_unit_id: null,
      description: null,
      goals: null,
      outcomes: null,
      purpose: null,
      expected_outputs: null,
      spatial_coverage_id: null,
      regions: [],
      provinces: [],
      target_start_year: null,
      target_end_year: null,
      implementation_start_date: null,
      implementation_end_date: null,
      total_project_cost: null,
      status_update: null,
      dense: false,
      pip: false,
      cip: false,
      trip: false,
      rdip: false,
      pcip: false,
      bases: [],
      tier_id: 1,
      typology_id: 1,
      project_status_id: null,
      beneficiaries: null,
      employment_generated: null,
      implementation_mode_id: 1,
      implementation_risk: "",
      mitigation_strategy: "",
      cities_municipalities: "",
      updates: "",
      financial_benefit_cost_ratio: 0,
      financial_internal_rate_return: 0,
      financial_net_present_value: 0,
      economic_benefit_cost_ratio: 0,
      economic_internal_rate_return: 0,
      economic_net_present_value: 0,
      clearinghouse: false,
      clearinghouse_date: "",
      technical_readinesses: "",
      gad_score: null,
      target_2016: null,
      target_2017: null,
      target_2018: null,
      target_2019: null,
      target_2020: null,
      target_2021: null,
      target_2022: null,
      target_2023: null,
      target_total: null,
      income_increase: "",
      neda_submission: false,
      neda_submission_date: "",
      neda_secretariat_review: false,
      neda_secretariat_review_date: "",
      icc_endorsed: false,
      icc_endorsed_date: "",
      icc_approved: false,
      icc_approved_date: "",
      neda_board: false,
      neda_board_date: ""
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
      //
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
