<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    {{ project }}
    <div class="col">
      <edit-project :project.sync="project" @save="saveProject"></edit-project>
    </div>
  </q-page>
</template>

<script>
import { VIEW_PROJECT } from "../constants/graphql.js";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "edit-project": () => import("../components/Projects/EditProject.vue")
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
      project: {}
    };
  },
  methods: {
    loadProject() {
      this.$apollo
        .query({
          query: VIEW_PROJECT,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(data => {
          this.project = Object.assign({}, data.data.project);
        });
    },
    saveProject() {
      console.log("update project");
    }
  },
  created() {
    this.loadProject();
  }
};
</script>
