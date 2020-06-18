<template>
  <q-layout view="lHh LpR lff">
    <q-header bordered class="bg-accent">
      <app-header></app-header>

      <q-separator color="secondary" class="header-separator" />

      <route-tabs 
        :filteredTabs="filteredTabs"
        v-if="$q.screen.lt.md"
      />
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="250"
        :breakpoint="400"
        v-if="$q.screen.gt.sm"
      >
      <app-sidebar :filteredTabs="filteredTabs" />
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="avatar">
          </q-avatar>
          <div class="text-weight-bold text-uppercase">
            {{ user.name }}
          </div>
          <div>@{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-footer
      bordered
      class="bg-info text-secondary text-lowercase items-center"
    >
      <app-footer></app-footer>
    </q-footer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import AppSidebar from '../components/Sidebar';
import RouteTabs from '../components/RouteTabs';
import gql from 'graphql-tag';

export default {
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    RouteTabs
  },
  name: 'AppLayout',
  data() {
    return {
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      showAbout: false,
      drawer: true,
      processing_statuses: [],
      tabs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          label: 'Projects',
          icon: 'storage',
          to: '/projects',
          children: [
            { id: 1, name: 'draft', count_projects: 0 },
            { id: 2, name: 'finalized', count_projects: 0 },
            { id: 3, name: 'endorsed', count_projects: 0 },
            { id: 4, name: 'returned', count_projects: 0 },
            { id: 5, name: 'validated', count_projects: 0 },
            { id: 6, name: 'reviewed', count_projects: 0 },
            { id: 7, name: 'accepted', count_projects: 0 },
            { id: 8, name: 'approved', count_projects: 0 },
            { id: 9, name: 'encoded', count_projects: 0 }
          ]
        },
        {
          label: 'Directory',
          icon: 'phone',
          to: '/directory'
        },
        {
          label: 'Profile',
          icon: 'tune',
          to: '/profile'
        },
        {
          label: 'Users',
          icon: 'lock',
          to: '/admin'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('auth',['user','avatar']),
    ...mapState('settings', ['dark']),
    darkMode() {
      return this.$q.dark.isActive;
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    filteredTabs() {
      // This function hides the users tab if the user is not admin or superadmin
      let filteredTabs = [];

      if (this.isAdmin) {
        filteredTabs = this.tabs;

        return filteredTabs;
      }

      filteredTabs = this.tabs.filter(tab => tab.label !== 'Users');

      return filteredTabs;
    }
  },
  apollo: {
    processing_statuses: {
      query: gql`
        query {
          processing_statuses {
            id
            name
            count_projects
          }
        }
      `,
      variables: {},
      result({ data }) {
        this.tabs.map(tab => {
          if (tab.label === 'Projects') {
            tab.children = data.processing_statuses;
          }
          return tab;
        });
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
