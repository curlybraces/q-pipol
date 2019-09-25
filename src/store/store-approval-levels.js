const state = {
  approvalLevels: [
    {
      label: "Yet to be submitted to the NEDA Secretariat",
      value: "Yet to be submitted to the NEDA Secretariat"
    },
    {
      label: "Under the NEDA Secretariat Review",
      value: "Under the NEDA Secretariat Review"
    },
    {
      label: "ICC-TB Endorsed",
      value: "ICC-TB Endorsed"
    },
    {
      label: "ICC-CC Approved",
      value: "ICC-CC Approved"
    },
    {
      label: "NEDA Board Confirmed",
      value: "NEDA Board Confirmed"
    },
    {
      label: "Not Applicable",
      value: "Not Applicable"
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
