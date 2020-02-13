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

          <template v-if="$apollo.loading">
            <list-placeholder />
          </template>
          <template v-else>
            <project-item
              v-for="{
                id,
                title,
                description,
                operating_unit,
                total_project_cost
              } in projects.data"
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
                {{ (current_page - 1) * projects.paginatorInfo.perPage + 1 }}
                -
                {{
                  current_page * projects.paginatorInfo.perPage >
                  projects.paginatorInfo.total
                    ? projects.paginatorInfo.total
                    : current_page * projects.paginatorInfo.perPage
                }}
                of {{ projects.paginatorInfo.total }} projects
              </div>
              <div>
                <q-pagination
                  v-model="current_page"
                  :max-pages="5"
                  :max="projects.paginatorInfo.lastPage"
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
import { mapState } from "vuex";

import { REGIONS } from "../data/dropdown-values";
import { Dialog } from "quasar";

import gql from "graphql-tag";

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
  apollo: {
    projects: {
      query: gql`
        query projects($page: Int) {
          projects(page: $page) {
            data {
              id
              title
              operating_unit {
                name
                image
              }
              description
              total_project_cost
            }
            paginatorInfo {
              currentPage
              total
              perPage
              lastPage
            }
          }
        }
      `,
      variables() {
        return {
          page: this.current_page
        };
      }
    }
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
        cancel: true
      }).onOk(() => {
        console.log(id);
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
