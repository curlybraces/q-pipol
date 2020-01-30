<template>
  <q-layout view="lHh lpR lff">
    <q-header bordered class="bg-grey-1">
      <q-toolbar class="text-grey-9 app-toolbar">
        <img
          src="statics/logo.svg"
          height="35px;"
          @click="$router.push('/')"
          class="cursor-pointer"
        />
        <q-toolbar-title class="text-primary">E-PLANNING</q-toolbar-title>
        <q-space />
        <q-btn
          class="bg-primary text-white"
          round
          flat
          :label="name ? name.charAt(0) : 'DA'"
          @mouseenter="menu = true"
        >
          <dropdown-menu v-model="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" content-class="bg-grey-2" bordered :width="200">
      <drawer-content />
    </q-drawer>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>E-PLANNING</q-toolbar-title>
        <q-avatar color="white">
          <q-img src="statics/ani-at-kita-logo.svg"></q-img>
        </q-avatar>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapState } from "vuex";

import DrawerContent from "../components/layout/Drawer";
import DropdownMenu from "../components/layout/Dropdown";

export default {
  components: { DrawerContent, DropdownMenu },
  name: "MyLayout",
  data() {
    return {
      copyright: "Made by Mark Lester A. Bolotaolo",
      menu: false,
      miniState: false,
      drawer: true
    };
  },
  computed: {
    ...mapState("auth", ["name"]),
    darkMode() {
      return this.$q.dark.isActive;
    }
  },
  methods: {
    openURL,
    toggleDarkMode() {
      this.$q.dark.toggle();
    }
  }
};
</script>

<style>
.app-toolbar {
  height: 70px;
}
</style>
