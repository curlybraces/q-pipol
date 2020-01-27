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
            />
          </div>
          <template v-if="!loading && !error">
            <no-project v-if="projects.length === 0 && search" />
            <template v-else>
              <div class="row q-my-sm">
                <q-list class="col" separator bordered>
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
                  ></project-item>
                </q-list>
              </div>
            </template>
          </template>

          <template v-if="loading">
            <div class="text-center" style="margin-top: 10px;">
              Loading projects...
            </div>
          </template>

          <div
            v-if="!loading && error"
            class="text-center"
            style="margin-top: 200px;"
          >
            <q-icon name="warning" color="red" size="lg"></q-icon>
            <br />
            {{ errorMessage }}
          </div>

          <div
            v-if="!loading && projects.length"
            class="row justify-between items-center"
          >
            <div>
              Showing {{ (current_page - 1) * per_page + 1 }} -
              {{
                current_page * per_page > total
                  ? total
                  : current_page * per_page
              }}
              of {{ total }} projects
            </div>
            <div>
              <q-pagination
                v-model="current_page"
                :max-pages="last_page"
                :max="max"
                boundary-links
                boundary-numbers
                @input="reloadProjects"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { loadProjects } from "../functions/function-load-projects";
import { deleteProject } from "../functions/function-delete-project";

import { REGIONS } from "../data/dropdown-values";
import { Dialog } from "quasar";

export default {
  components: {
    "search-component": () => import("../components/Projects/SearchComponent"),
    "no-project": () => import("../components/Projects/NoProject"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "filter-menu": () => import("../components/FilterMenu.vue"),
    "project-item": () => import("../components/Projects/ProjectItem.vue")
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
      loading: false,
      error: false,
      sortOptions: [],
      sort: "",
      projects: [],
      total: null,
      per_page: null,
      current_page: 1,
      last_page: null,
      filter: false,
      REGIONS
    };
  },
  computed: {
    ...mapState("projects", ["search", "projectsDownloaded"]),
    ...mapState("auth", ["emailVerified"]),
    max() {
      let total_pages = Math.ceil(this.total / this.per_page);
      if (total_pages > 5) {
        return 5;
      }
      return total_pages;
    }
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"]),
    sortData() {
      // console.log("sort");
    },
    goTo(id) {
      this.$router.push("/pip/" + id);
    },
    reloadProjects() {
      loadProjects({
        current_page: this.current_page,
        per_page: this.per_page
      }).then(res => {
        const { total, per_page, current_page, last_page } = res.data.projects;
        this.total = total;
        this.per_page = per_page;
        this.current_page = current_page;
        this.last_page = last_page;
        this.projects = res.data.projects.data;
      });
    },
    promptDelete(id) {
      Dialog.create({
        title: "Delete Project",
        message: "Are you sure you want to move the project to trash?",
        cancel: true
      }).onOk(() => {
        deleteProject({ id: id }).then(() => this.reloadProjects());
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
  created() {
    this.loading = true;
    loadProjects({
      current_page: 1
    }).then(res => {
      const { total, per_page, current_page, last_page } = res.data.projects;
      this.total = total;
      this.per_page = per_page;
      this.current_page = current_page;
      this.last_page = last_page;
      this.projects = res.data.projects.data;
      this.loading = false;
    });
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}

.project-card:hover {
  opacity: 0.9;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
