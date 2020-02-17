<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <div class="col-6">
        <add-project :project.sync="project"></add-project>
      </div>
      <div class="col-6">
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
        updates: [
          {
            updates: "",
            update_date: ""
          }
        ]
      }
    }
  }
};
</script>
