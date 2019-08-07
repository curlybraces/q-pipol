<template>
  <q-page padding>
    <p>Help</p>

    <q-splitter
      v-model="splitter"
      class="q-pa-xs"
      >

      <template v-slot:before>
        <q-input
          outlined
          rounded
          dense
          class="q-ma-sm"
          v-model="filterSearch"/>
        <q-scroll-area style="height: 600px">
          <q-tree
            :nodes="treeData"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected"
            :default-expand-all="defaultExpandAll"
            @update:selected="loadDesc"
            :filter="filterSearch"
            ></q-tree>
        </q-scroll-area>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <q-card flat>
            <div class="text-h4 q-mb-md">{{ (!selected) ? 'Nothing selected': selected }}</div>
            <q-separator/>
            <div>{{ selected }}</div>
          </q-card>
        </div>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
export default {
  name: "PageHelp",
  data() {
    return {
      filterSearch: "",
      defaultExpandAll: true,
      splitter: 30,
      selected: "General Information",
      treeData: [
        {
          label: "General Information",
          description: "General information about the proposed/ongoing project",
          children: [
            {
              label: "Title"
            },
            {
              label: "Program or Project"
            },
            {
              label: "Basis for Implementation"
            },
            {
              label: "Location",
              children: [
                {
                  label: "Spatial Coverage"
                },
                {
                  label: "Region"
                },
                {
                  label: "Province"
                },
                {
                  label: "City or Municipality"
                }
              ]
            },
            {
              label: "Description"
            },
            {
              label: "Expected Outputs"
            },
            {
              label: "Implementation Period",
              children: [
                {
                  label: "Implementation Start"
                },
                {
                  label: "Implementation End"
                }
              ]
            }
          ]
        },
        {
          label: "Inclusion in which Programming Document",
          children: [
            {
              label: "PIP"
            },
            {
              label: "CIP",
            },
            {
              label: "TRIP"
            },
            {
              label: "RDIP"
            }
          ]
        },
        {
          label: "Infrastructure Profile",
          children: [
            {
              label: "Infrastructure Sector",
              children: [
                {
                  label: "Infrastructure Subsector"
                }
              ]
            },
            {
              label: "Implementation Risks and Mitigation Strategies"
            },
            {
              label: "Employment Generation"
            }
          ]
        },
        {
          label: "Responsiveness to Strategic Plans",
          children: [
            {
              label: "0 + 10 Socioeconomic Agenda"
            },
            {
              label: "Sustainable Development Goals"
            },
            {
              label: "PDP Chapter"
            },
            {
              label: "PDP Outcome Indicators",
              children: [
                {
                  label: "PDP Output Indicators"
                }
              ]
            },
            {
              label: "Other PDP Chapter"
            }
          ]
        },
        {
          label: "Project Preparation Details",
          children: [
            {
              label: "Project Preparation Document",
              children: [
                {
                  label: "Others"
                },
                {
                  label: "Status of Feasibility Study",
                  children: [
                    {
                      label: "Will require NEDA assitance?"
                    },
                    {
                      label: "Target Start Date"
                    },
                    {
                      label: "Schedule of Feasibility Cost"
                    }
                  ]
                }
              ]
            },
            {
              label: "Level of Approval",
              children: [
                {
                  label: "Date of Approval"
                }
              ]
            }
          ]
        },
        {
          label: "Pre-Construction Costs",
          children: [
            {
              label: "ROWA Component",
              children: [
                {
                  label: "No. of affected households"
                },
                {
                  label: "ROWA Cost"
                }
              ]
            },
            {
              label: "Resettlement Component",
              children: [
                {
                  label: "No. of affected households"
                },
                {
                  label: "Resettlement Cost"
                }
              ]
            },
            {
              label: "ROWA and Resettlement Component"
            }
          ]
        },
        {
          label: "Project Cost",
          children: [
            {
              label: "Main Fund Source",
              children: [
                {
                  label: "ODA Funding Institutions",
                  children: [
                    {
                      label: "Others"
                    }
                  ]
                }
              ]
            },
            {
              label: "Mode of Implementation/Procurement"
            },
            {
              label: "Annual Cost",
              children: [
                {
                  label: "NG-Local"
                },
                {
                  label: "NG-ODA Loan"
                },
                {
                  label: "NG-ODA Grant"
                },
                {
                  label: "GOCCs/GFIs"
                },
                {
                  label: "LGUs"
                },
                {
                  label: "Private Sector"
                },
                {
                  label: "Other"
                }
              ]
            }
          ]
        },
        {
          label: "Infrastructure Cost",
          children: [
            {
              label: "NG-Local"
            },
            {
              label: "NG-ODA Loan"
            },
            {
              label: "NG-ODA Grant"
            },
            {
              label: "GOCCs/GFIs"
            },
            {
              label: "LGUs"
            },
            {
              label: "Private Sector"
            },
            {
              label: "Other"
            }
          ]
        },
        {
          label: "Physical Accomplishments",
          children: [
            {
              label: "Categorization"
            },
            {
              label: "UACS Code"
            },
            {
              label: "Updates"
            },
            {
              label: "As of"
            }
          ]
        },
        {
          label: "Financial Accomplishments",
          children: [
            {
              label: "NEP",
              children: [
                {
                  label: "2017"
                },
                {
                  label: "2018"
                },
                {
                  label: "2019"
                },
                {
                  label: "2020"
                },
                {
                  label: "2021"
                },
                {
                  label: "2022"
                },
              ]
            },
            {
              label: "GAA",
              children: [
                {
                  label: "2017"
                },
                {
                  label: "2018"
                },
                {
                  label: "2019"
                },
                {
                  label: "2020"
                },
                {
                  label: "2021"
                },
                {
                  label: "2022"
                },
              ]
            },
            {
              label: "Disbursements",
              children: [
                {
                  label: "2017"
                },
                {
                  label: "2018"
                },
                {
                  label: "2019"
                },
                {
                  label: "2020"
                },
                {
                  label: "2021"
                },
                {
                  label: "2022"
                },
              ]
            }
          ]
        },
      ]
    }
  },
  methods: {
    loadDesc(node) {
      console.log('cool',node);
    }
  }
};
</script>

<style></style>
