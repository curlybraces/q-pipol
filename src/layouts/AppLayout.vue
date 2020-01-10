<template>
  <q-layout view="hhh LpR lFr">
    <q-header elevated class="transparent">
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
          label="MB"
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

    <q-footer elevated> </q-footer>

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
      menu: false
    };
  },
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "currentUserEmail",
      "currentUserDisplayName",
      "photoURL"
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
        message: "Are you sure you want to log out?"
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
