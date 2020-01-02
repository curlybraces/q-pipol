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
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-lg-1 col-md-2 col-sm-3 col-xs-4">
        <filter-menu title="REGIONS" :options="REGIONS" />
        <q-separator />
        <filter-menu title="PROGRAMS" :options="PROGRAMS" />
      </div>
      <template v-if="!loading && !error">
        <div class="col-lg-11 col-md-10 col-sm-9 col-xs-8">
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
                <q-card class="fit">
                  <card-image :commodityGroup="commodityGroup" />
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
          <div class="row q-mt-md justify-between items-center">
            <span>
              Showing {{ (page - 1) * per_page + 1 }} - {{ page * per_page }} of
              {{ total }} interventions
            </span>
            <q-pagination
              :value="page"
              :max-pages="max_pages"
              :max="max"
              boundary-links
              boundary-numbers
              @input="loadInterventions"
            ></q-pagination>
          </div>
        </div>
      </template>
      <template v-if="loading">
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"></q-spinner>
        </span>
      </template>
      <template v-if="error">
        <div class="absolute-center text-center">
          <q-icon name="warning" color="red" size="lg"></q-icon>
          <br />
          {{ errorMessage }}
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { REGIONS, PROGRAMS } from "../data/dropdown-values";

export default {
  name: "PageInterventions",
  components: {
    "filter-menu": () => import("../components/FilterMenu.vue"),
    "card-image": () => import("../components/CardImage.vue")
  },
  data() {
    return {
      searchText: "",
      interventions: [],
      per_page: null,
      total: null,
      max: 10,
      page: 1,
      loading: true,
      error: null,
      errorMessage: null,
      group: [],
      REGIONS,
      PROGRAMS
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
    loadInterventions(page = 1, limit = 12) {
      this.loading = true;
      this.page = page;
      axios
        .post("http://localhost:8000/graphql", {
          query: `query interventions($limit: Int!, $page: Int!) {
              interventions(limit:$limit,page:$page) {
                data {
                  id
                  commodityGroup
                  intervention
                  program
                  investmentTotal
                },
                total,
                per_page
              }
            }`,
          variables: {
            limit: limit,
            page: page
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
          console.log("data: ", data);
          this.interventions = data;
          console.log("total: ", total);
          this.total = total;
          console.log("per_page: ", per_page);
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
    }
  },
  created() {
    this.loadInterventions();
  }
};
</script>
