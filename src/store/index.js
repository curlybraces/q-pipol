import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth/";
import interventions from "./store-interventions";
import projects from "./store-projects/";
import directory from "./store-directory";
import settings from "./store-settings";
import submissions from "./store-submissions";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      interventions,
      projects,
      directory,
      settings,
      submissions
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
