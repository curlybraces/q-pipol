const state = {
  regions: [
    {
        "label": "Nationwide",
        "order": 1,
        "value": 999
    },
    {
        "label": "Inter-Regional",
        "order": 2,
        "value": 998
    },
    {
        "label": "NCR",
        "order": 3,
        "value": 13
    },
    {
        "label": "CAR",
        "order": 4,
        "value": 14
    },
    {
        "label": "Region I",
        "order": 5,
        "value": 1
    },
    {
        "label": "Region II",
        "order": 6,
        "value": 2
    },
    {
        "label": "Region III",
        "order": 7,
        "value": 3
    },
    {
        "label": "Region IV-A",
        "order": 8,
        "value": 4
    },
    {
        "label": "Region IV-B",
        "order": 9,
        "value": 17
    },
    {
        "label": "Region V",
        "order": 10,
        "value": 5
    },
    {
        "label": "Region VI",
        "order": 11,
        "value": 6
    },
    {
        "label": "Region VII",
        "order": 12,
        "value": 7
    },
    {
        "label": "Region VIII",
        "order": 13,
        "value": 8
    },
    {
        "label": "Region IX",
        "order": 14,
        "value": 9
    },
    {
        "label": "Region X",
        "order": 15,
        "value": 10
    },
    {
        "label": "Region XI",
        "order": 16,
        "value": 11
    },
    {
        "label": "Region XII",
        "order": 17,
        "value": 12
    },
    {
        "label": "Region XIII",
        "order": 18,
        "value": 16
    },
    {
        "label": "ARMM",
        "order": 19,
        "value": 15
    }
  ]
};

const mutations = {
  sortRegions(state, value) {
    state.regions = value;
  }
};

const actions = {

};

const getters = {
  regions: (state) => {
    return state.regions.sort( function(a, b) {
      return parseInt(a.order) > parseInt(b.order) ? 1: -1;
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
