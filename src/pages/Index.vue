<template>
  <q-page>
    <div class="column">
      <div class="row">
        <q-img style="height:480px" src="statics/landing_blur.gif">
          <div class="absolute-full text-subtitle2 flex flex-center">
            <div class="column q-gutter-y-md items-center">
              <q-avatar class="q-mb-md">
                <q-img src="statics/app-icon-white.png" />
              </q-avatar>
              <div class="text-h5 text-center">
                Monitor programs &amp; projects, efficiently.
              </div>
              <div class="text-h6 text-weight-light text-center text-grey-5">
                Monitor programs &amp; projects for submission to the Updated
                Public Investment Program 2017-2022.
              </div>
              <div class="row text-center">
                <q-btn outline size="lg" label="Get Started" to="login"></q-btn>
              </div>
            </div>
          </div>
        </q-img>
      </div>

      <div class="q-pa-xl full-width" ref="features">
        <div class="row q-col-gutter-sm justify-start align-start">
          <template v-for="(feature, index) in features">
            <div
              class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 flex"
              :key="index"
            >
              <q-card class="q-pa-md fit text-center" flat square>
                <q-icon :name="feature.icon" color="primary" size="200px" />
                <div class="text-h6 q-mt-md">{{ feature.title }}</div>
                <div class="text-subtitle1 q-mt-md">
                  {{ feature.description }}
                </div>
              </q-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <q-dialog v-model="showLoginForm" maximized v-if="!loggedIn">
      <q-card class="bg-white">
        <q-toolbar>
          <q-space />
          <q-btn flat dense round icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <login-form></login-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    "login-form": () =>
      import(
        /* webpackChunkName: 'LoginForm' */ "../components/AppLayout/LoginForm"
      )
  },
  name: "PageIndex",
  data() {
    return {
      showLoginForm: false,
      features: [
        {
          icon: "offline_bolt",
          title: "Progressive Web App",
          description: "This app works even without internet connection."
        },
        {
          icon: "mobile_friendly",
          title: "Installable",
          description: "It can be installed in your phone and computer."
        },
        {
          icon: "cloud",
          title: "Online",
          description: "Share your data with other users."
        },
        {
          icon: "child_friendly",
          title: "User-Friendly",
          description:
            "This app can be used without intensive tutorial even a baby can use it."
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "emailVerified"])
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"])
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}
</style>
