<template>
  <q-layout view="LHh lpR lff">
    <q-header bordered class="bg-white">
      <q-toolbar class="text-grey-9 app-toolbar">
        <img
          src="statics/logo.svg"
          height="35px;"
          @click="drawer = !drawer"
          class="cursor-pointer"
        />
        <q-toolbar-title class="text-primary">{{ appTitle }}</q-toolbar-title>
        <q-space />
        <q-btn
          flat
          round
          icon="notifications"
          class="q-mr-md text-grey-6"
          @click="rightDrawer = !rightDrawer"
        />
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

    <q-drawer v-model="drawer" content-class="bg-grey-2" bordered>
      <q-toolbar class="app-toolbar">
        <img
          src="statics/logo.svg"
          height="35px;"
          @click="drawer = !drawer"
          class="cursor-pointer"
        />
        <q-toolbar-title>IPMS</q-toolbar-title>
      </q-toolbar>
      <q-separator/>
      <drawer-content />
    </q-drawer>

    <q-drawer
      v-model="rightDrawer"
      side="right"
      content-class="bg-grey-2"
      bordered
    >
      <right-drawer />
    </q-drawer>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>{{ appTitleFooter }}</q-toolbar-title>
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
import { mapState } from "vuex";

import DrawerContent from "../components/layout/Drawer";
import DropdownMenu from "../components/layout/Dropdown";
import RightDrawer from "../components/layout/RightDrawer";

export default {
  components: { DrawerContent, DropdownMenu, RightDrawer },
  name: "AppLayout",
  data() {
    return {
      appTitle: "IPMS",
      appTitleFooter: "Investment Programming & Management System",
      copyright: "Made by Mark Lester A. Bolotaolo",
      menu: false,
      miniState: false,
      drawerState: this.$q.screen.gt.lg,
      rightDrawer: false
    };
  },
  computed: {
    ...mapState("auth", ["name"]),
    darkMode() {
      return this.$q.dark.isActive;
    },
    drawer: {
      get() {
        return this.drawerState;
      },
      set(val) {
        this.drawerState = val;
      }
    }
  },
  methods: {
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
