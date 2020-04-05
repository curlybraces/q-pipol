<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-4 q-pa-sm">
        <pre>
          {{ project }}
        </pre>
      </div>

      <div class="col-8 q-pa-sm">
        <q-card square>
          <q-form @submit.prevent="validateAndCreate" ref="form">
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
                <div class="text-negative text-caption q-my-md">
                  * All information here are required.
                </div>

                <basic-information />

                <stepper-navigation @next="step = 2">
                  <q-btn
                    outline
                    color="orange-10"
                    label="Save Project"
                    class="q-ml-md"
                    @click="validateAndCreate"
                    :loading="loading"
                  />
                </stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                prefix="2"
                title="Programming Documents"
                caption="Documents where the PAP are included"
                :done="programmingDocumentsDone"
                done-color="positive"
              >
                <programming-documents :dense="dense" />

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
                <additional-information :dense="dense" />

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
                <financial-analysis :dense="dense" />

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

                <target-investment />

                <funding-sources :dense="dense" />

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
                    <text-input
                      label="Updates"
                      type="textarea"
                      v-model="updates"
                    />
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

              <q-step
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
                    label="Save Project"
                    color="orange-10"
                    :loading="loading"
                  />
                </div>
              </q-step>
            </q-stepper>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import {
  IMPLEMENTATION_BASES,
  IMPLEMENTATION_MODES,
  TIERS,
  TECHNICAL_READINESSES
} from '../data/dropdown-values';

export default {
  components: {
    'single-select': () => import('../components/FormInputs/SingleSelect.vue'),
    'date-input': () => import('../components/FormInputs/DateInput.vue'),
    'text-input': () => import('../components/FormInputs/TextInput.vue'),
    'stepper-navigation': () =>
      import('../components/Projects/StepperNavigation.vue'),
    'region-financial': () =>
      import('../components/Projects/RegionFinancial/RegionFinancial.vue'),
    'financial-accomplishment': () =>
      import('../components/Projects/FinancialAccomplishment.vue'),
    'technical-readiness': () =>
      import('../components/Projects/TechnicalReadiness.vue'),
    'basic-information': () =>
      import('../components/Projects/BasicInformation.vue'),
    'spatial-coverage': () =>
      import('../components/Projects/SpatialCoverage.vue'),
    'implementation-period': () =>
      import('../components/Projects/ImplementationPeriod.vue'),
    'financial-analysis': () =>
      import('../components/Projects/FinancialAnalysis.vue'),
    'programming-documents': () =>
      import('../components/Projects/ProgrammingDocuments.vue'),
    'additional-information': () =>
      import('../components/Projects/AdditionalInformation.vue'),
    'funding-sources': () =>
      import('../components/Projects/FundingSources/FundingSources.vue'),
    'target-investment': () =>
      import('../components/Projects/TargetInvestment.vue')
  },
  name: 'PageAddProject',
  methods: {
    ...mapActions('project', ['createProject', 'clearProject']),
    validateAndCreate() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createProject();
        }
      });
    }
  },
  computed: {
    ...mapFields('project', [
      'project',
      'project.title',
      'project.type_id',
      'project.project_status_id',
      'project.total_project_cost',
      'project.tier_id',
      'project.implementation_mode_id',
      'project.technical_readinesses',
      'project.updates',
      'project.updates_date'
    ]),
    ...mapState('project', ['loading']),
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
          title: 'Home',
          url: '/'
        },
        {
          title: 'Projects',
          url: '/pip'
        },
        {
          title: 'Add Project'
        }
      ],
      IMPLEMENTATION_BASES,
      IMPLEMENTATION_MODES,
      TIERS,
      TECHNICAL_READINESSES,
      dense: false,
      expanded: false,
      filteredProvinces: [],
      step: 1
    };
  },
  mounted() {
    this.clearProject();
  }
};
</script>
