import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth/";
import projects from "./store-projects/";
import project from "./store-project";
import options from "../store-options

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
      options
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
