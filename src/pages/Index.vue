<template>
  <q-page padding>
    <div class="column">
      <div class="col">
        <div class="row q-col-gutter-md justify-start align-start">
          <template
            v-for="({ url, imageUrl, alt, title, description, hover },
            index) in features"
          >
            <div class="col-md-6 col-sm-12 col-xs-12" :key="index">
              <q-card
                class="q-pa-md fit text-center cursor-pointer directory-card"
                square
                @click="goTo(url)"
              >
                <q-img
                  :src="imageUrl"
                  :alt="alt"
                  style="height: 350px; max-width: 300px"
                />
                <div class="text-h6 q-mt-md">{{ title }}</div>
                <div class="text-subtitle1 q-mt-md">
                  {{ description }}
                </div>
              </q-card>
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { AFMP_IMAGE, PIP_IMAGE } from "../data/images";

export default {
  name: "PageIndex",
  data() {
    return {
      showLoginForm: false,
      features: [
        {
          url: "/interventions",
          imageUrl: AFMP_IMAGE,
          alt: "afmp cover",
          title: "AFMP",
          description: "AFMP Investment Requirements 2018-2023"
        },
        {
          url: "/pip",
          imageUrl: PIP_IMAGE,
          alt: "pip cover",
          title: "PIP",
          description: "Public Investment Program 2017-2022"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "emailVerified"])
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"]),
    goTo(url) {
      this.$router.push(url);
    },
    doSomething() {
      alert("mouse over!");
    }
  }
};
</script>

<style>
.directory-card:hover {
  opacity: 0.95;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
