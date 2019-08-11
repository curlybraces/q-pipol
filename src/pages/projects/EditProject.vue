<template>
  <q-page padding>
    <div class="row">
      <p>Edit Project</p>
      <q-space />
      <div>
        {{ locked ? "Project is locked from editing." : "" }}
        <q-btn
          flat
          round
          dense
          :icon="locked ? 'lock' : 'lock_open'"
          @click="locked = !locked"
        />
      </div>
    </div>

    <q-separator />

    <q-stepper v-model="step" header-nav color="primary" ref="stepper" animated>
      <q-step :name="1" :done="done1" title="General Information">
        <general-information></general-information>
      </q-step>

      <q-step :name="2" title="Strategic Alignment">
        <programming-document></programming-document>
      </q-step>

      <q-step
        :name="3"
        title="Readiness"
        :disable="project.categorization !== 2"
      >
        <project-preparation></project-preparation>

        <preconstruction-cost></preconstruction-cost>
      </q-step>

      <q-step :name="4" title="Project Cost">
        <total-cost></total-cost>
      </q-step>

      <q-step
        :name="5"
        title="Accomplishments"
        :disable="project.categorization == 2"
      >
        <physical-accomplishments></physical-accomplishments>
      </q-step>

      <q-step :name="6" title="Submit"> </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 6 ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GeneralInformation from "../../components/EditProject/GeneralInformation.vue";
import ProgrammingDocument from "../../components/EditProject/ProgrammingDocument";
import PreconstructionCost from "../../components/EditProject/PreconstructionCost";
import PhysicalAccomplishments from "../../components/EditProject/PhysicalAccomplishments";
import ProjectPreparation from "../../components/EditProject/ProjectPreparation";
import TotalCost from "../../components/EditProject/TotalCost";

export default {
  components: {
    TotalCost,
    ProjectPreparation,
    PhysicalAccomplishments,
    PreconstructionCost,
    ProgrammingDocument,
    GeneralInformation
  },
  name: "PageEditProject",
  data() {
    return {
      tab: "edit",
      locked: true,
      step: 1
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
    },
    submitForm() {
      console.log(this.project);
    }
  },
  mounted() {
    // this.loadProject({ id: this.$route.params.id });
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
