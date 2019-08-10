<template>
  <q-page padding>
    <p>Help</p>

    <q-input
      outlined
      rounded
      dense
      class="q-ma-sm"
      v-model="filterSearch"
      append-icon="search"
      debounce="500">
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>

    <div class="q-pa-md">
      <div class="text-h6">Form Fields</div>
      <q-separator/>
      <q-tree
        :nodes="treeData"
        node-key="label"
        selected-color="primary"
        :selected.sync="selected"
        :default-expand-all="defaultExpandAll"
        @update:selected="getNode"
        :filter="filterSearch"
        >
        <template v-slot:default-body="prop">
          <div v-if="prop.node.description">
            <span class="text-weight-bold">Description</span>: {{ prop.node.description }}
          </div>
          <span v-else class="text-weight-light text-negative">No description added yet.</span>
        </template>
      </q-tree>
    </div>

  </q-page>
</template>

<script>
export default {
  name: "PageHelp",
  data() {
    return {
      filterSearch: "",
      defaultExpandAll: true,
      selected: "General Information",
      description: "",
      treeData: [
        {
          label: "General Information",
          description: "General information about the proposed/ongoing project",
          children: [
            {
              label: "Title",
              description: "The title of the program or project."
            },
            {
              label: "Program or Project",
              description: "Select whether program or project."
            },
            {
              label: "Basis for Implementation",
              description: "Select bases for the implementation (as many as applicable)."
            },
            {
              label: "Location",
              description: "Select where the project is or will be located.",
              children: [
                {
                  label: "Spatial Coverage",
                  description: "The spatial coverage of the program/project."
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
          description: "Select which programming document the program/project qualifies to.",
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
          label: "Infrastructure Profile (requires TRIP)",
          description: "This section appears only when the program/project is included in the TRIP.",
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
          description: "Shows how the program/project relates to strategic plans.",
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
          description: "The total cost of the program/project.",
          children: [
            {
              label: "Main Fund Source",
              description: "The main fund source for the program/project.",
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
    getNode(selected) {
      this.selectedObject = this.search(selected, this.treeData)
    },
    search (label, parent) {
      const stack = []
      let node, ii
      stack.push(parent)

      while (stack.length > 0) {
        node = stack.pop()
        if (node.label == label) {
          this.description = node.description // return whatever you want here!!!
        } else if (node.children && node.children.length) {
          for (ii = 0; ii < node.children.length; ii += 1) {
            stack.push(node.children[ii])
          }
        }
      }
      return null
    }
  }
};
</script>

<style></style>
