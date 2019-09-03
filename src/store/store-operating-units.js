const state = {
  // operating_units: [] // localStorage.getItem("operating_units") || [],
  operatingUnits: [
    { label: "DA Central Office", value: "DA CO" },
    // RFOs
    { label: "RFO - CAR", value: "RFO CAR" },
    { label: "RFO - I", value: "RFO 1" },
    { label: "RFO - II", value: "RFO 2" },
    { label: "RFO - III", value: "RFO 3" },
    { label: "RFO - IVA", value: "RFO 4A" },
    { label: "RFO - IVB", value: "RFO 4B" },
    { label: "RFO - V", value: "RFO 5" },
    { label: "RFO - VI", value: "RFO 6" },
    { label: "RFO - VII", value: "RFO 7" },
    { label: "RFO - VIII", value: "RFO 8" },
    { label: "RFO - IX", value: "RFO 9" },
    { label: "RFO - X", value: "RFO 10" },
    { label: "RFO - XI", value: "RFO 11" },
    { label: "RFO - XII", value: "RFO 12" },
    { label: "RFO - CARAGA", value: "RFO CARAGA" },
    { label: "DAF-ARMM", value: "DAF-ARMM" },
    // Bureaus
    { label: "ATI - Agricultural Training Institute", value: "ATI" },
    { label: "BAI - Bureau of Animal Industry", value: "BAI" },
    { label: "BAR - Bureau of Agricultural Research", value: "BAR" },
    { label: "BPI - Bureau of Plant Industry", value: "BPI" },
    {
      label: "BAFE - Bureau of Agricultural and Fisheries Engineering",
      value: "BAFE"
    },
    {
      label: "BAFS - Bureau of Agriculture and Fisheries Standard",
      value: "BAFE"
    },
    { label: "BSWM - Bureau of Soils and Water Management", value: "BSWM" },
    // Attached Agencies
    { label: "ACPC - Agricultural Credit Policy Council ", value: "ACPC" },
    {
      label: "BFAR - Bureau of Fisheries and Aquatic Resources",
      value: "BFAR"
    },
    { label: "FPA - Fertilizer and Pesticide Authority", value: "PFA" },
    {
      label: "PhilFIDA - Philippine Fiber Industry Development Authority ",
      value: "PhilFIDA"
    },
    { label: "NMIS - National Meat Inspection Service ", value: "NMIS" },
    { label: "PCC - Philippine Carabao Center ", value: "PCC" },
    {
      label:
        "PhilMech - Philippine Center for Post-Harvest Development and Mechanization",
      value: "PHilMech"
    },
    {
      label: "PCAF - Philippine Council for Agriculture and Fisheries",
      value: "PCAF"
    },
    { label: "PRRI - Philippine Rubber Research Institute", value: "PRRI" },
    // Corporations
    { label: "NDA - National Dairy Authority", value: "NDA" },
    { label: "NFA - National Food Authority", value: "NFA" },
    { label: "NTA - National Tobacco Administration", value: "NTA" },
    { label: "PCA - Philippine Coconut Authority", value: "PCA" },
    { label: "PCIC - Philippine Crop Insurance Corporation", value: "PCIC" },
    {
      label: "PFDA - Philippine Fisheries Development Authority",
      value: "PFDA"
    },
    {
      label: "PhilRice - Philippine Rice Research Institute",
      value: "PhilRice"
    },
    {
      label: "QuedanCor - Quedan and Rural Credit Guarantee Corporation",
      value: "QuedanCor"
    },
    { label: "SRA - Sugar Regulatory Administration", value: "SRA" }
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
