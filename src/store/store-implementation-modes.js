const state = {
  implementationModes: [
    {
      label:
        "Through Local Funds in accordance with RA 9184 or the Government Procurement Act",
      value: 1
    },
    {
      label: "Through ODA pursuant to RA 8182 or the ODA Act of 1996",
      value: 2
    },
    {
      label: "Through PPP under the Amended BOT Law and Its IRR",
      value: 3
    },
    {
      label: "Through Joint Venture Arrangement",
      value: 4
    },
    {
      label: "Others",
      value: 5
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
