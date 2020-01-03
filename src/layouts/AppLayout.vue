<template>
  <q-layout view="hhh LpR lFr">
    <q-header elevated class="transparent">
      <q-toolbar class="text-grey-9">
        <img
          src="../assets/logo.svg"
          height="35px;"
          @click="$router.push('/')"
          class="cursor-pointer"
        />
        <q-toolbar-title class="text-primary">E-PLANNING</q-toolbar-title>
        <q-space />
        <q-btn flat label="LOGOUT" @click="logoutUser" />
      </q-toolbar>
    </q-header>

    <q-footer elevated> </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapState, mapActions } from "vuex";

export default {
  name: "MyLayout",
  data() {
    return {
      appTitle: "iPMS",
      copyright: "Made by Mark Lester A. Bolotaolo",
      sidemenu: [
        {
          label: "Home",
          href: "/",
          icon: "home"
        },
        {
          label: "AFMP",
          href: "/afmp",
          icon: "list"
        },
        {
          label: "Projects",
          href: "/projects",
          icon: "list"
        },
        {
          label: "Directory",
          href: "/directory",
          icon: "call"
        },
        {
          label: "Settings",
          href: "/settings",
          icon: "settings"
        },
        {
          label: "Account",
          href: "/account",
          icon: "person"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "currentUserEmail",
      "currentUserDisplayName"
    ]),
    darkMode() {
      return this.$q.dark.isActive;
    }
  },
  methods: {
    openURL,
    ...mapActions("auth", ["logoutUser"]),
    toggleDarkMode() {
      this.$q.dark.toggle();
    }
  }
};
</script>
