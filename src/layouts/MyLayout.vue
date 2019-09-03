<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="dark ? 'bg-grey-10' : 'bg-primary'">
      <q-toolbar>
        <q-avatar color="white" class="q-mr-xs">
          <img src="statics/da-logo.png" />
        </q-avatar>

        <q-avatar color="white">
          <img src="statics/app-logo-128x128.png" />
        </q-avatar>

        <q-toolbar-title>
          <span class="app-title">{{ appTitle }}</span>
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

                  <q-toggle
                    label="Dark Mode"
                    v-model="settingsDark"
                    @toggle="setDark(val)"
                  />

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
                    Username
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

          <q-btn
            flat
            dense
            round
            color="white"
            :icon="settingsDark ? 'brightness_high' : 'brightness_low'"
            v-model="settingsDark"
            @click="settingsDark = !settingsDark"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :content-class="dark ? 'bg-grey-10' : 'bg-primary'"
      :breakpoint="767"
    >
      <q-list padding dark>
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
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-footer :class="dark ? 'bg-grey-10' : 'bg-primary'" :dark="dark" elevated>
      <q-tabs align="justify" switch-indicator>
        <q-route-tab
          v-for="item in sidemenu"
          :to="item.href"
          :label="item.label"
          :icon="item.icon"
          :key="item.label"
        ></q-route-tab>
      </q-tabs>
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
      leftDrawerOpen: true,
      expanded: false,
      notifyUser: false,
      darkMode: false,
      sidemenu: [
        {
          label: "Projects",
          href: "/",
          icon: "list",
          caption: "View all projects"
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
    ...mapState("settings", ["dark"]),
    settingsDark: {
      get() {
        return this.dark;
      },
      set(val) {
        this.setDark(val);
      }
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

.my-menu-link .q-item__label {
  color: #f9aa33;
}

.my-menu-link .material-icons {
  color: #f9aa33;
}

@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>
