<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <search-component />
    <div class="q-ml-md">
      <div class="row q-col-gutter-x-md">
        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4 bg-grey-1 q-pa-sm">
          Filters
        </div>
        <div class="col-lg-10 col-md-10 col-sm-9 col-xs-8">
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
                <q-scroll-area style="height: 88vh;">
                  <div class="row q-col-gutter-md q-my-sm">
                    <template v-if="view == 'grid'">
                      <template
                        v-for="{
                          id,
                          title,
                          implementingAgency,
                          totalProjectCost
                        } in projects"
                      >
                        <div class="col-md-3 col-sm-6 col-xs-12" :key="id">
                          <grid-card @click="goTo(id)">
                            <template v-slot:image>
                              <commodity-image />
                            </template>

                            <template v-slot:item>
                              <q-item class="q-pa-sm">
                                <q-item-section>
                                  <q-item-label :lines="2">
                                    {{ title }}
                                  </q-item-label>
                                  <q-item-label caption>
                                    {{ implementingAgency }}
                                  </q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                  Php {{ totalProjectCost.toLocaleString(2) }}
                                </q-item-section>
                              </q-item>
                            </template>
                          </grid-card>
                        </div>
                      </template>
                    </template>
                    <template v-else>
                      <template
                        v-for="{
                          id,
                          title,
                          implementingAgency,
                          totalProjectCost
                        } in projects"
                      >
                        <div class="col-12" :key="id">
                          <list-card @click="goTo(id)">
                            <template v-slot:image>
                              <commodity-image />
                            </template>
                            <template v-slot:item>
                              <span>{{ title }}</span>
                              <q-item-label caption>{{
                                implementingAgency
                              }}</q-item-label>
                            </template>
                            <template v-slot:side>
                              PhP {{ totalProjectCost.toLocaleString() }}
                            </template>
                          </list-card>
                        </div>
                      </template>
                    </template>
                  </div>
                </q-scroll-area>
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
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
const NoProject = () => import("../components/Projects/NoProject");
const SearchComponent = () => import("../components/Projects/SearchComponent");

export default {
  components: {
    SearchComponent,
    NoProject,
    "grid-card": () => import("../components/GridCard.vue"),
    "list-card": () => import("../components/ListCard.vue"),
    "commodity-image": () => import("../components/CommodityImage.vue"),
    "page-breadcrumbs": () => import("../components/PageBreadcrumbs.vue"),
    "toggle-view": () => import("../components/ToggleView.vue")
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
      sort: ""
    };
  },
  computed: {
    ...mapState("projects", ["search", "projectsDownloaded"]),
    ...mapState("auth", ["emailVerified"]),
    ...mapGetters("projects", ["projects"])
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"]),
    sortData() {
      // console.log("sort");
    },
    goTo(id) {
      this.$router.push("/pip/" + id);
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
