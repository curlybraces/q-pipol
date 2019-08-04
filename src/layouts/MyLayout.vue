<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          v-if="loggedIn"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-avatar color="white">
          <img src="statics/app-logo-128x128.png" />
        </q-avatar>

        <q-toolbar-title>
          {{ appTitle }}
        </q-toolbar-title>

        <q-btn
          flat
          v-if="!loggedIn"
          to="/login"
          icon-right="account_circle"
          class="absolute-right"
          label="Login"
        />

        <div class="row" v-else>
          <q-btn
            flat
            color="grey-6"
            round
            icon="notifications"
            class="q-mr-xs"/>

          <q-btn
            flat
            @click="logoutUser"
            icon-right="account_circle"
            label="Logout"/>

          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-primary"
    >
      <q-list separator padding dark>
        <q-item-label header>NAVIGATION</q-item-label>

        <template v-for="item in sidemenu">
          <q-item
            :key="item.label"
            exact
            clickable
            :to="item.href"
            exact-active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-footer class="bg-primary-1 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <small>&copy; {{ copyright }}</small>
        </q-toolbar-title>
        v.0.0.1-beta
      </q-toolbar>
    </q-footer>

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
      leftDrawerOpen: this.$q.platform.is.desktop,
      expanded: false,
      sidemenu: [
        {
          label: "Dashboard",
          href: "/",
          icon: "dashboard",
          caption: "Go to dashboard"
        },
        {
          label: "Projects",
          href: "/projects",
          icon: "list",
          caption: "View all projects"
        },
        /*
        {
          label: "Programs",
          href: "/programs",
          icon: "list",
          caption: "View all programs"
        },
        */
        {
          label: "Help",
          href: "/help",
          icon: "help",
          caption: "Understand how the system works"
        },
        {
          label: "Settings",
          href: "/settings",
          icon: "settings",
          caption: "Change user and system settings"
        },
        {
          label: "About",
          href: "/about",
          icon: "info",
          caption: "About the System"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    openURL,
    ...mapActions("auth", ["logoutUser"])
  }
};
</script>

<style scoped>
.my-menu-link .q-item__label {
  color: #f9aa33;
}

.my-menu-link .material-icons {
  color: #f9aa33;
}
</style>
