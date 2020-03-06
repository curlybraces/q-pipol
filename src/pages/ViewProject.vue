<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <div v-if="loading">Loading</div>
      <q-card square class="col q-mt-sm q-pa-md q-gutter-y-md" v-else>
        <pre>
          {{ project }}
        </pre>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: {
    PageBreadcrumbs
  },
  name: "ViewProject",
  computed: {
    ...mapState("project", ["project", "loading"])
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
          title: "View Project"
        }
      ]
    };
  },
  methods: {
    ...mapActions("project", ["fetchProject"])
  },
  created() {
    this.fetchProject(this.$route.params.id);
  }
};
</script>
