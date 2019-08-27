const state = {
  // operating_units: [] // localStorage.getItem("operating_units") || [],
  operatingUnits: [
    { label: "DA Central Office", value: 1 },
    // RFOs
    { label: "RFO - CAR", value: 2 },
    { label: "RFO - I", value: 3 },
    { label: "RFO - II", value: 4 },
    { label: "RFO - III", value: 5 },
    { label: "RFO - IVA", value: 6 },
    { label: "RFO - IVB", value: 7 },
    { label: "RFO - V", value: 8 },
    { label: "RFO - VI", value: 9 },
    { label: "RFO - VII", value: 10 },
    { label: "RFO - VIII", value: 11 },
    { label: "RFO - IX", value: 12 },
    { label: "RFO - X", value: 13 },
    { label: "RFO - XI", value: 14 },
    { label: "RFO - XII", value: 15 },
    { label: "RFO - CARAGA", value: 16 },
    { label: "DAF-ARMM", value: 17 },
    // Bureaus
    { label: "ATI - Agricultural Training Institute", value: 18 },
    { label: "BAI - Bureau of Animal Industry", value: 19 },
    { label: "BAR - Bureau of Agricultural Research", value: 20 },
    { label: "BPI - Bureau of Plant Industry", value: 21 },
    { label: "BAFE - Bureau of Agricultural and Fisheries Engineering", value: 22 },
    { label: "BAFS - Bureau of Agriculture and Fisheries Standard", value: 23 },
    { label: "BSWM - Bureau of Soils and Water Management", value: 24 },
    // Attached Agencies
    { label: "ACPC - Agricultural Credit Policy Council ", value: 25 },
    { label: "BFAR - Bureau of Fisheries and Aquatic Resources", value: 26 },
    { label: "FPA - Fertilizer and Pesticide Authority", value: 27 },
    { label: "PhilFIDA - Philippine Fiber Industry Development Authority ", value: 28 },
    { label: "NMIS - National Meat Inspection Service ", value: 29 },
    { label: "PCC - Philippine Carabao Center ", value: 30 },
    { label: "PhilMech - Philippine Center for Post-Harvest Development and Mechanization",
      value: 31 },
    { label: "PCAF - Philippine Council for Agriculture and Fisheries", value: 32 },
    { label: "PRRI - Philippine Rubber Research Institute", value: 33 },
    // Corporations
    { label: "NDA - National Dairy Authority", value: 34 },
    { label: "NFA - National Food Authority", value: 35 },
    { label: "NTA - National Tobacco Administration", value: 36 },
    { label: "PCA - Philippine Coconut Authority", value: 37 },
    { label: "PCIC Philippine Crop Insurance Corporation", value: 38 },
    { label: "PFDA - Philippine Fisheries Development Authority", value: 39 },
    { label: "PhilRice - Philippine Rice Research Institute", value: 40 },
    { label: "QuedanCor - Quedan and Rural Credit Guarantee Corporation", value: 41 },
    { label: "SRA - Sugar Regulatory Administration", value: 42 },

  ]
};

const mutations = {};

const actions = {};

const getters = {
  //
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
