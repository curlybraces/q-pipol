<template>
  <q-layout view="hHh lpR lff">
    <q-header bordered :class="dark ? 'bg-grey-9' : 'bg-white'">
      <q-toolbar>
        <img
          src="statics/app-logo-128x128.png"
          height="35px;"
          @click="$router.push({ name: 'home' })"
          class="cursor-pointer"
        />

        <q-toolbar-title
          class="app-title"
          :class="dark ? 'text-white' : 'text-black'"
        >
          I<span class="gt-md">nvestment </span>P<span class="gt-md"
            >rogramming and </span
          >M<span class="gt-md">anagement </span>S<span class="gt-md"
            >ystem</span
          >
        </q-toolbar-title>
        <q-space />

        <q-btn
          flat
          round
          icon="notifications"
          class="q-mr-md text-grey-6"
          @click="rightDrawer = !rightDrawer"
        >
          <q-badge color="red" floating v-if="notificationsCount > 0">
            {{ notificationsCount }}
          </q-badge>
        </q-btn>

        <q-btn
          :class="dark ? 'bg-purple-4' : 'bg-primary'"
          text-color="white"
          flat
          round
          @mouseenter="menu = true"
          size="sm"
        >
          <q-avatar size="42px">
            <img
              :src="
                image_url
                  ? 'statics/avatars/avatar-' + image_url + '.svg'
                  : 'statics/avatar-placeholder.png'
              "
            />
          </q-avatar>
          <dropdown-menu v-model="menu" />
        </q-btn>
      </q-toolbar>

      <q-separator
        :color="dark ? 'purple-2' : 'orange-10'"
        class="header-separator"
      />

      <q-tabs
        align="left"
        :class="dark ? 'bg-grey-9 text-white' : 'bg-white text-grey-9'"
      >
        <template v-for="({ to, label, icon }, index) in pages">
          <q-route-tab
            :key="index"
            :to="to"
            :label="$q.screen.gt.sm ? label : void 0"
            :icon="$q.screen.lt.md ? icon : void 0"
            class="text-capitalize"
            exact
          />
        </template>
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="rightDrawer"
      side="right"
      :content-class="dark ? 'bg-grey-9' : 'bg-grey-2'"
      bordered
      overlay
      :width="360"
    >
      <right-drawer />
    </q-drawer>

    <q-footer
      bordered
      class="bg-transparent text-grey-9 text-lowercase items-center"
    >
      <div class="row q-pa-sm q-gutter-sm">
        <q-btn flat dense type="a" class="text-lowercase">
          da-ipms2020.web.app
        </q-btn>
        <q-btn flat dense type="a" class="text-capitalize" to="/docs">
          Documentation
        </q-btn>
        <q-btn flat dense type="a" class="text-capitalize" to="/about">
          About
        </q-btn>
        <q-space />
        <span> <q-icon name="copyright" /> 2020 </span>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropdownMenu from '../components/layout/Dropdown';
import RightDrawer from '../components/layout/RightDrawer';

export default {
  components: {
    DropdownMenu,
    RightDrawer
  },
  name: 'AppLayout',
  data() {
    return {
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      menu: false,
      rightDrawer: false,
      pages: [
        {
          label: 'Home',
          icon: 'home',
          to: '/'
        },
        {
          label: 'Projects',
          icon: 'list',
          to: '/projects'
        },
        {
          label: 'Reports',
          icon: 'bubble_chart',
          to: '/reports'
        },
        {
          label: 'Resources',
          icon: 'attach_file',
          to: '/resources'
        },
        {
          label: 'Directory',
          icon: 'phone',
          to: '/directory'
        }
      ]
    };
  },
  computed: {
    ...mapState('auth', ['name', 'image_url']),
    ...mapState('settings', ['dark']),
    ...mapGetters('notifications', ['notificationsCount']),
    darkMode() {
      return this.$q.dark.isActive;
    }
  }
};
</script>

<style>
.app-title {
  font-family: logoFont;
}

.app-title .gt-md {
  font-family: logoFont;
}

hr.q-separator.header-separator {
  height: 3px;
}
</style>
