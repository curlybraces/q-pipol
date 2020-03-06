<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <search-component />

    <div class="column q-pa-md bg-green-1 q-mb-md">
      <div class="row">
        <q-btn outline icon="tune" @click="filter = !filter">FILTER</q-btn>
      </div>
      <div
        class="row"
        v-show="filter"
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <div class="col-3">
          <filter-menu title="REGIONS" :options="REGIONS" dense></filter-menu>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-card class="q-pa-sm fit bg-grey-1">
          <div class="row q-pa-sm items-center">
            <span
              class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
              >Projects</span
            >
            <q-space />
            <q-btn
              outline
              label="Add Project"
              icon="create"
              to="/pip/new"
              color="primary"
              v-if="projects.length"
            />
          </div>

          <template v-if="loading">
            <list-placeholder />
          </template>

          <template v-else>
            <div v-if="projects.length === 0">
              <q-banner class="q-my-md bg-grey-3">
                <template v-slot:avatar>
                  <q-icon name="warning" color="red" />
                </template>
                No project added yet.
                <template v-slot:action>
                  <q-btn
                    flat
                    color="primary"
                    label="Add Project"
                    to="/pip/new"
                  />
                </template>
              </q-banner>
            </div>
            <project-item
              v-for="{
                id,
                title,
                description,
                operating_unit,
                total_project_cost
              } in projects"
              :key="id"
              :id="id"
              :title="title"
              :description="description"
              :operating_unit="operating_unit"
              :total_project_cost="total_project_cost"
              @goTo="goTo(id)"
              @promptDelete="promptDelete(id)"
              @editProject="goToEdit(id)"
            ></project-item>

            <div class="row justify-between items-center">
              <div>
                Showing
                {{ (paginatorInfo.currentPage - 1) * paginatorInfo.perPage + 1 }}
                -
                {{
                paginatorInfo.currentPage * paginatorInfo.perPage >
                  paginatorInfo.total
                    ? paginatorInfo.total
                    : currentPage * paginatorInfo.perPage
                }}
                of {{ paginatorInfo.total }} projects
              </div>
              <div v-if="!loading">
                <q-pagination
                  v-model="paginatorInfo.currentPage"
                  :max-pages="5"
                  :max="paginatorInfo.lastPage"
                  boundary-links
                  boundary-numbers
                />
              </div>
            </div>
          </template>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { REGIONS } from "../data/dropdown-values";
import { Dialog } from "quasar";

export default {
  components: {
    "search-component": () => import("../components/Projects/SearchComponent"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "filter-menu": () => import("../components/FilterMenu.vue"),
    "project-item": () => import("../components/Projects/ProjectItem.vue"),
    "list-placeholder": () =>
      import("../components/Projects/ListPlaceholder.vue")
  },
  name: "PageProjects",
  data() {
    return {
      breadcrumbs: [
        {
          url: "/",
          title: "Home"
        },
        {
          title: "PIP"
        }
      ],
      view: "grid",
      error: null,
      sortOptions: [],
      sort: "",
      filter: false,
      REGIONS,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("projects", ["search", "projectsDownloaded","loading","projects","paginatorInfo"]),
    ...mapState("auth", ["emailVerified"])
  },
  methods: {
    ...mapActions("projects", ["fetchProjects","deleteProject"]),
    goTo(id) {
      this.$router.push("/pip/" + id);
    },
    goToEdit(id) {
      this.$router.push("/pip/" + id + "/edit");
    },
    promptDelete(id) {
      Dialog.create({
        title: "Delete Project",
        message: "Are you sure you want to move the project to trash?",
        cancel: true,
        transitionHide: "fade",
        transitionShow: "fade"
      }).onOk(() => {
        this.deleteProject(id);
      });
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return value.replace(searchRegExp, match => {
          return "<span class='bg-yellow-6'>" + match + "</span>";
        });
      }
      return value;
    },
    currency(value) {
      return "PhP " + value.toLocaleString();
    }
  },
  mounted() {
    this.fetchProjects(1);
  }
};
</script>
