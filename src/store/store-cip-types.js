const state = {
  cip_types: [
    {
      label:
        "Locally-funded major capital programs/projects with total project cost of at least PhP2.5 billion",
      value: 1
    },
    {
      label:
        "ODA-assisted grants with total project cost of at least PhP2.5 billion",
      value: 2
    },
    {
      label:
        "ODA-assisted loans regardless of amount that requires national government guarantee",
      value: 3
    },
    {
      label:
        "Relending activities to LGUs and other target beneficiaries with total project cost of at least PhP 2.5 billion",
      value: 4
    },
    {
      label: "Solicited national PPP projects",
      value: 5
    },
    {
      label:
        "Joint Venture (JV) Agreement with with government contribution amounting of at least PhP150 Million",
      value: 6
    },
    {
      label:
        "Administrative buildings with total project cost of at least PhP1 billion",
      value: 7
    },
    {
      label: "Not Applicable",
      value: 8
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
