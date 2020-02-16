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
          <ApolloQuery
            :query="require('src/graphql/queries/deleted_projects.gql')"
          >
            <template slot-scope="{ result: { data }, isLoading }">
              <list-placeholder v-if="isLoading" />
              <template v-else>
                <project-item
                  v-for="{
                    id,
                    title,
                    description,
                    operating_unit,
                    total_project_cost
                  } in data.projects.data"
                  :key="id"
                  :id="id"
                  :title="title"
                  :description="description"
                  :operating_unit="operating_unit"
                  :total_project_cost="total_project_cost"
                  @promptDelete="promptDelete(id)"
                ></project-item>
                <div
                  class="row q-mt-md justify-between items-center"
                  v-if="data.projects.data.length > 0"
                >
                  <q-space />
                  <q-pagination
                    v-model="current_page"
                    :max-pages="5"
                    :max="data.projects.paginatorInfo.lastPage"
                    boundary-links
                    boundary-numbers
                  ></q-pagination>
                </div>
              </template>
            </template>
          </ApolloQuery>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "project-item": () => import("../components/Projects/ProjectItem.vue"),
    "list-placeholder": () =>
      import("../components/Projects/ListPlaceholder.vue")
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
      current_page: 1
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
    promptRestore() {
      //
    }
  },
  filters: {
    currency(value) {
      return "PhP " + value.toLocaleString();
    }
  }
};
</script>

<style></style>
