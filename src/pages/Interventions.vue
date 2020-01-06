<template>
  <q-page padding>
    <div class="row q-mb-md">
      <q-input
        class="col"
        v-model="searchText"
        dense
        outlined
        rounded
        @keyup.enter="search"
        aria-placeholder="Search interventions"
        placeholder="What are you looking for?"
      >
        <template v-slot:append>
          <q-icon name="search" @click="search" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    <q-separator />
    <div class="q-ml-md">
      <div class="row q-mt-md q-col-gutter-x-md">
        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4 bg-grey-1 q-pa-sm">
          <filter-menu
            title="REGIONS"
            :options="REGIONS"
            v-model="selectedRegions"
          />
          <q-separator />
          <filter-menu
            title="PROGRAMS"
            :options="PROGRAMS"
            v-model="selectedPrograms"
          />
          <q-separator />
          <filter-menu
            title="COMMODITY GROUP"
            :options="COMMODITY_GROUP"
            v-model="selectedCommodities"
          />
          <q-separator />
          <div class="q-py-md">
            <span class="title">INVESTMENT VALUE</span>
            <div class="row q-col-gutter-x-xs q-mt-xs items-center">
              <div class="col-6">
                <q-input
                  type="number"
                  v-model="investmentTotal.min"
                  placeholder="Min"
                  outlined
                  dense
                  :min="0"
                ></q-input>
              </div>
              <div class="col-6">
                <q-input
                  type="number"
                  v-model="investmentTotal.max"
                  placeholder="Max"
                  outlined
                  dense
                  :min="0"
                ></q-input>
              </div>
            </div>
            <q-btn
              class="q-mt-md full-width"
              color="primary"
              icon="filter_list"
              label="APPLY FILTER"
              @click="filterInterventions"
            >
            </q-btn>
          </div>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-9 col-xs-8">
          <div class="row bg-white q-pa-sm items-center q-gutter-x-sm">
            <span
              class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
              >Interventions</span
            >
            <q-space />
            <span class="gt-sm">Sort by:</span>
            <q-select
              style="min-width: 200px;"
              dense
              outlined
              v-model="sort"
              :options="sortOptions"
              @input="sortData"
              emit-value
              map-options
            ></q-select>
            <span class="gt-sm">View:</span>
            <q-btn-toggle
              v-model="view"
              dense
              push
              toggle-color="primary"
              :options="[
                { value: 'grid', slot: 'grid' },
                { value: 'list', slot: 'list' }
              ]"
            >
              <template v-slot:grid>
                <q-icon name="apps"></q-icon>
                <q-tooltip>Grid view</q-tooltip>
              </template>

              <template v-slot:list>
                <q-icon name="list"></q-icon>
                <q-tooltip>List view</q-tooltip>
              </template>
            </q-btn-toggle>
          </div>

          <template v-if="!loading && !error">
            <template v-if="interventions.length === 0">
              No interventions found.
            </template>
            <template v-else>
              <div class="row items-center q-py-md q-pl-md">
                Filters:
                <span v-if="selectedRegions">
                  <q-chip
                    v-for="(item, index) in selectedRegions"
                    :key="index"
                    dense
                    >{{ item }}</q-chip
                  >
                </span>
                <span v-if="selectedPrograms">
                  <q-chip
                    v-for="(item, index) in selectedPrograms"
                    :key="index"
                    dense
                    >{{ item }}</q-chip
                  >
                </span>
                <span v-if="selectedCommodities">
                  <q-chip
                    v-for="(item, index) in selectedCommodities"
                    :key="index"
                    dense
                    >{{ item }}</q-chip
                  >
                </span>
              </div>
              <q-scroll-area style="height: 60vh;">
                <div class="row q-col-gutter-md">
                  <template
                    v-for="{
                      id,
                      commodityGroup,
                      program,
                      intervention,
                      investmentTotal
                    } in interventions"
                  >
                    <div class="col-md-3 col-sm-6 col-xs-12" :key="id">
                      <q-card
                        class="fit cursor-pointer grid-card"
                        @click="goTo(id)"
                      >
                        <grid-card :commodityGroup="commodityGroup" caption />
                        <q-item class="q-pa-sm">
                          <q-item-section>
                            <q-item-label :lines="2">
                              {{ intervention }}
                            </q-item-label>
                            <q-item-label caption>
                              {{ program }}
                            </q-item-label>
                          </q-item-section>
                          <q-item-section side top>
                            Php {{ investmentTotal.toLocaleString(2) }}
                          </q-item-section>
                        </q-item>
                      </q-card>
                    </div>
                  </template>
                </div>
              </q-scroll-area>
              <div class="row q-mt-md justify-between items-center">
                <span>
                  Showing {{ (page - 1) * per_page + 1 }} -
                  {{ page * per_page > total ? total : page * per_page }} of
                  {{ total }} interventions
                </span>
                <q-pagination
                  v-model="page"
                  :max-pages="max_pages"
                  :max="max"
                  boundary-links
                  boundary-numbers
                  @input="loadInterventions"
                ></q-pagination>
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
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { REGIONS, PROGRAMS, COMMODITY_GROUP } from "../data/dropdown-values";

export default {
  name: "PageInterventions",
  components: {
    "filter-menu": () => import("../components/FilterMenu.vue"),
    "grid-card": () => import("../components/GridCard.vue")
  },
  data() {
    return {
      searchText: "",
      interventions: [],
      per_page: null,
      total: null,
      max: 10,
      page: 1,
      limit: 12,
      loading: true,
      error: null,
      errorMessage: null,
      group: [],
      REGIONS,
      PROGRAMS,
      COMMODITY_GROUP,
      selectedRegions: [],
      selectedPrograms: [],
      selectedCommodities: [],
      minValue: 0,
      maxValue: 10000000000,
      investmentTotal: {
        min: null,
        max: null
      },
      sort: null,
      sortBy: null,
      dir: null,
      sortOptions: [
        {
          label: "Investment low to high",
          value: 1
        },
        {
          label: "Investment high to low",
          value: 2
        }
      ],
      view: "grid"
    };
  },
  computed: {
    max_pages() {
      if (this.$q.screen.gt.md) {
        return 10;
      }
      return 5;
    }
  },
  methods: {
    search() {
      alert(this.searchText);
    },
    viewDetails(id) {
      this.$router.push("/afmp/" + id);
    },
    goTo(id) {
      this.$router.push("/interventions/" + id);
    },
    sortData() {
      const { sort } = this;
      this.page = 1;
      if (sort == 1) {
        this.sortBy = "investmentTotal";
        this.dir = "ASC";
      } else if (sort == 2) {
        this.sortBy = "investmentTotal";
        this.dir = "DESC";
      } else {
        this.sortBy = null;
        this.dir = null;
      }
      this.loadInterventions();
    },
    loadInterventions() {
      this.loading = true;

      const {
        page,
        limit,
        selectedPrograms,
        selectedRegions,
        selectedCommodities,
        sortBy,
        dir
      } = this;

      axios
        .post("http://localhost:8000/graphql", {
          query: `query interventions($limit: Int!, $page: Int!, $commodityGroup: [String!], $region: [String!], $program: [String!], $sortBy: String, $dir: String) {
              interventions(limit:$limit,page:$page,commodityGroup:$commodityGroup,region:$region,program:$program,sortBy:$sortBy,dir:$dir) {
                data {
                  id
                  commodityGroup
                  intervention
                  program
                  investmentTotal
                }
                total
                per_page
              }
            }`,
          variables: {
            limit: limit,
            page: page,
            region: selectedRegions,
            program: selectedPrograms,
            commodityGroup: selectedCommodities,
            sortBy: sortBy,
            dir: dir
          }
        })
        .then(res => {
          const {
            data: {
              data: {
                interventions: { data, total, per_page }
              }
            }
          } = res;
          // console.log("data: ", data);
          this.interventions = data;
          // console.log("total: ", total);
          this.total = total;
          // console.log("per_page: ", per_page);
          this.per_page = per_page;
          this.max = Math.ceil(total / per_page);
        })
        .catch(err => {
          this.error = true;
          this.errorMessage = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    filterInterventions() {
      this.page = 1;
      this.loadInterventions();
    }
  },
  created() {
    this.loadInterventions();
  }
};
</script>

<style>
.grid-card:hover {
  opacity: 0.95;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
