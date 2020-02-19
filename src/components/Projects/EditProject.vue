<template>
  <q-card square flat>
    <card-header>
      Add Project
    </card-header>

    <ApolloQuery
      :query="require('src/graphql/queries/project.gql')"
      :variables="{ id: $route.params.id }"
    >
      <template
        v-slot="{
          result: {
            data: { project }
          }
        }"
      >
        <pre>{{ project }}</pre>
        <q-form class="q-pa-md q-gutter-md">
          <q-item-label header>GENERAL INFORMATION</q-item-label>

          <div class="row justify-around">
            <checkbox-input v-model="project.pip" label="PIP" />
            <checkbox-input v-model="project.cip" label="CIP" />
            <checkbox-input v-model="project.trip" label="TRIP" />
            <checkbox-input v-model="project.rdip" label="RDIP" />
            <checkbox-input v-model="project.pcip" label="PCIP" />
          </div>

          <text-input
            v-model="project.title"
            label="Program/Project Title"
            :dense="dense"
            hint="The title of the program or project"
            maxlength="250"
            required
          />

          <q-option-group
            v-model="project.type_id"
            label="Type"
            :options="TYPES"
            inline
            :dense="dense"
            color="orange-10"
          ></q-option-group>

          <single-select
            v-model="project.operating_unit_id"
            label="Implementing Agency"
            :dense="dense"
            :options-dense="dense"
            :options="OPERATING_UNITS"
            hint="Proponent of the program/project"
          />

          <single-select
            v-model="project.tier_id"
            label="Tier"
            :dense="dense"
            :options-dense="dense"
            :options="TIERS"
          ></single-select>

          <single-select
            v-model="project.implementation_mode_id"
            label="Implementation Mode"
            :dense="dense"
            :options-dense="dense"
            :options="IMPLEMENTATION_MODES"
          ></single-select>

          <single-select
            v-model="project.spatial_coverage_id"
            label="Spatial Coverage"
            :dense="dense"
            :options-dense="dense"
            :options="SPATIAL_COVERAGES"
          ></single-select>

          <text-input
            v-model="project.cities_municipalities"
            label="Cities and Municipalities"
            type="textarea"
          />

          <text-input
            v-model="project.description"
            label="Description"
            type="textarea"
          />

          <text-input v-model="project.goals" label="Goals" type="textarea" />

          <text-input
            v-model="project.outcomes"
            label="Outcomes"
            type="textarea"
          />
        </q-form>
      </template>
    </ApolloQuery>

    <card-actions>
      <q-btn label="Save" @click="$emit('save')" color="primary" />
    </card-actions>
  </q-card>
</template>

<script>
import {
  IMPLEMENTATION_BASES,
  IMPLEMENTATION_MODES,
  SPATIAL_COVERAGES,
  STATUSES,
  TIERS,
  TYPES,
  TYPOLOGIES,
  OPERATING_UNITS,
  TECHNICAL_READINESSES,
  YEARS
} from "../../data/dropdown-values";

export default {
  components: {
    "card-header": () => import("./Shared/CardHeader.vue"),
    "card-actions": () => import("./Shared/CardActions.vue"),
    "single-select": () => import("../FormInputs/SingleSelect.vue"),
    // "multi-select": () => import("../FormInputs/MultiSelect.vue"),
    // "date-input": () => import("../FormInputs/DateInput.vue"),
    // "money-input": () => import("../FormInputs/MoneyInput.vue"),
    // "number-input": () => import("../FormInputs/NumberInput.vue"),
    "text-input": () => import("../FormInputs/TextInput.vue"),
    // "add-item": () => import("./Shared/AddItem.vue"),
    // "fund-source": () => import("./Shared/FundSource.vue"),
    "checkbox-input": () => import("../FormInputs/CheckboxInput.vue")
    // "financial-accomplishment": () =>
    //   import("./Shared/FinancialAccomplishment.vue")
  },
  name: "EditProject",
  data() {
    return {
      IMPLEMENTATION_BASES,
      IMPLEMENTATION_MODES,
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      STATUSES,
      TECHNICAL_READINESSES,
      TIERS,
      TYPES,
      TYPOLOGIES,
      YEARS,
      filteredProvinces: [],
      dense: false,
      addRegionDialog: false,
      fundSourceToAdd: {
        id: "",
        target_2016: "",
        target_2017: "",
        target_2018: "",
        target_2019: "",
        target_2020: "",
        target_2021: "",
        target_2022: "",
        target_2023: "",
        target_total: ""
      },
      regionToAdd: {
        id: "",
        target_2016: "",
        target_2017: "",
        target_2018: "",
        target_2019: "",
        target_2020: "",
        target_2021: "",
        target_2022: "",
        target_2023: "",
        target_total: ""
      },
      financialAccomplishment: {
        nep_2017: "",
        nep_2018: "",
        nep_2019: "",
        nep_2020: "",
        nep_2021: "",
        nep_2022: "",
        nep_total: "",
        gaa_2017: "",
        gaa_2018: "",
        gaa_2019: "",
        gaa_2020: "",
        gaa_2021: "",
        gaa_2022: "",
        gaa_total: "",
        disbursement_2017: "",
        disbursement_2018: "",
        disbursement_2019: "",
        disbursement_2020: "",
        disbursement_2021: "",
        disbursement_2022: "",
        disbursement_total: ""
      },
      updateFinancialAccomplishmentDialog: false,
      addFundSourceDialog: false,
      loading: 1, // initializing variable for loading
      result: {}
    };
  },
  methods: {
    addRegion() {
      this.addRegionDialog = true;
    },
    addToRegion() {
      this.projectToSubmit.regions.push({
        ...this.regionToAdd
      });
      this.addRegionDialog = false;
    },
    addFundSource() {
      this.addFundSourceDialog = true;
    },
    addToFundSource() {
      this.projectToSubmit.funding_sources.push({
        ...this.fundSourceToAdd
      });
      this.addFundSourceDialog = false;
    }
  }
};
</script>

<style>
.q-table th,
.q-table td {
  padding: 5px !important;
}
</style>
