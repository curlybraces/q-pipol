<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div v-if="loading">Loading</div>

    <div class="q-pa-sm" v-else>
      <q-card square>
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>Project Profile</q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">{{ project.title }}</div>
          <div class="text-subtitle2">{{ project.operating_unit.name }}</div>
        </q-card-section>

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
