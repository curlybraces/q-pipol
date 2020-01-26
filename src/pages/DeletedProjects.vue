<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <search-component />
    <div class="row">
      <div class="col">
        <q-card class="q-pa-sm fit bg-grey-1">
          <div class="row q-pa-sm items-center">
            <q-avatar>
              <q-icon name="delete" color="primary" />
            </q-avatar>
            <span
              class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
            >
              Deleted Projects</span
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
          </div>
          <q-separator spaced />
          <template v-if="!loading && !error">
            <no-project v-if="projects.length === 0 && search" />
            <template v-else>
              <div class="row q-my-sm">
                <q-list class="col" separator bordered>
                  <q-item
                    v-for="{
                      id,
                      title,
                      operating_unit,
                      description,
                      total_project_cost
                    } in projects"
                    :key="id"
                    @click="goTo(id)"
                    clickable
                  >
                    <q-item-section avatar>
                      <q-avatar color="white">
                        <img
                          v-if="operating_unit != null"
                          :src="
                            `statics/agency_logos/${operating_unit.image}.svg`
                          "
                        />
                        <img v-else src="statics/agency_logos/da-co.svg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-item-label>
                        {{
                          operating_unit != null ? operating_unit.name : null
                        }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ title }}</q-item-label>
                      <q-item-label caption :lines="2">{{
                        description
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section class="col-1" top side>
                      <q-item-label
                        >{{ total_project_cost | currency }}
                      </q-item-label>
                      <q-item-label>
                        <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="restore"
                          color="green"
                          @click.stop="promptRestore(id)"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </template>
          </template>

          <template v-if="loading">
            <div class="text-center" style="margin-top: 10px;">
              Loading projects...
            </div>
          </template>

          <template v-if="!loading && error">
            <div class="text-center" style="margin-top: 200px;">
              <q-icon name="warning" color="red" size="lg"></q-icon>
              <br />
              {{ errorMessage }}
            </div>
          </template>

          <template v-if="!loading && !projects.length">
            <div class="column align-center text-center">
              <div class="col">
                <q-avatar>
                  <q-img
                    src="statics/nothing-to-see-here.svg"
                    style="width: 100px"
                  />
                </q-avatar>
              </div>
              <div class="col text-weight-light">
                Nothing to see here.
              </div>
            </div>
          </template>

          <div
            class="row q-mt-md justify-between items-center"
            v-if="!loading && projects.length > 0"
          >
            <span>
              Showing {{ (current_page - 1) * per_page + 1 }} -
              {{
                current_page * per_page > total
                  ? total
                  : current_page * per_page
              }}
              of {{ total }} projects
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
import { loadProjects } from "../functions/function-load-projects";
import { restoreProject } from "../functions/function-restore-project";
import { Dialog } from "quasar";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue")
  },
  name: "PageDeletedProjects",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Deleted Projects"
        }
      ],
      projects: [],
      loading: false,
      error: false,
      total: null,
      per_page: null,
      current_page: 1,
      last_page: null
    };
  },
  computed: {
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    reloadProjects() {
      loadProjects({ deleted: true }).then(res => {
        this.projects = res.data.projects.data;
        this.total = res.data.projects.total;
        this.current_page = res.data.projects.current_page;
        this.per_page = res.data.projects.per_page;
        this.last_page = res.data.projects.last_page;
      });
    },
    promptRestore(id) {
      Dialog.create({
        title: "Restore Project",
        message: "Do you want to restore this project?",
        cancel: true
      })
        .onOk(() => {
          restoreProject({ id: id });
        })
        .onDismiss(() => this.reloadProjects());
    }
  },
  filters: {
    currency(value) {
      return "PhP " + value.toLocaleString();
    }
  },
  created() {
    this.reloadProjects();
  }
};
</script>

<style></style>
