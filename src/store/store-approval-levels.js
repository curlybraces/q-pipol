const state = {
  // approval_levels: [] // localStorage.getItem("approval_levels") || [],
  approval_levels: [
    {
      label: "Yet to be submitted to the NEDA Secretariat",
      value: 1
    },
    {
      label: "Under the NEDA Secretariat Review",
      value: 2
    },
    {
      label: "ICC-TB Endorsed ",
      value: 3
    },
    {
      label: "ICC-CC Approved",
      value: 4
    },
    {
      label: "NEDA Board Confirmed",
      value: 5
    },
    {
      label: "Not Applicable",
      value: 6
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
