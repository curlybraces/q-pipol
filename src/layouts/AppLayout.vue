<template>
  <q-layout view="hHh lpR lff">
    <q-header bordered :class="dark ? 'bg-grey-9' : 'bg-white'">
      <q-toolbar>
        <img src="statics/app-logo-128x128.png" height="35px;" />

        <q-toolbar-title :class="dark ? 'text-white' : 'text-primary'">
          {{ appTitle }}
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          round
          icon="notifications"
          class="q-mr-md text-grey-6"
          @click="rightDrawer = !rightDrawer"
        />

        <q-btn
          :class="dark ? 'bg-purple-4' : 'bg-primary'"
          text-color="white"
          flat
          round
          :label="name ? name.charAt(0) : 'DA'"
          @mouseenter="menu = true"
          size="sm"
        >
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
    >
      <right-drawer />
    </q-drawer>

    <q-footer elevated>
      <q-toolbar
        :class="dark ? 'bg-grey-9 text-white' : 'bg-white text-grey-9'"
      >
        <q-toolbar-title>{{ appTitleFooter }}</q-toolbar-title>
        <div :class="dark ? 'text-white' : 'text-grey-9'">
          <q-icon name="copyright" /> 2020
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
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
          to: '/pip'
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
        },
        {
          label: 'Account',
          icon: 'account_box',
          to: '/account'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        },
        {
          label: 'Help',
          icon: 'help_outline',
          to: '/help'
        }
      ]
    };
  },
  computed: {
    ...mapState('auth', ['name']),
    ...mapState('settings', ['dark']),
    darkMode() {
      return this.$q.dark.isActive;
    },
    drawer: {
      get() {
        return this.drawerState;
      },
      set(val) {
        this.drawerState = val;
      }
    }
  }
};
</script>

<style>
hr.q-separator.header-separator {
  height: 3px;
}
</style>
