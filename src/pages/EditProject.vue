<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card square flat>
      <card-header>
        Edit Project
      </card-header>

      <div v-if="$apollo.loading">Loading...</div>

      <div class="row">
        <q-form class="col-6 q-pa-md q-gutter-md">
          <q-card>
            <q-item-label header>
              Programming Documents
            </q-item-label>
            <q-list>
              <checkbox-item
                v-model="project.pip"
                label="PIP"
                description="Public Investment Program"
              />
              <checkbox-item
                v-model="project.cip"
                label="CIP"
                description="Core Investment Program"
              />
              <checkbox-item
                v-model="project.trip"
                label="TRIP"
                description="Three-Year Rolling Investment Program"
              />
              <checkbox-item
                v-model="project.rdip"
                label="RDIP"
                description="Regional Development Investment Program"
              />
              <checkbox-item
                v-model="project.pcip"
                label="PCIP"
                description="Provincial Commodity Investment Plan"
              />
              <checkbox-item
                v-model="project.afmip"
                label="AFMIP"
                description="Agriculture and Fisheries Modernization and Industrialization Plan"
              />
            </q-list>
          </q-card>

          <q-card>
            <q-item-label header>
              General Information
            </q-item-label>

            <div class="q-px-md q-gutter-y-md">
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

              <text-input
                v-model="project.description"
                label="Description"
                type="textarea"
              />

              <text-input
                v-model="project.goals"
                label="Goals"
                type="textarea"
              />

              <text-input
                v-model="project.outcomes"
                label="Outcomes"
                type="textarea"
              />

              <text-input
                v-model="project.purpose"
                label="Purpose"
                type="textarea"
              />

              <text-input
                v-model="project.expected_outputs"
                label="Expected Outputs"
                type="textarea"
              />
            </div>
          </q-card>

          <q-card class="q-pa-md q-gutter-y-md">
            <q-card-section class="text-weight-bolder">
              Categorization
            </q-card-section>
          </q-card>

          <q-card class="q-pa-md q-gutter-y-md">
            <q-card-section class="text-weight-bolder">
              Spatial Coverage
            </q-card-section>

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
          </q-card>

          <q-card class="q-pa-md q-gutter-y-md">
            <q-card-section class="text-weight-bolder">
              Project Status
            </q-card-section>

            <single-select
              v-model="project.project_status_id"
              label="Status of the Project"
              :dense="dense"
              :options-dense="dense"
              :options="STATUSES"
            ></single-select>

            <text-input
              v-model="project.cities_municipalities"
              label="Cities and Municipalities"
              type="textarea"
            />
          </q-card>

          <q-card>
            <q-card-section class="text-weight-bolder">
              Financial Information
            </q-card-section>

            <div class="q-pa-md q-gutter-y-md">
              <single-select
                v-model="project.tier_id"
                label="Budget Tier"
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
            </div>
          </q-card>

          <q-card>
            <q-item-label header class="text-weight-bolder">
              Financial &amp; Economic Analysis
            </q-item-label>

            <div class="q-pa-md q-gutter-y-md">
              <text-input
                v-model="project.estimated_project_life"
                label="Estimated Project Life"
              />

              <div class="row q-pt-md q-col-gutter-md">
                <div class="col-6 q-gutter-y-md">
                  <money-input
                    v-model="project.financial_net_present_value"
                    label="Financial Net Present Value"
                  />
                  <number-input
                    v-model="project.financial_benefit_cost_ratio"
                    label="Financial Benefit Cost Ratio"
                  />
                  <number-input
                    v-model="project.financial_internal_rate_return"
                    label="Financial Internal Rate of Return"
                  />
                </div>

                <div class="col-6 q-gutter-y-md">
                  <money-input
                    v-model="project.economic_net_present_value"
                    label="Economic Net Present Value"
                  />
                  <number-input
                    v-model="project.economic_benefit_cost_ratio"
                    label="Economic Benefit Cost Ratio"
                  />
                  <number-input
                    v-model="project.economic_internal_rate_return"
                    label="Economic Internal Rate of Return"
                  />
                </div>
              </div>
            </div>
          </q-card>

          <q-card>
            <q-card-section class="text-weight-bolder">
              Physical &amp; Financial Accomplishments
            </q-card-section>

            <q-markup-table
              flat
              bordered
              separator="cell"
              v-if="
                project.total_investment &&
                  project.total_investment !== 'undefined'
              "
            >
              <thead>
                <th style="width:25%">Year</th>
                <th style="width:25%">NEP</th>
                <th style="width:25%">GAA</th>
                <th style="width:25%">Disbursement</th>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">2017</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2017 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2017 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2017 }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">2018</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2018 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2018 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2018 }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">2019</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2019 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2019 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2019 }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">2020</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2020 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2020 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2020 }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">2021</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2021 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2021 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2021 }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">2022</td>
                  <td class="text-right">
                    {{ project.total_investment.nep_2022 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.gaa_2022 }}
                  </td>
                  <td class="text-right">
                    {{ project.total_investment.disbursement_2022 }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>

            <div class="row q-px-md items-start q-gutter-y-md q-col-gutter-md">
              <text-input
                class="col-9"
                label="Updates"
                type="textarea"
                v-model="project.updates"
              />

              <date-input
                class="col-3"
                label="As of Date"
                v-model="project.updates_date"
              ></date-input>
            </div>
          </q-card>
        </q-form>
        <div class="col-6">
          <pre>{{ projectToEdit }}</pre>
        </div>
      </div>

      <card-actions>
        <q-btn label="Save" @click="$emit('save')" color="primary" />
      </card-actions>
    </q-card>
  </q-page>
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
} from "../data/dropdown-values";
import { FETCH_PROJECT_QUERY } from "../constants/graphql";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "card-header": () => import("../components/Projects/Shared/CardHeader.vue"),
    "card-actions": () =>
      import("../components/Projects/Shared/CardActions.vue"),
    "single-select": () => import("../components/FormInputs/SingleSelect.vue"),
    // "multi-select": () => import("../FormInputs/MultiSelect.vue"),
    "date-input": () => import("../components/FormInputs/DateInput.vue"),
    "money-input": () => import("../components/FormInputs/MoneyInput.vue"),
    "number-input": () => import("../components/FormInputs/NumberInput.vue"),
    "text-input": () => import("../components/FormInputs/TextInput.vue"),
    // "add-item": () => import("../components/Shared/AddItem.vue"),
    // "fund-source": () => import("../components/Shared/FundSource.vue"),
    // "checkbox-input": () => import("../components/FormInputs/CheckboxInput.vue"),
    "checkbox-item": () => import("../components/FormInputs/CheckboxItem.vue")
    // "financial-accomplishment": () => import("../components/Shared/FinancialAccomplishment.vue"),
  },
  name: "PageEditProject",
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
          title: "Edit Project"
        }
      ],
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
      total_investment: {
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
      projectToEdit: {}
    };
  },
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      result({ data }) {
        this.projectToEdit = Object.assign({}, data);
      }
    }
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
