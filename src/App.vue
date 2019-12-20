<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("auth", ["handleAuthStateChange"]),
    loadGraphQL() {
      return axios
        .post("http://localhost:8000/graphql", {
          query: `query {
              interventions {
                data {
                  id
                  intervention
                },
                total,
                per_page
              }
            }`
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err.message));
    }
  },
  mounted() {
    this.handleAuthStateChange();
  },
  created() {
    this.$q.addressbarColor.set("primary");
    this.loadGraphQL();
  }
};
</script>
