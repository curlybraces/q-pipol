<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <div class="col-8">
        <add-project :project.sync="project"></add-project>
      </div>
      <div class="col-4">
        <pre>
          {{ project }}
        </pre>
      </div>
    </div>
  </q-page>
</template>

<script>
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
      project: {
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
        updates: [
          {
            updates: "",
            update_date: ""
          }
        ]
      }
    };
  }
};
</script>
