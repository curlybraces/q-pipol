<template>
  <q-layout view="hHh lpR lff">
    <q-header bordered :class="dark ? 'bg-grey-9' : 'bg-white'">
      <app-header @showDrawer="rightDrawer = !rightDrawer"></app-header>
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
        <q-btn flat dense type="a" class="text-capitalize" to="/manual">
          Manual
        </q-btn>
        <q-btn
          flat
          dense
          type="a"
          class="text-capitalize"
          @click="showAbout = true"
        >
          About
        </q-btn>
        <q-space />
        <span> <q-icon name="copyright" /> 2020 </span>
      </div>
      <q-dialog v-model="showAbout">
        <about-component @close="showAbout = false"></about-component>
      </q-dialog>
    </q-footer>

    <q-page-container class="bg-grey-1">
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
import RightDrawer from '../components/layout/RightDrawer';
import AboutComponent from '../components/About';
import AppHeader from '../components/layout/Header';

export default {
  components: {
    AppHeader,
    AboutComponent,
    RightDrawer
  },
  name: 'AppLayout',
  data() {
    return {
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      rightDrawer: false,
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
