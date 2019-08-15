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
      <list-item label="Type" :value="papType" />
      <list-item
        label="Implementation Bases"
        :value="project.implementation_bases"
      />
      <list-item label="Description" :value="project.description" />
      <list-item label="Expected Outputs" :value="project.expected_outputs" />
      <list-item label="Implementation Period" :value="implementation_period" />
      <list-item label="Spatial Coverage" :value="spatialCoverage" />
      <list-item label="Categorization" :value="categorization" />
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Strategic Alignment</q-item-label
      >
      <list-item label="New Thinking" :value="project.new_thinking" />
      <list-item
        label="Implementation Mode"
        :value="project.implementation_mode.name"
      />
      <list-item label="Infrastructure Cost" :value="infrastructureCost" />
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Financial Information</q-item-label
      >
      <list-item label="Funding Source" :value="project_funder" />
      <list-item
        label="Implementation Mode"
        :value="project.implementation_mode.name"
      />
      <list-item label="Total Cost" :value="totalCost" />

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
      <list-item label="Updates" :value="project_updates" />
      <list-item label="Financial Accomplishments" />
    </q-list>

    <update-implementation-bases-dialog />

    <update-implementation-period-dialog />

    <financial-accomplishment />

    <infrastructure-sector />

    <new-thinking />

    <funding-source />

    <edit-description />

    <edit-output />

    <spatial-coverage />

    <pap-type/>

    <edit-categorization />

    <regional-breakdown />
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
    RegionalBreakdown
  },
  name: "PageViewProject",
  data() {
    return {
    };
  },
  computed: {
    ...mapState("projects",["project"]),
    project_id() {
      return this.$route.params.id;
    },
    papType() {
      return this.project.pap_type.name;
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
