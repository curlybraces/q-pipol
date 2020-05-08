<template>
  <q-layout view="hHh lpR lff">
    <q-header bordered class="bg-accent">
      <app-header></app-header>
    </q-header>

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
import { mapState } from 'vuex';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

export default {
  components: {
    AppFooter,
    AppHeader
  },
  name: 'AppLayout',
  data() {
    return {
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      showAbout: false
    };
  },
  computed: {
    ...mapState('settings', ['dark']),
    darkMode() {
      return this.$q.dark.isActive;
    }
  }
};
</script>

<style>
hr.q-separator.header-separator {
  height: 3px;
}
</style>
