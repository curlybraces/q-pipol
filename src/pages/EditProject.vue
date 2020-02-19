<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="col">
      <edit-project @save="saveProject"></edit-project>
    </div>
  </q-page>
</template>

<script>
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
    saveProject() {
      console.log("update project");
    }
  },
  created() {}
};
</script>
