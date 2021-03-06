<template>
  <q-list :dense="dense">
    <q-item-label header>NAVIGATION</q-item-label>

    <q-item v-if="admin" clickable to="/admin">
      <q-item-section avatar>
        <q-icon name="lock"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label>ADMIN</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <template v-for="({ label, icon, url, submenu }, index) in drawerItems">
      <template v-if="submenu">
        <q-expansion-item
          :key="index"
          expand-separator
          icon="list"
          label="Projects"
          class="text-uppercase"
          :dense="dense"
        >
          <q-item
            :dense="dense"
            v-for="({ label, icon, url }, index) in submenu"
            :header-inset-level="1"
            expand-separator
            :key="index"
            :to="url"
            exact
            clickable
            class="text-uppercase"
          >
            <q-item-section avatar>
              <q-icon :name="icon" />
            </q-item-section>
            <q-item-section>{{ label }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
      <template v-else>
        <q-item :key="index" clickable :to="url" exact class="text-uppercase">
          <q-item-section avatar>
            <q-icon :name="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
    <q-separator />
    <q-item clickable @click="showHelp">
      <q-item-section avatar>
        <q-icon name="contact_support" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Contact Us
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DrawerContent',
  data() {
    return {
      appTitle: 'IPMS',
      drawerItems: [
        {
          label: 'Home',
          icon: 'home',
          url: '/'
        },
        {
          label: 'Projects',
          icon: 'list',
          url: '/pip',
          submenu: [
            {
              label: 'Add Project',
              icon: 'playlist_add',
              url: '/pip/new'
            },
            {
              label: 'View Projects',
              icon: 'list',
              url: '/pip'
            },
            {
              label: 'Deleted Projects',
              icon: 'delete',
              url: '/trash'
            }
          ]
        },
        {
          label: 'Reports',
          icon: 'bubble_chart',
          url: '/reports'
        },
        {
          label: 'Resources',
          icon: 'folder_open',
          url: '/resources'
        },
        {
          label: 'Directory',
          icon: 'call',
          url: '/directory'
        },
        {
          label: 'Account',
          icon: 'person',
          url: '/account'
        },
        {
          label: 'Settings',
          icon: 'settings',
          url: '/settings'
        }
      ]
    };
  },
  computed: {
    ...mapState('settings', ['dense']),
    admin() {
      return (
        this.$store.state.auth.role == 'admin' ||
        this.$store.state.auth.role == 'superadmin'
      );
    }
  },
  methods: {
    showHelp() {
      this.$q
        .dialog({
          title: 'Help',
          message: 'Need help? Send us a message.',
          prompt: {
            model: '',
            type: 'text',
            isValid: val => val.length > 5
          },
          cancel: true,
          persistent: true,
          transitionShow: 'fade',
          transitionHide: 'fade'
        })
        .onOk(data => alert(data));
    }
  }
};
</script>

<style>
.q-router-link--exact-active {
  font-weight: bold;
}
</style>
