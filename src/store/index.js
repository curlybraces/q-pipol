import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import notifications from "./store-notifications";
// import dropdown from "./store-dropdown";
import projects from "./store-projects";
import settings from "./store-settings";

// Dropdown stores
import approval_levels from "./store-approval-levels";
import categorizations from "./store-categorizations";
import cip_types from "./store-cip-types";
import city_municipalities from "./store-city-municipalities";
import contact_types from "./store-contact-types";
import funding_institutions from "./store-funding-institutions";
import funding_sources from "./store-funding-sources";
import gad_readinesses from "./store-gad-readinesses";
import implementation_bases from "./store-implementation-bases";
import implementation_modes from "./store-implementation-modes";
import implementation_periods from "./store-implementation-periods";
import implementation_readinesses from "./store-implementation-readinesses";
import infrastructure_sectors from "./store-infrastructure-sectors";
import infrastructure_subsectors from "./store-infrastructure-subsectors";
import new_thinkings from "./store-new-thinkings";
import operating_units from "./store-operating-units";
import pap_types from "./store-pap-types";
import pdp_chapters from "./store-pdp-chapters";
import pdp_indicators from "./store-pdp-indicators";
import pdp_outcomes from "./store-pdp-outcomes";
import permissions from "./store-permissions";
import pip_types from "./store-pip-types";
import preparation_documents from "./store-preparation-documents";
import prexc_activities from "./store-prexc-activities";
import programming_documents from "./store-programming-documents";
import provinces from "./store-provinces";
import regions from "./store-regions";
import roles from "./store-roles";
import spatial_coverages from "./store-spatial-coverages";
import sustainable_development_goals from "./store-sustainable-development-goals";
import ten_point_agenda from "./store-ten-point-agenda";

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
      // dropdown,
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
      implementation_bases,
      implementation_modes,
      implementation_periods,
      implementation_readinesses,
      infrastructure_sectors,
      infrastructure_subsectors,
      new_thinkings,
      operating_units,
      pap_types,
      pdp_chapters,
      pdp_indicators,
      pdp_outcomes,
      permissions,
      pip_types,
      preparation_documents,
      prexc_activities,
      programming_documents,
      provinces,
      regions,
      roles,
      spatial_coverages,
      sustainable_development_goals,
      ten_point_agenda
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
