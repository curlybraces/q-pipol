<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="q-pa-sm">
      <q-card>
        <q-card-section>
          <q-toolbar>
            <q-avatar icon="storage" color="primary" class="text-white" />
            <q-toolbar-title>Projects</q-toolbar-title>
            <q-input
              outlined
              dense
              rounded
              class="col-6"
              placeholder="Search in project title..."
              v-model="searchField"
            >
              <template v-slot:append>
                <q-icon name="search" class="cursor-pointer"></q-icon>
              </template>
            </q-input>
          </q-toolbar>
        </q-card-section>

        <q-separator spaced />

        <q-card-section>
          <template v-if="loading">
            <list-placeholder />
          </template>

          <template v-else>
            <div v-if="Object.keys(projects).length === 0">
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

            <q-infinite-scroll @load="onLoad" :offset="100">
              <project-item
                v-for="{
                  id,
                  title,
                  description,
                  operating_unit,
                  total_project_cost,
                  created_at,
                  creator
                } in projects"
                :key="id"
                :id="id"
                :title="title"
                :description="description"
                :operating_unit="operating_unit"
                :total_project_cost="total_project_cost"
                :created_at="created_at"
                :creator="creator"
                @goTo="goTo(id)"
                @editProject="goToEdit(id)"
              ></project-item>
              <template v-if="loading" v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template>
            </q-infinite-scroll>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { REGIONS } from "../data/dropdown-values";

export default {
  components: {
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
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
      error: null,
      sortOptions: [],
      sort: "",
      filter: false,
      REGIONS,
      first: 25
    };
  },
  computed: {
    ...mapState("projects", [
      "search",
      "projectsDownloaded",
      "loading",
      "pageInfo",
      "search"
    ]),
    ...mapGetters("projects", ["projects"]),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    }
  },
  methods: {
    ...mapActions("projects", ["fetchProjects", "setSearch"]),
    goTo(id) {
      this.$router.push("/pip/" + id);
    },
    goToEdit(id) {
      this.$router.push("/pip/" + id + "/edit");
    },
    onLoad(index, done) {
      console.log("onload is being called");
      if (this.projects) {
        if (this.pageInfo.hasNextPage) {
          this.fetchProjects({
            first: this.first,
            after: this.pageInfo.endCursor
          }).then(() => done());
        } else {
          console.log("this is the last page");
        }
      } else {
        console.log("first time loading");
      }
    }
  },
  filters: {
    currency(value) {
      if (value === "undefined" || !value) {
        return "PhP 0";
      }
      return "PhP " + value.toLocaleString();
    }
  },
  mounted() {
    this.fetchProjects({
      first: this.first,
      after: ""
    });
  }
};
</script>
