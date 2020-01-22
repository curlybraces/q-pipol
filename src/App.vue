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
import { mapActions } from "vuex";

import CookieLaw from "vue-cookie-law";

export default {
  components: {
    CookieLaw
  },
  name: "App",
  methods: {
    ...mapActions("auth", ["handleAuthStateChange"])
  },
  mounted() {
    this.handleAuthStateChange();
  },
  created() {
    this.$q.addressbarColor.set("primary");
  }
};
</script>
