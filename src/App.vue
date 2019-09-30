<template>
  <div id="q-app" :class="dark ? 'bg-accent' : 'bg-white'">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("settings", ["dark"])
  },
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
