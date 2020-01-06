<template>
  <div id="q-app">
    <router-view />
    <sunny-image />
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
import SunnyImage from "./components/svg/SunnyImage.vue";

import CookieLaw from "vue-cookie-law";

export default {
  components: {
    SunnyImage,
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
