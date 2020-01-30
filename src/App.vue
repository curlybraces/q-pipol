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
import CookieLaw from "vue-cookie-law";
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";
import { setAuthHeader } from "boot/axios";

export default {
  components: {
    CookieLaw
  },
  name: "App",
  methods: {
    ...mapActions("auth", ["retrieveUserInfo"])
  },
  created() {
    this.$q.addressbarColor.set("primary");
    if (LocalStorage.getItem("loggedIn")) {
      setAuthHeader(LocalStorage.getItem("token"));
      this.retrieveUserInfo();
    }
  }
};
</script>
