import Vue from 'vue';
import Vuex from 'vuex';
import { vuexLocal } from 'boot/vuex-persist';
// import vuexLocal from 'vuex-persistedstate'

import activities from './store-activities';
import auth from './store-auth';
import contacts from './store-contacts';
import projects from './store-projects';
import project from './store-project';
import notifications from './store-notifications';
import operatingUnits from './store-operating-units';
import options from './store-options';
import resources from './store-resources';
import settings from './store-settings';
import users from './store-users';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      activities,
      auth,
      contacts,
      projects,
      project,
      notifications,
      operatingUnits,
      options,
      resources,
      users,
      settings
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  });

  return Store;
}
