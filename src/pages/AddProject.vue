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

        <q-input
          v-model="title"
          label="Program/Project Title"
          filled
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
          :options="TYPES"
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
          :options="IMPLEMENTATION_MODES"
        ></single-select>

        <single-select
          v-model="tier_id"
          label="Tier"
          :dense="dense"
          :options-dense="dense"
          :options="TIERS"
        ></single-select>

        <single-select
          v-model="typology_id"
          label="Typology"
          :dense="dense"
          :options-dense="dense"
          :options="TYPOLOGIES"
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
          :options-dense="dense"
          :options="IMPLEMENTATION_BASES"
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
          v-model="provinces"
          label="Province/s"
          :options="filteredProvinces"
          :dense="dense"
          :options-dense="dense"
          :readonly="spatial_coverage_id == '1'"
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

        <multi-select
          stack-label
          label="Technical Readiness"
          v-model="technical_readinesses"
          :options="[]"
        ></multi-select>

        <q-checkbox v-model="clearinghouse" :val="true"
          >Approved by DA Clearinghouse</q-checkbox
        >

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
          outlined
          prefix="PhP"
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
          v-model="income_increase"
        >
          <template v-slot:prepend>
            <q-icon name="text_format" />
          </template>
        </q-input>

        <money-input
          label="Financial Net Present Value (FNPV)"
          outlined
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
          outlined
          v-model="economic_net_present_value"
          :dense="dense"
          hint="Indicative project cost in absolute PhP"
        ></money-input>

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

        <q-markup-table flat bordered :dense="dense" separator="cell">
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
            <tr
              v-for="({
                funding_source,
                target_2016,
                target_2017,
                target_2018,
                target_2019,
                target_2020,
                target_2021,
                target_2022,
                target_2023,
                target_total
              },
              index) in fundingSources"
              :key="index"
            >
              <td class="text-left">Funding Source</td>
              <td class="text-right">{{ target_2016 }}</td>
              <td class="text-right">{{ target_2017 }}</td>
              <td class="text-right">{{ target_2018 }}</td>
              <td class="text-right">{{ target_2019 }}</td>
              <td class="text-right">{{ target_2020 }}</td>
              <td class="text-right">{{ target_2021 }}</td>
              <td class="text-right">{{ target_2022 }}</td>
              <td class="text-right">{{ target_2023 }}</td>
              <td class="text-right">{{ target_total }}</td>
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
            <tr>
              <td class="text-left">Dropdown</td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-right">
                <money-input dense></money-input>
              </td>
              <td class="text-center">
                <q-btn
                  flat
                  round
                  dense
                  icon="save"
                  color="blue"
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

        <q-markup-table>
          <thead>
            <th>#</th>
            <th class="text-center">Updates</th>
            <th class="text-center">Date</th>
          </thead>
          <tbody>
            <tr v-for="({updates, update_date}, index) in updates" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="text-center">{{ updates }}</td>
              <td class="text-center">{{ update_date }}</td>
            </tr>
          </tbody>
        </q-markup-table>

        <q-btn type="submit" label="Save" color="primary" />

        <q-btn flat type="reset" label="Reset" class="q-ml-sm" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import {
  IMPLEMENTATION_BASES, 
  STATUSES, 
  TIERS,
  TYPES, 
  TYPOLOGIES,
  IMPLEMENTATION_MODES } from "../data/dropdown-values";
import { OPERATING_UNITS } from "../data/operating_units.js";
import { REGIONS_OPTIONS } from "../data/regions.js";
import { PROVINCES_OPTIONS } from "../data/provinces.js";
import { SPATIAL_COVERAGES } from "../data/spatial_coverages.js";
import { YEARS } from "../data/year";

import { CREATE_PROJECT } from "../constants/graphql.js";

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
      dense: false,
      addFundSource: true,
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
      TYPES,
      YEARS,
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      REGIONS_OPTIONS,
      PROVINCES_OPTIONS,
      STATUSES,
      TYPOLOGIES,
      TIERS,
      IMPLEMENTATION_MODES,
      IMPLEMENTATION_BASES,
      type_id: "1",
      title: "test data title",
      operating_unit_id: "1",
      description: "Some description",
      goals: "Some goals",
      outcomes: "Some outcomes",
      purpose: "Some purpose",
      expected_outputs: "some expected outputs",
      spatial_coverage_id: "1",
      regions: [
        {
          id: 1,
          target_2016: 1000
        }
      ],
      provinces: [1,2,3],
      target_start_year: null,
      target_end_year: null,
      implementation_start_date: null,
      implementation_end_date: null,
      total_project_cost: null,
      status_update: null,
      pip: true,
      cip: true,
      trip: true,
      rdip: true,
      pcip: true,
      bases: ["1","2"],
      tier_id: "1",
      typology_id: "1",
      project_status_id: "1",
      beneficiaries: "Some beneficiaries",
      employment_generated: "Some employment generated",
      implementation_mode_id: "1",
      implementation_risk: "Some risks",
      mitigation_strategy: "Some strategies",
      cities_municipalities: "Some cities and municipalities",
      financial_benefit_cost_ratio: 1.7,
      financial_internal_rate_return: 0.18,
      financial_net_present_value: 1000000,
      economic_benefit_cost_ratio: 1.9,
      economic_internal_rate_return: 0.25,
      economic_net_present_value: 1500000,
      clearinghouse: true,
      clearinghouse_date: "2020-05-06",
      technical_readinesses: "",
      gad_score: 69,
      target_2016: null,
      target_2017: null,
      target_2018: null,
      target_2019: null,
      target_2020: null,
      target_2021: null,
      target_2022: null,
      target_2023: null,
      target_total: null,
      income_increase: "Cause for income increase",
      neda_submission: false,
      neda_submission_date: "2020-05-16",
      neda_secretariat_review: false,
      neda_secretariat_review_date: "2020-05-16",
      icc_endorsed: false,
      icc_endorsed_date: "2020-05-16",
      icc_approved: false,
      icc_approved_date: "2020-05-16",
      neda_board: false,
      neda_board_date: "2020-05-16",
      fundingSources: [],
      updates: [
        {
          updates: "New updates",
          update_date: "2020-05-16"
        }
      ]
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
      const {
        title,
        type_id,
        pipol_url,
        pipol_code,
        pip,
        cip,
        trip,
        operating_unit_id,
        implementation_mode_id,
        project_status_id,
        typology_id,
        tier_id,
        spatial_coverage_id,
        cities_municipalities,
        rdip,
        pcip,
        description,
        goals,
        outcomes,
        purpose,
        expected_outputs,
        beneficiaries,
        employment_generated,
        target_start_year,
        target_end_year,
        implementation_start_date,
        implementation_end_date,
        clearinghouse,
        clearinghouse_date,
        total_project_cost,
        implementation_risk,
        mitigation_strategy,
        income_increase,
        gad_score,
        estimated_project_life,
        financial_benefit_cost_ratio,
        financial_internal_rate_return,
        financial_net_present_value,
        economic_benefit_cost_ratio,
        economic_internal_rate_return,
        economic_net_present_value,
        bases,
        ten_point_agenda,
        regions,
        provinces,
        total_investment,
        infrastructure_investment,
        cip_processing,
        sustainable_development_goals,
        funding_sources,
        feasibility_study,
        resettlement_action_plan,
        right_of_way,
        updates
      } = this.$data;

      const financial_net_present_value_float = this.convertMoneyToFloat(financial_net_present_value);
      const economic_net_present_value_float = this.convertMoneyToFloat(economic_net_present_value);

      this.$apollo
        .mutate({
          mutation: CREATE_PROJECT,
          variables: {
            title: title,
            type_id: type_id,
            pipol_url: pipol_url,
            pipol_code: pipol_code,
            pip: pip,
            cip: cip,
            trip: trip,
            operating_unit_id: operating_unit_id,
            implementation_mode_id: implementation_mode_id,
            project_status_id: project_status_id,
            typology_id: typology_id,
            tier_id: tier_id,
            spatial_coverage_id: spatial_coverage_id,
            cities_municipalities: cities_municipalities,
            rdip: rdip,
            pcip: pcip,
            description: description,
            goals: goals,
            outcomes: outcomes,
            purpose: purpose,
            expected_outputs: expected_outputs,
            beneficiaries: beneficiaries,
            employment_generated: employment_generated,
            target_start_year: target_start_year,
            target_end_year: target_end_year,
            implementation_start_date: implementation_start_date,
            implementation_end_date: implementation_end_date,
            clearinghouse: clearinghouse,
            clearinghouse_date: clearinghouse_date,
            total_project_cost: total_project_cost,
            implementation_risk: implementation_risk,
            mitigation_strategy: mitigation_strategy,
            income_increase: income_increase,
            gad_score: gad_score,
            estimated_project_life: estimated_project_life,
            financial_benefit_cost_ratio: financial_benefit_cost_ratio,
            financial_internal_rate_return: financial_internal_rate_return,
            financial_net_present_value: financial_net_present_value_float,
            economic_benefit_cost_ratio: economic_benefit_cost_ratio,
            economic_internal_rate_return: economic_internal_rate_return,
            economic_net_present_value: economic_net_present_value_float,
            bases: {
              connect: bases
            },
            ten_point_agenda: ten_point_agenda,
            regions: {
              connect: regions
            },
            provinces: {
              connect: provinces
            },
            total_investment: total_investment,
            infrastructure_investment: infrastructure_investment,
            cip_processing: cip_processing,
            sustainable_development_goals: sustainable_development_goals,
            funding_sources: funding_sources,
            feasibility_study: feasibility_study,
            resettlement_action_plan: resettlement_action_plan,
            right_of_way: right_of_way,
            updates: {
              create: [
                {
                  updates: updates,
                  update_date: update_date
                }
              ]
            }
          }
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
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
    },
    addFundingSourceToProject() {
      const {
        funding_source,
        target_2016,
        target_2017,
        target_2018,
        target_2019,
        target_2020,
        target_2021,
        target_2022,
        target_2023,
        target_total
      } = this.$data;
      this.fundingSources.push({
        funding_source: funding_source,
        target_2016: target_2016,
        target_2017: target_2017,
        target_2018: target_2018,
        target_2019: target_2019,
        target_2020: target_2020,
        target_2021: target_2021,
        target_2022: target_2022,
        target_2023: target_2023,
        target_total: target_total
      });
    },
    convertMoneyToFloat(val) {
      const converted = val.replace(/^\W|,/g,"");
    
      return parseFloat(converted);
    },
    jumpTo(refName) {
      var element = this.$el[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    }
  },
  beforeRouteLeave(to, from, next) {
    Dialog.create({
      title: "Warning",
      message:
        "Are you sure you want to leave this page? You may have unsaved changes.",
      cancel: true,
      transitionShow: "fade",
      transitionHide: "fade"
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

.q-table th,
.q-table td {
  padding: 5px !important;
}
</style>
