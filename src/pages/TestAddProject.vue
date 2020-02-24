<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-form>
      <q-stepper v-model="step" vertical animated header-nav>
        <q-step
          color="orange-10"
          :name="1"
          prefix="1"
          title="Basic Information"
          caption="Basic Information"
        >
          <q-item>
            <text-input
              v-model="title"
              label="Program/Project Title"
              :dense="dense"
              hint="The title of the program or project"
              maxlength="250"
              required
            />
          </q-item>
          <q-item>
            <single-select
              v-model="type_id"
              label="Type"
              :options="TYPES"
              inline
              :dense="dense"
              color="orange-10"
            />
          </q-item>
          <q-item>
            <single-select
              v-model="operating_unit_id"
              label="Implementing Agency"
              :dense="dense"
              :options-dense="dense"
              :options="OPERATING_UNITS"
              hint="Proponent of the program/project"
            />
          </q-item>
          <q-item>
            <text-input
              v-model="description"
              label="Description"
              type="textarea"
              :dense="dense"
              hint="Description of the program/project (e.g. location, components, design, etc.)"
            />
          </q-item>
          <q-item>
            <money-input
              label="Total Project Cost"
              outlined
              prefix="PhP"
              v-model="total_project_cost"
              :dense="dense"
              hint="Indicative project cost in absolute PhP"
            ></money-input>
          </q-item>
          <q-item>
            <single-select
              v-model="project_status_id"
              label="Status"
              :dense="dense"
              :options-dense="dense"
              :options="STATUSES"
            />
          </q-item>
          <q-item>
            <single-select
              v-model="typology_id"
              label="Typology"
              :dense="dense"
              :options-dense="dense"
              :options="TYPOLOGIES"
            ></single-select>
          </q-item>
          <q-item>
            <single-select
              v-model="implementation_mode_id"
              label="Implementation Mode"
              :dense="dense"
              :options-dense="dense"
              :options="IMPLEMENTATION_MODES"
            />
          </q-item>

          <stepper-navigation @next="step = 2"></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="2"
          prefix="2"
          title="Programming Documents"
          caption="Documents where the PAP are included"
        >
          <checkbox-item
            v-model="pip"
            label="PIP"
            description="Public Investment Program"
          />
          <checkbox-item
            v-model="cip"
            label="CIP"
            description="Core Investment Program"
          />
          <checkbox-item
            v-model="trip"
            label="TRIP"
            description="Three-Year Rolling Investment Program"
          />
          <checkbox-item
            v-model="rdip"
            label="RDIP"
            description="Regional Development Investment Program"
          />
          <checkbox-item
            v-model="pcip"
            label="PCIP"
            description="Provincial Commodity Investment Plan"
          />
          <checkbox-item
            v-model="afmip"
            label="AFMIP"
            description="Agriculture and Fisheries Modernization and Industrialization Plan"
          />
          <stepper-navigation
            @next="step = 3"
            @back="step = 1"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="3"
          title="Additional Project Information"
          caption="Additional Information"
          prefix="3"
        >
          <q-item>
            <multi-select
              label="Implementation Bases"
              v-model="bases"
              :options-dense="dense"
              :options="IMPLEMENTATION_BASES"
              @clear="bases = []"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="goals"
              label="Goals"
              type="textarea"
              :dense="dense"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="outcomes"
              label="Outcomes"
              type="textarea"
              :dense="dense"
              hint="Desired outcome of the program/project (e.g. Increase productivity)"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="purpose"
              label="Purpose"
              type="textarea"
              :dense="dense"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="expected_outputs"
              label="Expected Outputs"
              type="textarea"
              :dense="dense"
              hint="Physical deliverables of the project (indicate unit)"
            />
          </q-item>

          <stepper-navigation
            @next="step = 4"
            @back="step = 2"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="4"
          title="Spatial Coverage"
          caption="Spatial Coverage"
          prefix="4"
        >
          <q-item>
            <single-select
              v-model="spatial_coverage_id"
              label="Spatial Coverage"
              :dense="dense"
              :options-dense="dense"
              :options="SPATIAL_COVERAGES"
            />
          </q-item>

          <q-item>
            <multi-select
              v-model="provinces"
              label="Province/s"
              :options="PROVINCES"
              :dense="dense"
              :options-dense="dense"
              :readonly="spatial_coverage_id == '1'"
              @clear="provinces = []"
            />
          </q-item>

          <q-item>
            <multi-select
              v-model="districts"
              label="District/s"
              :options="DISTRICTS"
              :dense="dense"
              :options-dense="dense"
              :readonly="spatial_coverage_id == '1'"
              @clear="districts = []"
            />
          </q-item>

          <q-item>
            <text-input
              type="textarea"
              label="Cities and Municipalities"
              v-model="cities_municipalities"
            />
          </q-item>

          <stepper-navigation
            @next="step = 5"
            @back="step = 3"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="5"
          title="Implementation Period"
          caption="Implementation Period"
          prefix="5"
        >
          <q-item>
            <q-item-section class="col-6">
              <single-select
                v-model="target_start_year"
                label="Target Start Year"
                :options="YEARS"
                :dense="dense"
                :options-dense="dense"
              />
            </q-item-section>

            <q-item-section class="col-6">
              <single-select
                v-model="target_end_year"
                label="Target Completion Year"
                :options="YEARS"
                :dense="dense"
                :options-dense="dense"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <date-input
                v-model="implementation_start_date"
                mask="date"
                label="Implementation Start Date"
                hint="Indicate what year the project is expected to start."
              />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                v-model="implementation_end_date"
                label="Implementation End Date"
                :dense="dense"
                hint="Indicate the date when the project is expected to end."
              />
            </q-item-section>
          </q-item>

          <stepper-navigation
            @next="step = 6"
            @back="step = 4"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="6"
          title="Readiness"
          caption=""
          prefix="6"
        >
          <q-item>
            <multi-select
              label="Technical Readiness"
              v-model="technical_readinesses"
              :options="TECHNICAL_READINESSES"
              class="col"
            ></multi-select>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <checkbox-input
                v-model="clearinghouse"
                label="Approved by DA Clearinghouse"
              />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                label="Date Approved by Clearinghouse Committee"
                v-model="clearinghouse_date"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="col-6">
              <checkbox-input
                v-model="neda_submission"
                label="NEDA Submission"
              />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                class="col-6"
                label="Date submitted to NEDA"
                v-model="neda_submission_date"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <checkbox-input
                v-model="neda_secretariat_review"
                label="NEDA Secretariat Review"
              />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                label="Date reviewed by NEDA Secretariat"
                v-model="neda_secretariat_review_date"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <checkbox-input v-model="icc_endorsed" label="ICC Endorsed" />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                label="Date endorsed by ICC"
                v-model="icc_endorsed_date"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <checkbox-input v-model="icc_approved" label="ICC Approved" />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                label="Date approved by the ICC"
                v-model="icc_approved_date"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-6">
              <checkbox-input v-model="neda_board" label="NEDA Board" />
            </q-item-section>
            <q-item-section class="col-6">
              <date-input
                label="Date approved by the NEDA Board"
                v-model="neda_board_date"
              />
            </q-item-section>
          </q-item>

          <stepper-navigation
            @next="step = 7"
            @back="step = 5"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="7"
          title="Financial and Economic Analyses"
          caption="Financial and Economic Analyses"
          prefix="7"
        >
          <div>
            <q-item>
              <text-input label="Beneficiaries" v-model="beneficiaries" />
            </q-item>

            <q-item>
              <text-input
                outlined
                stack-label
                label="Employment Generated"
                v-model="employment_generated"
              />
            </q-item>

            <q-item>
              <number-input
                label="GAD Score"
                type="number"
                v-model="gad_score"
              />
            </q-item>

            <q-item>
              <text-input
                label="Implementation Risks"
                type="textarea"
                v-model="implementation_risk"
              />
            </q-item>

            <q-item>
              <text-input
                label="Mitigation Strategies"
                type="textarea"
                v-model="mitigation_strategy"
              />
            </q-item>

            <q-item>
              <text-input
                label="Estimated Project Life"
                v-model="estimated_project_life"
              />
            </q-item>

            <q-item>
              <q-item-section class="col-6 q-gutter-y-md">
                <money-input
                  label="Financial Net Present Value (FNPV)"
                  v-model="financial_net_present_value"
                  :dense="dense"
                ></money-input>

                <number-input
                  label="Financial Benefit-Cost Ratio (FBCR)"
                  v-model="financial_benefit_cost_ratio"
                  :dense="dense"
                />

                <number-input
                  label="Financial Internal Rate of Return (FIRR)"
                  v-model="financial_internal_rate_return"
                  :dense="dense"
                  suffix="%"
                />
              </q-item-section>

              <q-item-section class="col-6 q-gutter-y-md">
                <money-input
                  label="Economic Net Present Value (ENPV)"
                  v-model="economic_net_present_value"
                  :dense="dense"
                ></money-input>

                <number-input
                  label="Economic Benefit-Cost Ratio (EBCR)"
                  v-model="economic_benefit_cost_ratio"
                  :dense="dense"
                />

                <number-input
                  label="Economic Internal Rate Return (EIRR)"
                  v-model="economic_internal_rate_return"
                  :dense="dense"
                  suffix="%"
                />
              </q-item-section>
            </q-item>
          </div>

          <stepper-navigation
            @next="step = 8"
            @back="step = 6"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="8"
          title="Financial Information"
          caption="Financial Information"
          prefix="8"
        >
          <q-markup-table
            v-if="funding_sources.length"
            flat
            bordered
            separator="cell"
          >
            <thead>
              <th>Fund Source</th>
              <th>2016</th>
              <th>2017</th>
              <th>2018</th>
              <th>2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2022</th>
              <th>2023</th>
              <th>Total</th>
            </thead>
            <tbody>
              <tr
                v-for="funding_source in funding_sources"
                :key="funding_source.item.value"
              >
                <th>{{ funding_source.item.label }}</th>
                <th>{{ funding_source.target_2016 }}</th>
                <th>{{ funding_source.target_2017 }}</th>
                <th>{{ funding_source.target_2018 }}</th>
                <th>{{ funding_source.target_2019 }}</th>
                <th>{{ funding_source.target_2020 }}</th>
                <th>{{ funding_source.target_2021 }}</th>
                <th>{{ funding_source.target_2022 }}</th>
                <th>{{ funding_source.target_2023 }}</th>
                <th>{{ funding_source.target_total }}</th>
              </tr>
            </tbody>
          </q-markup-table>

          <q-item-label header>
            Regional Investment
            <q-icon
              name="edit"
              label="Add Region"
              class="cursor-pointer"
              color="primary"
            />
          </q-item-label>

          <q-markup-table v-if="regions.length" flat bordered separator="cell">
            <thead>
              <th>Region</th>
              <th>2016</th>
              <th>2017</th>
              <th>2018</th>
              <th>2019</th>
              <th>2020</th>
              <th>2021</th>
              <th>2022</th>
              <th>2023</th>
              <th>Total</th>
            </thead>
            <tbody>
              <tr v-for="region in regions" :key="region.item.value">
                <th>{{ region.item.label }}</th>
                <th>{{ region.target_2016 }}</th>
                <th>{{ region.target_2017 }}</th>
                <th>{{ region.target_2018 }}</th>
                <th>{{ region.target_2019 }}</th>
                <th>{{ region.target_2020 }}</th>
                <th>{{ region.target_2021 }}</th>
                <th>{{ region.target_2022 }}</th>
                <th>{{ region.target_2023 }}</th>
                <th>{{ region.target_total }}</th>
              </tr>
            </tbody>
          </q-markup-table>

          <q-markup-table flat bordered separator="cell">
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
                  {{ nep_2017 }}
                </td>
                <td class="text-right">
                  {{ gaa_2017 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2017 }}
                </td>
              </tr>
              <tr>
                <td class="text-center">2018</td>
                <td class="text-right">
                  {{ nep_2018 }}
                </td>
                <td class="text-right">
                  {{ gaa_2018 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2018 }}
                </td>
              </tr>
              <tr>
                <td class="text-center">2019</td>
                <td class="text-right">
                  {{ nep_2019 }}
                </td>
                <td class="text-right">
                  {{ gaa_2019 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2019 }}
                </td>
              </tr>
              <tr>
                <td class="text-center">2020</td>
                <td class="text-right">
                  {{ nep_2020 }}
                </td>
                <td class="text-right">
                  {{ gaa_2020 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2020 }}
                </td>
              </tr>
              <tr>
                <td class="text-center">2021</td>
                <td class="text-right">
                  {{ nep_2021 }}
                </td>
                <td class="text-right">
                  {{ gaa_2021 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2021 }}
                </td>
              </tr>
              <tr>
                <td class="text-center">2022</td>
                <td class="text-right">
                  {{ nep_2022 }}
                </td>
                <td class="text-right">
                  {{ gaa_2022 }}
                </td>
                <td class="text-right">
                  {{ disbursement_2022 }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <stepper-navigation
            @next="step = 9"
            @back="step = 7"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          color="orange-10"
          :name="9"
          title="Updates"
          caption="Updates"
          prefix="9"
        >
          <q-item>
            <single-select
              v-model="tier_id"
              label="Tier"
              :dense="dense"
              :options-dense="dense"
              :options="TIERS"
            />
          </q-item>
          <q-item>
            <q-item-section class="col-9">
              <text-input label="Updates" type="textarea" v-model="updates" />
            </q-item-section>
            <q-item-section class="col-3" top>
              <date-input
                label="As of Date"
                v-model="updates_date"
              ></date-input>
            </q-item-section>
          </q-item>
          <q-stepper-navigation>
            <q-btn
              color="orange-10"
              @click="step = 10"
              label="Finish"
              class="q-ml-sm"
            />
            <q-btn color="orange-5" flat @click="step = 8" label="Back" />
          </q-stepper-navigation>
        </q-step>
        <q-step
          color="orange-10"
          :name="10"
          title="Submit"
          caption="Save project"
          prefix="10"
        >
          <div class="row q-pa-md q-gutter-md justify-center">
            <q-btn
              flat
              @click="step = 1"
              label="Go back to Start"
              color="orange-10"
            />
            <q-btn
              type="submit"
              @click="createProject"
              label="Save Project"
              color="orange-10"
            />
          </div>
        </q-step>
      </q-stepper>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import {
  DISTRICTS,
  IMPLEMENTATION_BASES,
  IMPLEMENTATION_MODES,
  PROVINCES,
  SPATIAL_COVERAGES,
  STATUSES,
  TIERS,
  TYPES,
  TYPOLOGIES,
  OPERATING_UNITS,
  TECHNICAL_READINESSES,
  YEARS
} from "../data/dropdown-values";

export default {
  components: {
    "single-select": () => import("../components/FormInputs/SingleSelect.vue"),
    "multi-select": () => import("../components/FormInputs/MultiSelect.vue"),
    "date-input": () => import("../components/FormInputs/DateInput.vue"),
    "money-input": () => import("../components/FormInputs/MoneyInput.vue"),
    "number-input": () => import("../components/FormInputs/NumberInput.vue"),
    "text-input": () => import("../components/FormInputs/TextInput.vue"),
    "checkbox-input": () =>
      import("../components/FormInputs/CheckboxInput.vue"),
    "checkbox-item": () => import("../components/FormInputs/CheckboxItem.vue"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "stepper-navigation": () =>
      import("../components/Projects/StepperNavigation.vue")
  },
  name: "PageAddProject",
  methods: {
    ...mapActions("project", ["createProject"])
  },
  computed: {
    ...mapFields("project", [
      "project",
      "project.title",
      "project.type_id",
      "project.description",
      "project.goals",
      "project.outcomes",
      "project.purpose",
      "project.expected_outputs",
      "project.beneficiaries",
      "project.employment_generated",
      "project.spatial_coverage_id",
      "project.gad_score",
      "project.project_status_id",
      "project.total_project_cost",
      "project.target_start_year",
      "project.target_end_year",
      "project.implementation_start_date",
      "project.implementation_end_date",
      "project.cities_municipalities",
      "project.pip",
      "project.cip",
      "project.trip",
      "project.rdip",
      "project.pcip",
      "project.afmip",
      "project.operating_unit_id",
      "project.typology_id",
      "project.tier_id",
      "project.implementation_mode_id",
      "project.estimated_project_life",
      "project.financial_benefit_cost_ratio",
      "project.financial_net_present_value",
      "project.financial_internal_rate_return",
      "project.economic_benefit_cost_ratio",
      "project.economic_net_present_value",
      "project.economic_internal_rate_return",
      "project.bases",
      "project.regions",
      "project.districts",
      "project.funding_sources",
      "project.implementation_risk",
      "project.mitigation_strategy",
      "project.clearinghouse",
      "project.clearinghouse_date",
      "project.neda_submission",
      "project.neda_submission_date",
      "project.neda_secretariat_review",
      "project.neda_secretariat_review_date",
      "project.neda_board",
      "project.neda_board_date",
      "project.icc_approved",
      "project.icc_approved_date",
      "project.icc_endorsed",
      "project.icc_endorsed_date",
      "project.nep_2017",
      "project.nep_2018",
      "project.nep_2019",
      "project.nep_2020",
      "project.nep_2021",
      "project.nep_2022",
      "project.nep_2023",
      "project.nep_total",
      "project.gaa_2017",
      "project.gaa_2018",
      "project.gaa_2019",
      "project.gaa_2020",
      "project.gaa_2021",
      "project.gaa_2022",
      "project.disbursement_2017",
      "project.disbursement_2018",
      "project.disbursement_2019",
      "project.disbursement_2020",
      "project.disbursement_2021",
      "project.disbursement_2022",
      "project.technical_readinesses",
      "project.provinces",
      "project.updates",
      "project.updates_date"
    ])
  },
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
      DISTRICTS,
      IMPLEMENTATION_BASES,
      IMPLEMENTATION_MODES,
      PROVINCES,
      SPATIAL_COVERAGES,
      STATUSES,
      TIERS,
      TYPES,
      TYPOLOGIES,
      OPERATING_UNITS,
      TECHNICAL_READINESSES,
      YEARS,
      dense: false,
      expanded: false,
      filteredProvinces: [],
      step: null
    };
  }
};
</script>
