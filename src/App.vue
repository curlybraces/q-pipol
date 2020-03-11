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

export default {
  components: {
    CookieLaw
  },
  name: "App",
  computed: {
    ...mapState("auth", ["userLoaded","loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["populateUser", "logoutUser","populateUser"]),
    ...mapActions("options", ["initializeOptions"])
  },
  mounted() {
    if (this.loggedIn) {
      this.populateUser();
    } else {
      console.log("User is not logged in");
    }
  },
  created() {
    this.$q.addressbarColor.set("primary");
    this.initializeOptions();
  }
};
</script>
