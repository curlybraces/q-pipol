<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <search-component />
    <div class="column q-pa-md bg-green-1 q-mb-md">
      <div class="row">
        <q-btn outline icon="tune" @click="filter = !filter">FILTER</q-btn>
      </div>
      <div class="row" v-show="filter">
        <div class="col-3">
          <filter-menu title="REGIONS" :options="REGIONS" dense></filter-menu>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-x-md">
      <div class="col">
        <q-card class="q-pa-sm fit bg-grey-1">
          <div class="row q-pa-sm items-center">
            <span
              class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
              >Projects</span
            >
            <q-space />
            <span class="gt-sm">Sort by:</span>
            <q-select
              style="min-width: 200px;"
              class="q-ml-sm"
              dense
              outlined
              v-model="sort"
              :options="sortOptions"
              @input="sortData"
              emit-value
              map-options
            ></q-select>

            <toggle-view v-model="view" />
          </div>
          <q-separator spaced />
          <template v-if="!loading && !error">
            <no-project v-if="projects.length === 0 && search" />
            <template v-else>
              <div class="row q-col-gutter-sm q-my-sm">
                <template v-if="view == 'grid'">
                  <template
                    v-for="{
                      id,
                      title,
                      implementing_agency,
                      total_project_cost
                    } in projects"
                  >
                    <div class="col-md-3 col-sm-6 col-xs-12" :key="id">
                      <grid-card @click="goTo(id)">
                        <template v-slot:item>
                          <q-item class="q-pa-sm">
                            <q-item-section>
                              <q-item-label :lines="2">
                                {{ title }}
                              </q-item-label>
                              <q-item-label caption>
                                {{ implementing_agency }}
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              Php
                              {{
                                total_project_cost !== "undefined"
                                  ? 0
                                  : total_project_cost.toLocaleString()
                              }}
                            </q-item-section>
                          </q-item>
                        </template>
                      </grid-card>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <q-list class="col q-ml-sm" separator bordered>
                    <template
                      v-for="{
                        id,
                        title,
                        implementing_agency,
                        total_project_cost
                      } in projects"
                    >
                      <q-item :key="id" @click="goTo(id)" clickable>
                        <q-item-section avatar> </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ title }}</q-item-label>
                          <q-item-label>{{ implementing_agency }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          PhP
                          {{
                            total_project_cost !== "undefined"
                              ? 0
                              : total_project_cost.toLocaleString()
                          }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </template>
              </div>
            </template>
          </template>

          <template v-if="loading">
            <div class="text-center" style="margin-top: 200px;">
              <q-spinner color="primary" size="3em"></q-spinner>
            </div>
          </template>

          <template v-if="!loading && error">
            <div class="text-center" style="margin-top: 200px;">
              <q-icon name="warning" color="red" size="lg"></q-icon>
              <br />
              {{ errorMessage }}
            </div>
          </template>

          <div class="row q-mt-md justify-between items-center">
            <span>
              Showing {{ (current_page - 1) * per_page + 1 }} -
              {{
                current_page * per_page > total
                  ? total
                  : current_page * per_page
              }}
              of {{ total }} interventions
            </span>
            <span>
              Show Entries:
            </span>
            <q-select
              v-model="per_page"
              :options="[12, 25, 50, 100]"
              dense
              outlined
              @input="reloadProjects"
            />
            <q-pagination
              v-model="current_page"
              :max-pages="last_page"
              :max="max"
              boundary-links
              boundary-numbers
              @input="reloadProjects"
            ></q-pagination>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { loadProjects } from "../functions/function-load-projects";

import { REGIONS } from "../data/dropdown-values";

export default {
  components: {
    "search-component": () => import("../components/Projects/SearchComponent"),
    "no-project": () => import("../components/Projects/NoProject"),
    "grid-card": () => import("../components/GridCard.vue"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "toggle-view": () => import("../components/ToggleView.vue"),
    "filter-menu": () => import("../components/FilterMenu.vue")
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
    }
  },
  created() {
    loadProjects({
      current_page: 1
    }).then(res => {
      const { total, per_page, current_page, last_page } = res.data.projects;
      this.total = total;
      this.per_page = per_page;
      this.current_page = current_page;
      this.last_page = last_page;
      this.projects = res.data.projects.data;
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
