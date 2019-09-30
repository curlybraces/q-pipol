import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth/";
import projects from "./store-projects/";
import directory from "./store-directory";
import settings from "./store-settings";

// Dropdown stores
import approval_levels from "./store-approval-levels";
import categorizations from "./store-categorizations";
import challenges from "./store-challenges";
import cip_types from "./store-cip-types";
import city_municipalities from "./store-city-municipalities";
import commodities from "./store-commodities";
import contact_types from "./store-contact-types";
import funding_institutions from "./store-funding-institutions";
import funding_sources from "./store-funding-sources";
import gad_responsiveness from "./store-gad-responsiveness";
import implementation_bases from "./store-implementation-bases";
import implementation_modes from "./store-implementation-modes";
import implementation_periods from "./store-implementation-periods";
import implementation_readinesses from "./store-implementation-readinesses";
import infrastructure_sectors from "./store-infrastructure-sectors";
import neda_processing from "./store-neda-processing";
import new_thinkings from "./store-new-thinkings";
import operating_units from "./store-operating-units";
import pap_types from "./store-pap-types";
import pdp_chapters from "./store-pdp-chapters";
import pdp_outcomes from "./store-pdp-outcomes";
import permissions from "./store-permissions";
import pip_types from "./store-pip-types";
import preparation_documents from "./store-preparation-documents";
import prerequisites from "./store-prerequisites";
import prexc_activities from "./store-prexc-activities";
import priority_concerns from "./store-priority-concerns";
import provinces from "./store-provinces";
import ratings from "./store-ratings";
import regions from "./store-regions";
import roles from "./store-roles";
import spatial_coverages from "./store-spatial-coverages";
import statuses from "./store-statuses";
import sustainable_development_goals from "./store-sustainable-development-goals";
import ten_point_agenda from "./store-ten-point-agenda";
import typologies from "./store-typologies";

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
      directory,
      settings,

      approval_levels,
      categorizations,
      challenges,
      cip_types,
      city_municipalities,
      commodities,
      contact_types,
      funding_institutions,
      funding_sources,
      gad_responsiveness,
      implementation_bases,
      implementation_modes,
      implementation_periods,
      implementation_readinesses,
      infrastructure_sectors,
      neda_processing,
      new_thinkings,
      operating_units,
      pap_types,
      pdp_chapters,
      pdp_outcomes,
      permissions,
      pip_types,
      preparation_documents,
      prerequisites,
      prexc_activities,
      priority_concerns,
      provinces,
      ratings,
      regions,
      roles,
      spatial_coverages,
      statuses,
      sustainable_development_goals,
      ten_point_agenda,
      typologies
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
