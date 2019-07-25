<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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

        <q-toolbar-title>
          {{ appTitle }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>NAVIGATION</q-item-label>
        <template v-for="item in sidemenu">
          <q-item
            :key="item.label"
            exact
            clickable
            :to="item.href">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>quasar.dev</q-item-label>
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
          icon: 'dashboard'
        },
        {
          label: 'Projects',
          href: '/projects',
          icon: 'list',
        },
        {
          label: 'Add Project',
          href: '/projects/add',
          icon: 'playlist_add'
        },
        {
          label: 'Settings',
          href: '/settings',
          icon: 'settings'
        }
      ]
    };
  },
  methods: {
    openURL
  }
};
</script>

<style></style>
