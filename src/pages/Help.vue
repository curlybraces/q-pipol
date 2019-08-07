<template>
  <q-page padding>
    <p>Help</p>

    <q-tree
      :nodes="treeData"
      node-key="label"
      accordion
      default-expand-all></q-tree>

  </q-page>
</template>

<script>
export default {
  name: "PageHelp",
  data() {
    return {
      treeData: [
        {
          label: "General Information",
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
              label: ""
            }
          ]
        },
        {
          label: "Project Cost",
          children: [
            {
              label: ""
            }
          ]
        },
        {
          label: "Infrastructure Cost",
          children: [
            {
              label: ""
            }
          ]
        },
        {
          label: "Physical Accomplishments",
          children: [
            {
              label: ""
            }
          ]
        },
        {
          label: "Financial Accomplishments",
          children: [
            {
              label: ""
            }
          ]
        },
      ]
    }
  }
};
</script>

<style></style>
