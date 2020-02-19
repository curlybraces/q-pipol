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
import { ME } from "./constants/graphql";

export default {
  components: {
    CookieLaw
  },
  name: "App",
  computed: {
    ...mapState("auth", ["userLoaded"])
  },
  methods: {
    ...mapActions("auth", ["populateUser"])
  },
  created() {
    this.$q.addressbarColor.set("primary");
    if (!this.userLoaded) {
      this.$apollo
        .query({
          query: ME
        })
        .then(res => {
          if (res.data.errors) {
            return Promise.reject(res.data.errors);
          }
          this.populateUser(res.data.me);
        })
        .catch(err => {
          // if (err.errors[0].debugMessage == "Unauthenticated.") {
          //   alert("You are not logged in");
          // } else {
          //   alert("Unknown error");
          // }
          console.log(err);
        });
    }
  }
};
</script>
