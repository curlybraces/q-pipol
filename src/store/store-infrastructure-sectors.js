const state = {
  infrastructure_sectors: [
    {
        "label": "Social Infrastructure",
        "value": 1,
        "children": [
            {
                "label": "Health",
                "value": 11
            },
            {
                "label": "Education",
                "value": 12
            },
            {
                "label": "Solid Waste Management",
                "value": 13
            },
            {
                "label": "Housing",
                "value": 14
            },
            {
                "label": "Public Safety/Security",
                "value": 15
            },
            {
                "label": "Urban/Heritage Renewal",
                "value": 16
            }
        ]
    },
    {
        "label": "Power - Electrification",
        "value": 2,
        "children": []
    },
    {
        "label": "Transportation",
        "value": 3,
        "children": [
            {
                "label": "Roads and Bridges",
                "value": 31
            },
            {
                "label": "Water Transportation",
                "value": 32
            },
            {
                "label": "Air Transportation",
                "value": 33
            },
            {
                "label": "Rail Transportation",
                "value": 34
            },
            {
                "label": "Urban Transportation",
                "value": 35
            }
        ]
    },
    {
        "label": "Water Resources",
        "value": 4,
        "children": [
            {
                "label": "Irrigation",
                "value": 41
            },
            {
                "label": "Water Supply",
                "value": 42
            },
            {
                "label": "Flood Management",
                "value": 43
            },
            {
                "label": "Sanitation/Sewerage/Septage",
                "value": 44
            }
        ]
    },
    {
        "label": "Information and Communications Technology",
        "value": 5,
        "children": []
    },
    {
        "label": "Others",
        "value": 6,
        "children": [
            {
                "label": "Reclamation",
                "value": 61
            },
            {
                "label": "Government Building",
                "value": 62
            },
            {
                "label": "Multipurpose Facilities",
                "value": 63
            },
            {
                "label": "Others",
                "value": 64
            }
        ]
    }
]
};

const mutations = {

};

const actions = {
  
};

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
