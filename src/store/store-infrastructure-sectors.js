const state = {
  infrastructureSectors: [
    {
      label: "Social Infrastructure",
      value: "Social Infrastructure",
      children: [
        {
          label: "Health",
          value: "Health"
        },
        {
          label: "Education",
          value: "Education"
        },
        {
          label: "Solid Waste Management",
          value: "Solid Waste Management"
        },
        {
          label: "Housing",
          value: "Housing"
        },
        {
          label: "Public Safety/Security",
          value: "Public Safety/Security"
        },
        {
          label: "Urban/Heritage Renewal",
          value: "Urban/Heritage Renewal"
        }
      ]
    },
    {
      label: "Power - Electrification",
      value: "Power - Electrification",
      children: []
    },
    {
      label: "Transportation",
      value: "Transportation",
      children: [
        {
          label: "Roads and Bridges",
          value: "Roads and Bridges"
        },
        {
          label: "Water Transportation",
          value: "Water Transportation"
        },
        {
          label: "Air Transportation",
          value: "Air Transportation"
        },
        {
          label: "Rail Transportation",
          value: "Rail Transportation"
        },
        {
          label: "Urban Transportation",
          value: "Urban Transportation"
        }
      ]
    },
    {
      label: "Water Resources",
      value: "Water Resources",
      children: [
        {
          label: "Irrigation",
          value: "Irrigation"
        },
        {
          label: "Water Supply",
          value: "Water Supply"
        },
        {
          label: "Flood Management",
          value: "Flood Management"
        },
        {
          label: "Sanitation/Sewerage/Septage",
          value: "Sanitation/Sewerage/Septage"
        }
      ]
    },
    {
      label: "Information and Communications Technology",
      value: "Information and Communications Technology",
      children: []
    },
    {
      label: "Others",
      value: "Others",
      children: [
        {
          label: "Reclamation",
          value: "Reclamation"
        },
        {
          label: "Government Building",
          value: "Government Building"
        },
        {
          label: "Multipurpose Facilities",
          value: "Multipurpose Facilities"
        },
        {
          label: "Others",
          value: "Others"
        }
      ]
    }
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
