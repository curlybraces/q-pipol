<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="col">
      <add-project
        :project.sync="project"
        @save="saveProject"
        @showHelp="helpDialog = true"
      >
      </add-project>
    </div>

    <q-dialog
      v-model="helpDialog"
      transition-hide="fade"
      transition-show="fade"
      v-close-popup
    >
      <help-dialog></help-dialog>
    </q-dialog>
  </q-page>
</template>

<script>
import { CREATE_PROJECT } from "../constants/graphql.js";
import { Loading } from "quasar";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "add-project": () => import("../components/Projects/AddProject.vue"),
    "help-dialog": () => import("../components/Projects/HelpDialog.vue")
  },
  name: "PageAddProject",
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
      helpDialog: false,
      initialState: {
        pip: false,
        cip: false,
        trip: false,
        rdip: false,
        pcip: false,
        afmip: false,
        title: "",
        operating_unit_id: "",
        implementation_mode_id: "",
        type_id: "",
        tier_id: "",
        typology_id: "",
        description: "",
        goals: "",
        outcomes: "",
        purpose: "",
        expected_outputs: "",
        bases: [],
        beneficiaries: "",
        employment_generated: "",
        spatial_coverage_id: "",
        regions: [],
        funding_sources: [],
        provinces: [],
        cities_municipalities: "",
        clearinghouse: false,
        clearinghouse_date: "",
        implementation_risk: "",
        mitigation_strategy: "",
        target_start_year: "",
        target_end_year: "",
        gad_score: "",
        neda_submission: false,
        neda_submission_date: "",
        neda_secretariat_review: false,
        neda_secretariat_review_date: "",
        icc_endorsed: false,
        icc_endorsed_date: "",
        icc_approved: false,
        icc_approved_date: "",
        neda_board: false,
        neda_board_date: "",
        estimated_project_life: "",
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
        updates: "",
        updates_date: ""
      },
      loading: false,
      project: {}
    };
  },
  methods: {
    saveProject() {
      const { project } = this.$data;
      Loading.show();
      this.$apollo
        .mutate({
          mutation: CREATE_PROJECT,
          variables: {
            pip: project.pip,
            cip: project.cip,
            trip: project.trip,
            title: project.title,
            type_id: project.type_id,
            operating_unit_id: project.operating_unit_id,
            implementation_mode_id: project.implementation_mode_id,
            project_status_id: project.project_status_id,
            typology_id: project.typology_id,
            tier_id: project.tier_id,
            spatial_coverage_id: project.spatial_coverage_id,
            cities_municipalities: project.cities_municipalities,
            rdip: project.rdip,
            pcip: project.pcip,
            description: project.description,
            components: project.components,
            goals: project.goals,
            outcomes: project.outcomes,
            purpose: project.purpose,
            expected_outputs: project.expected_outputs,
            beneficiaries: project.beneficiaries,
            employment_generated: project.employment_generated,
            target_start_year: project.target_start_year,
            target_end_year: project.target_end_year,
            implementation_start_date: project.implementation_start_date,
            implementation_end_date: project.implementation_end_date,
            clearinghouse: project.clearinghouse,
            clearinghouse_date: project.clearinghouse_date,
            total_project_cost: this.convertToNumber(
              project.total_project_cost
            ),
            implementation_risk: project.implementation_risk,
            mitigation_strategy: project.mitigation_strategy,
            income_increase: project.income_increase,
            gad_score: project.gad_score,
            estimated_project_life: project.estimated_project_life,
            financial_benefit_cost_ratio: project.financial_benefit_cost_ratio,
            financial_internal_rate_return:
              project.financial_internal_rate_return,
            financial_net_present_value: project.financial_net_present_value,
            economic_benefit_cost_ratio: project.economic_benefit_cost_ratio,
            economic_internal_rate_return:
              project.economic_internal_rate_return,
            economic_net_present_value: project.economic_net_present_value,
            bases: {
              connect: project.bases
            },
            regions: project.regions,
            provinces: project.provinces,
            funding_sources: project.funding_sources,
            updates: project.updates,
            updates_date: project.updates_date
          }
        })
        .then(data => {
          console.log(data);
          this.onReset();
        })
        .catch(err => {
          console.log(err.message);
        })
        .finally(() => {
          Loading.hide();
        });
    },
    onReset() {
      this.project = Object.assign({}, this.initialState);
    },
    convertToNumber(val) {
      return val.replace(/,/g, "");
    }
  },
  created() {
    this.project = Object.assign({}, this.initialState);
  }
};
</script>
