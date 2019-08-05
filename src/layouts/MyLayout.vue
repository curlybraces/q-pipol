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
            dense
            flat
            :color="notifications.length > 0 ? 'white' : 'grey-9'"
            round
            icon="notifications"
            class="q-mr-xs"
          >
            <q-badge color="red" floating v-if="notifications.length > 0">
              {{ notifications.length }}
            </q-badge>

            <q-menu
              :content-style="{ color: 'primary' }"
              anchor="bottom right"
              self="top right"
              :offset="[0, 5]"
              square
              v-if="notifications.length > 0"
            >
              <q-list dense style="width: 360px" separator>
                <q-item>
                  <q-item-section class="text-center"
                    >Notifications</q-item-section
                  >
                </q-item>
                <!-- Notifications go here -->
                <q-item
                  clickable
                  v-for="notif in notifications"
                  :key="notif.id"
                  v-close-popup
                >
                  <q-item-section avatar>
                    <q-avatar color="white">
                      <img src="statics/app-logo-128x128.png" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label overline>{{
                      notif.type | notifType
                    }}</q-item-label>
                    <q-item-label lines="3">{{
                      notif.data.message
                    }}</q-item-label>
                    <q-item-label caption>
                      <q-icon name="access_time" />
                      {{ notif.created_at | dateDiff }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  class="text-center"
                  to="/notifications"
                  v-close-popup
                >
                  <q-item-section>See all</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            flat
            @click="logoutUser"
            icon-right="account_circle"
            label="Logout"
          />
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
        <small>&copy; {{ copyright }}</small>
        <q-space />
        v.0.0.1-beta
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, date } from "quasar";
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
        {
          label: 'Recycle Bin',
          href: '/projects/recycle',
          icon: 'delete',
          caption: 'View deleted projects'
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
    ...mapState("auth", ["loggedIn"]),
    ...mapState("notifications", ["notifications"])
  },
  methods: {
    openURL,
    ...mapActions("auth", ["logoutUser"]),
    ...mapActions("notifications", ["loadNotifications"])
  },
  filters: {
    dateDiff(val) {
      const newDate = new Date();
      let notifDate = new Date(val);
      return date.getDateDiff(newDate, notifDate, "hours") + " hrs ago";
    },
    notifType(type) {
      if (type == "App\\Notifications\\ProjectCreated") {
        return "Project Created";
      } else if (type == "App\\Notifications\\ProjectUpdated") {
        return "Project Updated";
      } else if (type == "App\\Notifications\\ProjectDeleted") {
        return "Project Deleted";
      } else if (type == "App\\Notifications\\ProjectFinalized") {
        return "Project Finalized";
      } else {
        return "Others";
      }
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.loadNotifications();
    }
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
