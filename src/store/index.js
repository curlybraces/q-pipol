import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import notifications from "./store-notifications";
import dropdown from "./store-dropdown";
import projects from "./store-projects";
import settings from "./store-settings";

// Dropdown stores
import approval_levels from "./store-approval-levels"
import categorizations from "./store-categorizations"
import cip_types from "./store-cip-types"
import city_municipalities from "./store-city-municipalities"
import contact_types from "./store-contact-types"
import funding_institutions from "./store-funding-institutions"
import funding_sources from "./store-funding-sources"
import gad_readinesses from "./store-gad-readinesses"

import implementation_modes from "./store-implementation-modes"
import implementation_periods from "./store-implementation-periods"

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      notifications,
      dropdown,
      projects,
      settings,

      approval_levels,
      categorizations,
      cip_types,
      city_municipalities,
      contact_types,
      funding_institutions,
      funding_sources,
      gad_readinesses,

      implementation_modes,
      implementation_periods,


    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
