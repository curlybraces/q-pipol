<template>
  <div id="q-app" class="bg-grey-1">
    <router-view />

    <cookie-law
      theme="blood-orange"
      buttonText="I understand"
      position="bottom"
      transitionName="fade"
    >
    </cookie-law>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CookieLaw from "vue-cookie-law";
import { ME_QUERY } from "./constants/graphql";
import { graphQLErrorMessages } from "./functions/function-graphql-error-messages";
import { Dialog } from "quasar";

export default {
  components: {
    CookieLaw
  },
  name: "App",
  computed: {
    ...mapState("auth", ["userLoaded"])
  },
  methods: {
    ...mapActions("auth", ["populateUser", "logoutUser"]),
    ...mapActions("options",["initializeOptions"])
  },
  mounted() {
    if (!this.userLoaded) {
      this.$apollo
        .query({
          query: ME_QUERY
        })
        .then(res => {
          this.populateUser(res.data.me);
        })
        .catch(error => {
          console.log(error);
          Dialog.create({
            title: "Error",
            message: graphQLErrorMessages(error)[0]
          }).onOk(() => {
            this.logoutUser();
          });
        });
    }
  },
  created() {
    this.$q.addressbarColor.set("primary");
    this.initializeOptions();
  }
};
</script>
