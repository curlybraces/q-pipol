<template>
  <q-page padding>
    <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
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
import AddEditProject from "../../components/AddEditProject";

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
        implementationStart: 0,
        implementationEnd: 0,
        totalProjectCost: 0,
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
