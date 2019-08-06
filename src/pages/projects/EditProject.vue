<template>
  <q-page padding>
    <div class="row">
      <p>Edit Project</p>
      <q-space />
      <q-btn
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <q-tabs
      v-model="tab"
      class="bg-primary text-grey-4"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
    >
      <q-tab name="edit" label="Edit Project" />
      <q-tab name="history" label="Project Logs" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="edit">
        <general-information :project="project"></general-information>

        <spatial-coverage></spatial-coverage>

        <programming-document></programming-document>

        <macroeconomic-indicators :project="project"></macroeconomic-indicators>

        <project-preparation></project-preparation>

        <preconstruction-cost></preconstruction-cost>

        <total-cost></total-cost>

        <infrastructure-cost></infrastructure-cost>

        <physical-accomplishments></physical-accomplishments>

        <financial-accomplishments></financial-accomplishments>
      </q-tab-panel>

      <q-tab-panel name="history">
        <project-history :backups="project.backups"></project-history>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GeneralInformation from "../../components/EditProject/GeneralInformation.vue";
import ProjectHistory from "../../components/EditProject/ProjectHistory";
import MacroeconomicIndicators from "../../components/EditProject/MacroeconomicIndicators";
import ProgrammingDocument from "../../components/EditProject/ProgrammingDocument";
import SpatialCoverage from "../../components/EditProject/SpatialCoverage";
import PreconstructionCost from "../../components/EditProject/PreconstructionCost";
import PhysicalAccomplishments from "../../components/EditProject/PhysicalAccomplishments";
import FinancialAccomplishments from "../../components/EditProject/FinancialAccomplishments";
import ProjectPreparation from "../../components/EditProject/ProjectPreparation";
import TotalCost from "../../components/EditProject/TotalCost";
import InfrastructureCost from "../../components/EditProject/InfrastructureCost";

export default {
  components: {
    InfrastructureCost,
    TotalCost,
    ProjectPreparation,
    FinancialAccomplishments,
    PhysicalAccomplishments,
    PreconstructionCost,
    SpatialCoverage,
    ProgrammingDocument,
    MacroeconomicIndicators,
    ProjectHistory,
    GeneralInformation
  },
  name: "PageEditProject",
  data() {
    return {
      tab: "edit"
    };
  },
  computed: {
    ...mapState("projects", ["project"])
  },
  methods: {
    ...mapActions("projects", ["loadProject"]),
    showPreviousVersion(id) {
      var backup = this.project.backups.filter(backup => backup.id == id);
      this.$q.dialog({
        message: JSON.stringify(backup)
      });
    }
  },
  mounted() {
    this.loadProject({ id: this.$route.params.id });
  }
};
</script>

<style lang="stylus">
.my-sticky-column-table
  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child
    background-color #344955
    opacity 1

  td:first-child
    background-color #344955

  thead tr:first-child th:first-child,
  td:first-child
    position sticky
    left 0
    z-index 1
    color: #FFF
</style>
