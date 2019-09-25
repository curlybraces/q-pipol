const state = {
  regions: [
    // {
    //   label: "Nationwide",
    //   order: 1,
    //   value: 999
    // },
    // {
    //   label: "Inter-Regional",
    //   order: 2,
    //   value: 998
    // },
    {
      label: "NCR",
      order: 3,
      value: "NCR"
    },
    {
      label: "CAR",
      order: 4,
      value: "CAR"
    },
    {
      label: "Region I",
      order: 5,
      value: "Region I"
    },
    {
      label: "Region II",
      order: 6,
      value: "Region II"
    },
    {
      label: "Region III",
      order: 7,
      value: "Region III"
    },
    {
      label: "Region IV-A",
      order: 8,
      value: "Region IV-A"
    },
    {
      label: "Region IV-B",
      order: 9,
      value: "Region IV-B"
    },
    {
      label: "Region V",
      order: 10,
      value: "Region V"
    },
    {
      label: "Region VI",
      order: 11,
      value: "Region VI"
    },
    {
      label: "Region VII",
      order: 12,
      value: "Region VII"
    },
    {
      label: "Region VIII",
      order: 13,
      value: "Region VIII"
    },
    {
      label: "Region IX",
      order: 14,
      value: "Region IX"
    },
    {
      label: "Region X",
      order: 15,
      value: "Region X"
    },
    {
      label: "Region XI",
      order: 16,
      value: "Region XI"
    },
    {
      label: "Region XII",
      order: 17,
      value: "Region XII"
    },
    {
      label: "Region XIII",
      order: 18,
      value: "Region XIII"
    },
    {
      label: "ARMM",
      order: 19,
      value: "ARMM"
    }
  ]
};

const mutations = {
  sortRegions(state, value) {
    state.regions = value;
  }
};

const actions = {};

const getters = {
  regions: state => {
    return state.regions.sort(function (a, b) {
      return parseInt(a.order) > parseInt(b.order) ? 1 : -1;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
