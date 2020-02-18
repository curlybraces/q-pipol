<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="col">
      <add-project :project.sync="project" @save="saveProject"></add-project>
    </div>
  </q-page>
</template>

<script>
import { CREATE_PROJECT } from "../constants/graphql.js";
import { Loading } from "quasar";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "add-project": () => import("../components/Projects/AddProject.vue")
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
      initialState: {
        pip: false,
        cip: false,
        trip: false,
        rdip: false,
        pcip: false,
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
        fund_sources: [],
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
        updates: [
          {
            updates: "",
            update_date: ""
          }
        ]
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
            pipol_url: project.pipol_url,
            pipol_code: project.pipol_code,
            title: project.title,
            type_id: project.type_id,
            updates: {
              create: project.updates
            }
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
    }
  },
  created() {
    this.project = Object.assign({}, this.initialState);
  }
};
</script>
