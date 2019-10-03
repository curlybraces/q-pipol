<template>
  <q-layout view="lHr LpR lFr">
    <q-header :class="dark ? 'bg-grey-10' : 'bg-primary'" elevated>
      <q-toolbar>
        <q-btn
          icon="menu"
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="loggedIn"
        ></q-btn>

        <q-toolbar-title>
          <span class="app-title">
            {{ appTitle }}
          </span>
        </q-toolbar-title>

        <q-btn
          v-if="loggedIn"
          flat
          label="Add Project"
          :to="'/add'"
          class="q-mr-md"
        />
        <q-btn v-if="loggedIn" outline label="Logout" @click="logoutUser">
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :content-class="dark ? 'bg-grey-10' : 'bg-white'"
      :width="250"
      v-if="loggedIn"
    >
      <q-img
        class="absolute-top"
        src="statics/masaganang-ani-mataas-na-kita.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ currentUserDisplayName }}
          </div>
          <div>
            {{ currentUserEmail }}
          </div>
        </div>
      </q-img>
      <left-drawer :sidemenu="sidemenu" />
    </q-drawer>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      :width="480"
      v-if="!loggedIn && $q.screen.gt.sm"
    >
      <login-form></login-form>
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
  components: {
    "login-form": () =>
      import(
        /* webpackChunkName: 'LoginForm' */ "../components/AppLayout/LoginForm"
      ),
    "left-drawer": () =>
      import(
        /* webpackChunkName: 'LeftDrawer' */ "../components/AppLayout/LeftDrawer"
      )
  },
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
          label: "Projects",
          href: "/projects",
          icon: "list"
        },
        {
          label: "Submissions",
          href: "/submissions",
          icon: "gps_fixed"
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

@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>
