<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <pre>{{ project }}</pre>
    <q-form>
      <q-stepper
        v-model="step"
        vertical
        animated
        header-nav
        active-color="orange-10"
        inactive-color="grey-9"
      >
        <q-step
          :name="1"
          prefix="1"
          title="Basic Information"
          caption="Basic Information"
          :done="basicInformationDone"
          done-color="positive"
        >
          <basic-information />

          <stepper-navigation @next="step = 2"></stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          prefix="2"
          title="Programming Documents"
          caption="Documents where the PAP are included"
          :done="programmingDocumentsDone"
          done-color="positive"
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
          :name="4"
          title="Spatial Coverage"
          caption="Spatial Coverage"
          prefix="4"
          :done="spatialCoverageDone"
          done-color="positive"
        >
          <spatial-coverage :dense="dense" />

          <stepper-navigation
            @next="step = 5"
            @back="step = 3"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          :name="5"
          title="Implementation Period"
          caption="Implementation Period"
          prefix="5"
        >
          <implementation-period :dense="dense" />

          <stepper-navigation
            @next="step = 6"
            @back="step = 4"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step :name="6" title="Readiness" caption="" prefix="6">
          <technical-readiness />

          <stepper-navigation
            @next="step = 7"
            @back="step = 5"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
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
          :name="8"
          title="Financial Information"
          caption="Financial Information"
          prefix="8"
        >
          <q-item>
            <single-select
              v-model="implementation_mode_id"
              label="Implementation Mode"
              :dense="dense"
              :options-dense="dense"
              :options="IMPLEMENTATION_MODES"
            />
          </q-item>
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

          <region-financial></region-financial>

          <stepper-navigation
            @next="step = 9"
            @back="step = 7"
            withBack="true"
          ></stepper-navigation>
        </q-step>

        <q-step
          :name="9"
          title="Updates"
          caption="Applicable to Ongoing and Completed Projects Only"
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
          <q-item>
            <q-item-label>Financial Accomplishments</q-item-label>
          </q-item>
          <q-item>
            <financial-accomplishment />
          </q-item>
          <q-stepper-navigation>
            <q-btn
              color="orange-10"
              @click="step = 10"
              label="Finish"
              class="q-mr-sm"
            />
            <q-btn color="orange-5" flat @click="step = 8" label="Back" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="10" title="Submit" caption="Save project" prefix="10">
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
  TIERS,
  TECHNICAL_READINESSES
} from "../data/dropdown-values";

export default {
  components: {
    "single-select": () => import("../components/FormInputs/SingleSelect.vue"),
    "multi-select": () => import("../components/FormInputs/MultiSelect.vue"),
    "date-input": () => import("../components/FormInputs/DateInput.vue"),
    "money-input": () => import("../components/FormInputs/MoneyInput.vue"),
    "number-input": () => import("../components/FormInputs/NumberInput.vue"),
    "text-input": () => import("../components/FormInputs/TextInput.vue"),
    // "checkbox-input": () =>
    // import("../components/FormInputs/CheckboxInput.vue"),
    "checkbox-item": () => import("../components/FormInputs/CheckboxItem.vue"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "stepper-navigation": () =>
      import("../components/Projects/StepperNavigation.vue"),
    "region-financial": () =>
      import("../components/Projects/RegionFinancial.vue"),
    "financial-accomplishment": () =>
      import("../components/Projects/FinancialAccomplishment.vue"),
    "technical-readiness": () =>
      import("../components/Projects/TechnicalReadiness.vue"),
    "basic-information": () =>
      import("../components/Projects/BasicInformation.vue"),
    "spatial-coverage": () =>
      import("../components/Projects/SpatialCoverage.vue"),
    "implementation-period": () =>
      import("../components/Projects/ImplementationPeriod.vue")
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
      "project.gad_score",
      "project.project_status_id",
      "project.total_project_cost",
      "project.pip",
      "project.cip",
      "project.trip",
      "project.rdip",
      "project.pcip",
      "project.afmip",
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
      "project.funding_sources",
      "project.implementation_risk",
      "project.mitigation_strategy",
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
      "project.updates",
      "project.updates_date"
    ]),
    programmingDocumentsDone() {
      return (
        this.pip ||
        this.cip ||
        this.trip ||
        this.rdip ||
        this.pcip ||
        this.afmip
      );
    },
    basicInformationDone() {
      return (
        !!this.title &&
        !!this.operating_unit_id &&
        !!this.description &&
        !!this.type_id &&
        !!this.total_project_cost
      );
    },
    spatialCoverageDone() {
      return !!this.spatial_coverage_id;
    }
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
      TIERS,
      TECHNICAL_READINESSES,
      dense: false,
      expanded: false,
      filteredProvinces: [],
      step: null
    };
  }
};
</script>
