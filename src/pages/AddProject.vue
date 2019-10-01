<template>
  <q-page>
    <q-card flat square :class="dark ? 'bg-grey-10' : 'bg-white'">
      <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
        <q-avatar icon="note_add" />
        <q-toolbar-title>Add Project</q-toolbar-title>
      </q-toolbar>
      <add-edit-project :project="project"></add-edit-project>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
const AddEditProject = () =>
  import(
    /* webpackChunkName: 'AddEditProject' */ "../components/AddEditProject"
  );

export default {
  components: {
    AddEditProject
  },
  name: "PageAddProject",
  data() {
    return {
      project: {
        addedBy: "",
        beneficiaries: "",
        businessPlan: false,
        categorization: "",
        conceptNote: false,
        csoConsultation: false,
        daClearingHouse: false,
        description: "",
        detailedEngineeringDesign: false,
        implementationBases: [],
        pdp: [],
        newThinkings: [],
        sustainableDevelopmentGoals: [],
        tenPointAgenda: [],
        priorityRanking: 0,
        pdpIndicators: [],
        implementationStart: null,
        implementationEnd: null,
        totalProjectCost: 0,
        nep2017: 0,
        nep2018: 0,
        nep2019: 0,
        nep2020: 0,
        nep2021: 0,
        nep2022: 0,
        nepTotal: 0,
        gaa2017: 0,
        gaa2018: 0,
        gaa2019: 0,
        gaa2020: 0,
        gaa2021: 0,
        gaa2022: 0,
        gaaTotal: 0,
        disbursement2017: 0,
        disbursement2018: 0,
        disbursement2019: 0,
        disbursement2020: 0,
        disbursement2021: 0,
        disbursement2022: 0,
        disbursementTotal: 0,
        fundingSourceBreakdown: [
          {
            fundingSource: "",
            investment2016: 0,
            investment2017: 0,
            investment2018: 0,
            investment2019: 0,
            investment2020: 0,
            investment2021: 0,
            investment2022: 0,
            investmentTotal: 0
          }
        ],
        infrastructureBreakdown: [
          {
            infrastructure: "",
            investment2016: 0,
            investment2017: 0,
            investment2018: 0,
            investment2019: 0,
            investment2020: 0,
            investment2021: 0,
            investment2022: 0,
            investmentTotal: 0
          }
        ],
        locationBreakdown: [
          {
            location: "",
            investment2016: 0,
            investment2017: 0,
            investment2018: 0,
            investment2019: 0,
            investment2020: 0,
            investment2021: 0,
            investment2022: 0,
            investmentTotal: 0
          }
        ],
        challenges: [],
        infrastructureSectors: [],
        components: [],
        componentBreakdown: [
          {
            component: "",
            investment2016: 0,
            investment2017: 0,
            investment2018: 0,
            investment2019: 0,
            investment2020: 0,
            investment2021: 0,
            investment2022: 0,
            investmentTotal: 0
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    ...mapActions("projects", ["addProject"])
  }
};
</script>
