<template>
  <div id="q-app">
    <router-view />
    <sunny-image />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SunnyImage from "./components/svg/SunnyImage.vue";

export default {
  components: {
    SunnyImage
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
