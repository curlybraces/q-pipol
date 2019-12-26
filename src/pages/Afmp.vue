<template>
  <q-page padding>
    <q-input v-model="searchText" dense outlined rounded @keyup.enter="search">
      <template v-slot:append>
        <q-icon name="search" @click="search" class="cursor-pointer" />
      </template>
    </q-input>
    <div class="row">
      <div class="text-center">
        <q-pagination
          :value="page"
          :max-pages="10"
          :max="max"
          boundary-links
          boundary-numbers
          @input="loadInterventions"
        ></q-pagination>
      </div>
    </div>
    <template v-if="!loading">
      <div class="row q-col-gutter-md q-mt-md">
        <template v-for="{ id, program, intervention } in interventions">
          <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" :key="id">
            <q-card>
              <q-img src="https://via.placeholder.com/300x200" />
              <div class="q-pa-xs">
                <span class="text-subtitle2">{{ intervention }}</span>
                <br />
                <span class="text-caption">{{ program }}</span>
              </div>
            </q-card>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <q-spinner />
    </template>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "PageAfmp",
  data() {
    return {
      searchText: "",
      interventions: [],
      per_page: null,
      total: null,
      max: null,
      page: 1,
      loading: true
    };
  },
  methods: {
    search() {
      alert(this.searchText);
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
                  intervention
                  program
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
          this.loading = false;
        })
        .catch(err => {
          this.$q.dialog({
            title: err.message,
            message: "An error has occurred."
          });
        });
    }
  },
  created() {
    // this.loadInterventions(2, 12);
    this.loadInterventions();
  }
};
</script>
