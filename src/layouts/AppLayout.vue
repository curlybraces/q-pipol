<template>
  <q-layout view="lHh lpR lff">
    <q-header elevated class="bg-grey-1">
      <q-toolbar class="text-grey-9 app-toolbar">
        <img
          src="../assets/logo.svg"
          height="35px;"
          @click="$router.push('/')"
          class="cursor-pointer"
        />
        <q-toolbar-title class="text-primary">E-PLANNING</q-toolbar-title>
        <q-space />
        <q-btn
          class="bg-grey-9 text-white"
          round
          flat
          :label="currentUserDisplayName.charAt(0)"
          @mouseenter="menu = true"
        >
          <q-menu max-width="300px" v-model="menu">
            <q-list style="min-width: 280px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="photoURL" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ currentUserDisplayName }}</q-item-label>
                  <q-item-label caption>{{ currentUserEmail }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/user">
                <q-item-section>Account</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="showLogout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" content-class="bg-grey-2" bordered :width="200">
      <div class="q-pa-md bg-white text-center">
        <q-img src="../assets/logo.svg" alt="logo" style="max-width: 150px" />
        <br />
        <span class="text-h6">E-PLANNING</span>
      </div>
      <q-separator />
      <q-list>
        <q-item-label header>NAVIGATION</q-item-label>
        <q-item
          v-for="({ label, icon, url }, index) in drawerItems"
          :key="index"
          clickable
          :to="url"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>E-PLANNING</q-toolbar-title>
        <q-avatar color="white">
          <q-img src="../statics/ani-at-kita-logo.svg"></q-img>
        </q-avatar>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, Dialog } from "quasar";
import { mapState, mapActions } from "vuex";

export default {
  name: "MyLayout",
  data() {
    return {
      appTitle: "iPMS",
      copyright: "Made by Mark Lester A. Bolotaolo",
      menu: false,
      miniState: false,
      drawer: true,
      drawerItems: [
        {
          label: "Home",
          icon: "home",
          url: "/"
        },
        {
          label: "Projects",
          icon: "list",
          url: "/pip"
        },
        {
          label: "Account",
          icon: "person",
          url: "/user"
        },
        {
          label: "Settings",
          icon: "settings",
          url: "/settings"
        },
        {
          label: "Help",
          icon: "help"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "currentUserEmail",
      "currentUserDisplayName",
      "photoURL",
      "signInProvider"
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
    },
    showLogout() {
      Dialog.create({
        title: "Logout",
        message: "Are you sure you want to log out?",
        cancel: true
      }).onOk(() => this.logoutUser());
    }
  }
};
</script>

<style>
.app-toolbar {
  height: 70px;
}
</style>
