<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
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

        <q-avatar color="white" class="q-mr-xs">
          <img src="statics/da-logo.png" />
        </q-avatar>

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

        <div v-else>
          <q-btn dense flat round icon="email" class="q-mr-xs" color="grey-9" />

          <q-btn
            dense
            flat
            :color="notificationsCount > 0 ? 'white' : 'grey-9'"
            round
            icon="notifications"
            class="q-mr-xs"
            @click="showNotifications = true"
          >
            <q-badge color="red" floating v-if="notificationsCount > 0">
              {{ notificationsCount }}
            </q-badge>
          </q-btn>

          <q-btn dense round flat color="white" icon="account_circle">
            <q-menu
              anchor="bottom right"
              self="top right"
              :offset="[0, 5]"
              square
            >
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Quick Settings</div>
                  <q-toggle v-model="notifyUser" label="Notifications" />
                  <q-toggle v-model="darkMode" label="Dark Mode" />
                  <q-btn
                    flat
                    dense
                    label="Account"
                    to="/account"
                    v-close-popup
                  />
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ user.name }}
                  </div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    @click="logoutUser"
                    size="sm"
                    square
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
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

    <q-footer class="bg-primary text-white glossy" elevated>
      <q-toolbar>
        <small>&copy; {{ copyright }}</small>
        <q-space />
        v.0.0.1-beta
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="showNotifications"
      transition-show="slide-left"
      transition-hide="slide-right"
      maximized
    >
      <notifications-modal
        @close="showNotifications = false"
      ></notifications-modal>
    </q-dialog>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapState, mapActions, mapGetters } from "vuex";
import NotificationsModal from "../components/Notifications/NotificationsModal";

export default {
  components: { NotificationsModal },
  name: "MyLayout",
  data() {
    return {
      appTitle: "iPMS",
      copyright: "Made by Mark Lester A. Bolotaolo",
      leftDrawerOpen: this.$q.platform.is.desktop,
      expanded: false,
      notifyUser: false,
      darkMode: false,
      showNotifications: false,
      sidemenu: [
        {
          label: "Home",
          href: "/",
          icon: "home",
          caption: "Go to dashboard"
        },
        {
          label: "Projects",
          href: "/projects",
          icon: "list",
          caption: "View all projects"
        },
        // {
        //   label: "Help",
        //   href: "/help",
        //   icon: "help",
        //   caption: "Understand how the system works"
        // },
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
    ...mapState("auth", ["loggedIn", "user"]),
    ...mapState("notifications", ["notifications"]),
    ...mapGetters("notifications", ["notificationsCount"])
  },
  methods: {
    openURL,
    ...mapActions("auth", ["logoutUser"]),
    ...mapActions("notifications", ["loadNotifications"])
  },
  created() {
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
