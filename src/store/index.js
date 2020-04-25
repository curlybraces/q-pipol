import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import activities from './activities';
import auth from '../modules/auth/store';
import contacts from './contacts';
import projects from './projects';
import project from './project';
import notifications from './notifications';
import operatingUnits from './operating-units';
import options from './options';
import resources from './resources';
import settings from './settings';
import users from './users';

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
    plugins: [
      createPersistedState({
        key: 'da-ipms',
        paths: ['options'],
        rehydrated: () => console.log('The store has been reloaded.')
      })
    ]
  });

  return Store;
}
