<template>
  <q-page padding>
    <p>View Project</p>

    <q-list bordered separator class="rounded-borders">
      <q-item-label header class="bg-primary text-white"
        >General Information</q-item-label
      >

      <list-item
        label="Title"
        :value="project.title"
        @click="editTitle"
        :disabled="true"
      />

      <list-item
        label="Type"
        :value="papType" />

      <list-item
        label="Implementation Bases"
        :value="project.implementation_bases"
        @click="updateImplementationBases = true"
      />

      <list-item
        label="Description"
        :value="project.description"
        @click="updateDescription = true"/>

      <list-item
        label="Expected Outputs"
        :value="project.expected_outputs"
        @click="updateExpectedOutputs = true" />

      <list-item
        label="Implementation Period"
        :value="implementation_period"
        @click="updateImplementationPeriod = true"/>

      <list-item
        label="Spatial Coverage"
        :value="spatialCoverage"
        @click="updateSpatialCoverage = true" />

      <list-item
        label="Categorization"
        :value="categorization"
        @click="updateCategorization = true" />

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Strategic Alignment</q-item-label
      >

      <list-item
        label="New Thinking"
        :value="project.new_thinking"
        @click="updateNewThinking = true"/>

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Financial Information</q-item-label
      >

      <list-item
        label="Funding Source"
        :value="project_funder" @click="updateFinancialInformation = true"/>

      <list-item
        label="Implementation Mode"
        :value="project.implementation_mode.name"
        @click="updateFinancialInformation = true"
      />

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="airplanemode_active" color="primary"/>
          </q-item-section>
          <q-item-section>
            Infrastructure Cost
          </q-item-section>
        </template>
        <infrastructure-cost/>
      </q-expansion-item>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="map" color="primary"/>
          </q-item-section>
          <q-item-section>
            Investment Target by Region
          </q-item-section>
        </template>
        <regional-breakdown/>
      </q-expansion-item>


    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Physical &amp; Financial Status</q-item-label
      >
      <list-item
        label="Updates"
        :value="project_updates"
        @click="updateUpdates = true" />

      <list-item
        label="Financial Accomplishments"
        @click="updateFinancialAccomplishments = true"/>

    </q-list>

    <q-dialog v-model="updateImplementationBases">
      <update-implementation-bases-dialog @close="updateImplementationBases = false" />
    </q-dialog>

    <q-dialog v-model="updateImplementationPeriod">
      <update-implementation-period-dialog @close="updateImplementationPeriod = false"/>
    </q-dialog>

    <q-dialog v-model="updateFinancialAccomplishments">
      <financial-accomplishment @close="updateFinancialAccomplishments = false"/>
    </q-dialog>

    <q-dialog v-model="updateInfrastructureSector">
      <infrastructure-sector @close="updateInfrastructureSector = false"/>
    </q-dialog>

    <q-dialog v-model="updateNewThinking">
      <new-thinking @close="updateNewThinking = false" />
    </q-dialog>

    <q-dialog v-model="updateFinancialInformation">
      <funding-source @close="updateFinancialInformation = false" />
    </q-dialog>

    <q-dialog v-model="updateDescription">
      <edit-description @close="updateDescription = false" />
    </q-dialog>

    <q-dialog v-model="updateExpectedOutputs">
      <edit-output @close="updateExpectedOutputs = false" />
    </q-dialog>

    <q-dialog v-model="updateSpatialCoverage">
      <spatial-coverage @close="updateSpatialCoverage = false" />
    </q-dialog>

    <q-dialog v-model="updatePapType">
      <pap-type @close="updatePapType = false" />
    </q-dialog>

    <q-dialog v-model="updateCategorization">
      <edit-categorization @close="updateCategorization = false" />
    </q-dialog>

  </q-page>
</template>

<script>
// import { Notify } from "quasar";
import { mapState, mapActions } from "vuex";
import ListItem from "../../components/ViewProject/ListItem";
import UpdateImplementationBasesDialog from "../../components/ViewProject/UpdateImplementationBasesDialog";
import UpdateImplementationPeriodDialog from "../../components/ViewProject/UpdateImplementationPeriodDialog";
import FinancialAccomplishment from "../../components/ViewProject/FinancialAccomplishment";
import InfrastructureSector from "../../components/ViewProject/InfrastructureSector";
import NewThinking from "../../components/ViewProject/NewThinking";
import FundingSource from "../../components/ViewProject/FundingSource";
import EditDescription from "../../components/ViewProject/EditDescription";
import EditOutput from "../../components/ViewProject/EditOutput";
import SpatialCoverage from "../../components/ViewProject/SpatialCoverage";
import PapType from "../../components/ViewProject/PapType";
import EditCategorization from "../../components/ViewProject/EditCategorization";
import RegionalBreakdown from "../../components/ViewProject/RegionalBreakdown";
import InfrastructureCost from "../../components/ViewProject/InfrastructureCost";

export default {
  components: {
    ListItem,
    UpdateImplementationBasesDialog,
    UpdateImplementationPeriodDialog,
    FinancialAccomplishment,
    InfrastructureSector,
    NewThinking,
    FundingSource,
    EditDescription,
    EditOutput,
    SpatialCoverage,
    PapType,
    EditCategorization,
    RegionalBreakdown,
    InfrastructureCost
  },
  name: "PageViewProject",
  data() {
    return {
      updateImplementationBases: false,
      updateImplementationPeriod: false,
      updateInfrastructureSector: false,
      updateFinancialInformation: false,
      updateDescription: false,
      updateExpectedOutputs: false,
      updateSpatialCoverage: false,
      updateCategorization: false,
      updateFinancialAccomplishments: false,
      updatePapType: false,
      updateNewThinking: false
    };
  },
  computed: {
    ...mapState("projects",["project"]),
    project_id() {
      return this.$route.params.id;
    },
    papType: {
      get() {
        return this.project.pap_type.name;
      }
    },
    implementation_period() {
      return (
        this.project.implementation_start +
        " - " +
        this.project.implementation_end
      );
    },
    project_funder() {
      return (
        this.project.funding_source.name +
        " > " +
        this.project.funding_institution
      );
    },
    spatialCoverage() {
      return this.project.spatial_coverage.name;
    },
    categorization() {
      return this.project.categorization.name;
    },
    infrastructureCost() {
      return null;
    },
    totalCost() {
      return "PhP " + Number(this.project.total_cost).toLocaleString();
    },
    project_updates() {
      if (this.project.updates) {
        return this.project.updates + " (as of " + this.project.as_of + " )";
      } else {
        return "No updates yet.";
      }
    }
  },
  methods: {
    ...mapActions("projects",["loadProject"]),
    editTitle() {
      console.log("edit title");
      this.$q.notify({
        message: "I got clicked!",
        position: "top"
      });
    }
  },
  mounted() {
    this.loadProject({ id: this.project_id });
  }
};
</script>
