import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import activities from '../modules/activities/store';
import auth from '../modules/auth/store';
import directory from '../modules/directory/store';
import projects from '../modules/projects/store';
import project from './project';
import notifications from '../modules/notifications/store';
import operatingUnits from './operating-units';
import options from './options';
import resources from '../modules/resources/store';
import settings from '../modules/settings/store';
import users from '../modules/users/store';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    activities,
    auth,
    directory,
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
  // plugins: [
  //   createPersistedState({
  //     key: 'da-ipms',
  //     paths: ['options'],
  //     rehydrated: () => console.log('The store has been reloaded.')
  //   })
  // ]
});

export default Store;
