<template>
  <q-layout view="hHh Lpr fFf">
    <!-- (Optional) The Header -->
    <q-header>
      <q-toolbar class="bg-info">
        <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>

        <q-space />

        <q-separator vertical inset dark></q-separator>

        <q-btn flat stretch class="text-capitalize" to="/">Home</q-btn>
        <q-btn
          flat
          stretch
          class="text-capitalize"
          to="/dashboard"
          v-if="isLoggedIn"
          >Go to App</q-btn
        >
        <q-btn flat stretch class="text-capitalize" to="/dashboard" v-else
          >Login</q-btn
        >
      </q-toolbar>
    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer class="bg-info text-secondary">
      <app-footer></app-footer>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <q-item-label header class="text-weight-bold text-uppercase">
        Documentation
      </q-item-label>
      <!-- QScrollArea is optional -->
      <q-list>
        <!-- Content here -->
        <q-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          exact
        >
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import AppFooter from '@/ui/components/Footer';
import { CONFIG } from '@/config'

export default {
  name: 'DocumentationLayout',
  components: { AppFooter },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  data() {
    return {
      appName: CONFIG.appName,
      leftDrawer: true,
      links: [
        {
          title: 'Introduction',
          url: '/docs'
        },
        {
          title: 'Features',
          url: '/docs/features'
        },
        {
          title: 'Getting Started',
          url: '/docs/getting-started'
        },
        {
          title: 'Installation',
          url: '/docs/installation'
        }
      ]
    };
  }
};
</script>
