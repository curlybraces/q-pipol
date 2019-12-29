<template>
  <q-layout view="hhh LpR lFr">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <span class="app-title">
            {{ appTitle }}
          </span>
        </q-toolbar-title>

        <q-btn icon="apps" flat round>
          <q-tooltip>Apps</q-tooltip>
        </q-btn>

        <q-btn icon="notifications" flat round>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>
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
      leftDrawerOpen: false,
      expanded: false,
      notifyUser: false,
      darkMode: false,
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
    ...mapState("settings", ["dark"]),
    rightDrawerOpen() {
      return !this.loggedIn && this.$q.screen.gt.sm;
    }
  },
  methods: {
    openURL,
    ...mapActions("auth", ["logoutUser"]),
    ...mapActions("settings", ["setDark"])
  }
};
</script>

<style scoped>
.app-title {
  font-family: PrimeTime;
}
</style>
