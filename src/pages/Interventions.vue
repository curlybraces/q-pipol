<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="q-ml-md">
      <div class="row q-col-gutter-x-md q-gutter-y-md">
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 bg-grey-1 q-pa-sm">
          <filter-menu
            title="REGIONS"
            :options="REGIONS"
            v-model="params.selectedRegions"
          />
          <q-separator />
          <filter-menu
            title="PROGRAMS"
            :options="PROGRAMS"
            v-model="params.selectedPrograms"
          />
          <q-separator />
          <filter-menu
            title="PROVINCES"
            :options="provinces"
            v-model="params.selectedProvinces"
          />
          <filter-menu
            title="COMMODITY GROUP"
            :options="COMMODITY_GROUP"
            v-model="params.selectedCommodities"
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
              @click="reloadInterventions"
            >
            </q-btn>
          </div>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
          <q-card class="q-pa-sm fit bg-grey-1">
            <div class="row q-pa-sm items-center">
              <span
                class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
                >Interventions</span
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
              <span class="gt-sm q-ml-sm">View:</span>
              <q-btn-toggle
                class="q-ml-sm"
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
            <q-separator spaced />
            <template v-if="interventions.length === 0">
              No interventions found.
            </template>
            <template v-else>
              <q-scroll-area style="height: 88vh;">
                <div class="row q-col-gutter-md q-my-sm">
                  <template v-if="view == 'grid'">
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
                        <grid-card @click="goTo(id)">
                          <template v-slot:image>
                            <commodity-image
                              :commodityGroup="commodityGroup"
                              caption
                            />
                          </template>
                          <template v-slot:item>
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
                          </template>
                        </grid-card>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <template
                      v-for="{
                        id,
                        commodityGroup,
                        program,
                        intervention,
                        investmentTotal
                      } in interventions"
                    >
                      <div class="col-12" :key="id">
                        <list-card @click="goTo(id)">
                          <template v-slot:image>
                            <commodity-image
                              :commodityGroup="commodityGroup"
                              caption
                            />
                          </template>
                          <template v-slot:item>
                            <span>{{ intervention }}</span>
                            <q-item-label caption>{{ program }}</q-item-label>
                          </template>
                          <template v-slot:side>
                            PhP {{ investmentTotal.toLocaleString() }}
                          </template>
                        </list-card>
                      </div>
                    </template>
                  </template>
                </div>
              </q-scroll-area>
              <div class="row q-mt-md justify-between items-center">
                <span>
                  Showing {{ (params.page - 1) * per_page + 1 }} -
                  {{
                    params.page * per_page > total
                      ? total
                      : params.page * per_page
                  }}
                  of {{ total }} interventions
                </span>
                <span>
                  Show Entries:
                </span>
                <q-select
                  v-model="params.limit"
                  :options="[12, 25, 50, 100]"
                  dense
                  outlined
                  @input="reloadInterventions"
                />
                <q-pagination
                  v-model="params.page"
                  :max-pages="max_pages"
                  :max="max"
                  boundary-links
                  boundary-numbers
                  @input="reloadInterventions"
                ></q-pagination>
              </div>
            </template>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  REGIONS,
  PROGRAMS,
  COMMODITY_GROUP,
  PROVINCES
} from "../data/dropdown-values";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import FilterMenu from "../components/FilterMenu";

import { loadInterventions } from "../functions/function-load-interventions";

export default {
  name: "PageInterventions",
  components: {
    PageBreadcrumbs,
    FilterMenu,
    "commodity-image": () => import("../components/CommodityImage.vue"),
    "grid-card": () => import("../components/GridCard.vue"),
    "list-card": () => import("../components/ListCard.vue")
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Interventions"
        }
      ],
      searchText: "",
      interventions: [],
      params: {
        page: 1,
        limit: 12,
        selectedRegions: [],
        selectedPrograms: [],
        selectedCommodities: [],
        selectedProvinces: [],
        sortBy: null,
        dir: null
      },
      per_page: null,
      total: null,
      max: 10,
      loading: false,
      error: null,
      errorMessage: null,
      group: [],
      REGIONS,
      PROGRAMS,
      COMMODITY_GROUP,
      minValue: 0,
      maxValue: 10000000000,
      investmentTotal: {
        min: null,
        max: null
      },
      sort: null,
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
    },
    provinces() {
      return PROVINCES.map(({ label }) => {
        return {
          label: label,
          value: label
        };
      });
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
        this.params.sortBy = "investmentTotal";
        this.params.dir = "ASC";
      } else if (sort == 2) {
        this.params.sortBy = "investmentTotal";
        this.params.dir = "DESC";
      } else {
        this.params.sortBy = null;
        this.params.dir = null;
      }
      this.reloadInterventions();
    },
    filterInterventions() {
      this.page = 1;
      loadInterventions();
    },
    reloadInterventions() {
      loadInterventions(this.params).then(response => {
        const {
          data: {
            data: {
              interventions: { data, total, per_page }
            }
          }
        } = response;

        this.interventions = data;

        this.total = total;

        this.per_page = per_page;
        this.max = Math.ceil(total / per_page);
      });
    }
  },
  created() {
    this.reloadInterventions();
  }
};
</script>
