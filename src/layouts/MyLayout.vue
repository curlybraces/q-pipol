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
        >
          <q-icon name="menu" />
        </q-btn>

        <q-avatar color="white">
          <img src="statics/app-logo-128x128.png">
        </q-avatar>

        <q-toolbar-title>
          {{ appTitle }}
        </q-toolbar-title>

        <q-btn flat to="/login">Login</q-btn>

        <q-btn flat>Logout</q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-primary"
      >

      <q-list
        separator
        padding
        dark
        >

        <q-item-label header>NAVIGATION</q-item-label>

        <template v-for="item in sidemenu">

          <q-item
            :key="item.label"
            exact
            clickable
            :to="item.href"
            exact-active-class="my-menu-link">

            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>

          </q-item>

        </template>

      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      appTitle: 'PIPOL',
      leftDrawerOpen: this.$q.platform.is.desktop,
      sidemenu: [
        {
          label: 'Dashboard',
          href: '/',
          icon: 'dashboard',
          caption: 'Go to dashboard'
        },
        {
          label: 'Projects',
          href: '/projects',
          icon: 'list',
          caption: 'View all projects'
        },
        {
          label: 'Add Project',
          href: '/projects/add',
          icon: 'playlist_add',
          caption: 'Add a new project'
        },
        {
          label: 'Settings',
          href: '/settings',
          icon: 'settings',
          caption: 'Change user and system settings'
        }
      ]
    };
  },
  methods: {
    openURL
  }
};
</script>

<style scoped>

  .my-menu-link .q-item__label  {
    color: #f9aa33;
  }

  .my-menu-link .material-icons {
    color: #f9aa33;
  }

</style>
