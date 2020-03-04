import Vue from "vue";
import Vuex from "vuex";
import { vuexLocal } from "boot/vuex-persist";
// import vuexLocal from 'vuex-persistedstate'

import auth from "./store-auth";
import projects from "./store-projects";
import project from "./store-project";
import options from "./store-options";
import users from "./store-users";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      projects,
      project,
      options,
      users
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  });

  return Store;
}
