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
        :value="papType"
        @click="updatePapType = true" />

      <q-dialog v-model="updatePapType">
        <pap-type @close="updatePapType = false" />
      </q-dialog>

      <list-item
        label="Implementation Bases"
        :value="project.implementation_bases"
        @click="updateImplementationBases = true"
      />

      <q-dialog v-model="updateImplementationBases">
        <update-implementation-bases-dialog
          @close="updateImplementationBases = false"
        />
      </q-dialog>

      <list-item
        label="Description"
        :value="project.description"
        @click="updateDescription = true"
      />

      <q-dialog v-model="updateDescription">
        <edit-description @close="updateDescription = false" />
      </q-dialog>

      <list-item
        label="Expected Outputs"
        :value="project.expected_outputs"
        @click="updateExpectedOutputs = true"
      />

      <q-dialog v-model="updateExpectedOutputs">
        <edit-output @close="updateExpectedOutputs = false" />
      </q-dialog>

      <list-item
        label="Implementation Period"
        :value="implementation_period"
        @click="updateImplementationPeriod = true"
      />

      <q-dialog v-model="updateImplementationPeriod">
        <update-implementation-period-dialog
          @close="updateImplementationPeriod = false"
        />
      </q-dialog>

      <list-item
        label="Spatial Coverage"
        :value="spatialCoverage"
        @click="updateSpatialCoverage = true"
      />

      <q-dialog v-model="updateSpatialCoverage">
        <spatial-coverage @close="updateSpatialCoverage = false" />
      </q-dialog>

      <list-item
        label="Categorization"
        :value="categorization"
        @click="updateCategorization = true"
      />

      <q-dialog v-model="updateCategorization">
        <edit-categorization @close="updateCategorization = false" />
      </q-dialog>

      <list-item
        label="Infrastructure Sector"
        :value="infrastructureSector"
        @click="updateInfrastructureSector = true"
      />

      <q-dialog v-model="updateInfrastructureSector">
        <infrastructure-sector @close="updateInfrastructureSector = false" />
      </q-dialog>

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white"
        >Strategic Alignment</q-item-label
      >

      <list-item
        label="New Thinking"
        :value="project.new_thinking"
        @click="updateNewThinking = true"
      />

      <q-dialog
        v-model="updateNewThinking">
        <new-thinking @close="updateNewThinking = false" />
      </q-dialog>

      <list-item
        label="PDP Indicators"
        @click="updatePdpIndicators = true" />

      <q-dialog v-model="updatePdpIndicators">
        <pdp-indicators @close="updatePdpIndicators = false" />
      </q-dialog>

      <list-item
        label="0+10 Socioeconomic Agenda"
        @click="updateTenAgenda = true"
      />

      <q-dialog v-model="updateTenAgenda">
        <update-ten-agenda @close="updateTenAgenda = false" />
      </q-dialog>

      <list-item
        label="Sustainable Development Goals"
        @click="updateSdgs = true"
      />

      <q-dialog v-model="updateSdgs">
        <update-sdgs @close="updateSdgs = false" />
      </q-dialog>

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">
        Implementation Readiness
        <q-item-label caption class="text-grey-5"></q-item-label>
      </q-item-label>

      <list-item
        label="Employment Generation"
        :value="project.employment_generation"
        caption="Jobs that will be employed during and for the project."
        @click="updateEmploymentGeneration = true"
      />

      <q-dialog v-model="updateEmploymentGeneration">
          <employment-generation @close="updateEmploymentGeneration = false"></employment-generation>
      </q-dialog>

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">
        Project Benefits
        <q-item-label caption class="text-grey-5">Benefits that can be derived from the project.</q-item-label>
      </q-item-label>

      <list-item
        label="Employment Generation"
        :value="project.employment_generation"
        caption="No. of persons that will be employed during the implementation of the project."
        @click="updateEmploymentGeneration = true"
      />

      <q-dialog v-model="updateEmploymentGeneration">
          <employment-generation @close="updateEmploymentGeneration = false"></employment-generation>
      </q-dialog>

      <list-item
        label="Expected Benefits"
        :value="project.expected_benefits"
        caption="List down the benefits that can be derived from the project."
        @click="updateExpectedBenefits = true"
      />

      <q-dialog v-model="updateExpectedBenefits">
          <expected-benefits @close="updateExpectedBenefits = false"></expected-benefits>
      </q-dialog>

      <list-item
        label="Returns on Investment"
        :value="project.expected_benefits"
        caption="ROI of the project"
        @click="updateReturnInvestment = true"
      />

      <q-dialog v-model="updateReturnInvestment">
        <return-investment @close="updateReturnInvestment = false"></return-investment>
      </q-dialog>

    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">
        Financial Information
      </q-item-label>

      <list-item
        label="Funding Source"
        :value="project_funder"
        @click="updateFinancialInformation = true"
      />

      <list-item
        label="Implementation Mode"
        :value="project.implementation_mode.name"
        @click="updateFinancialInformation = true"
      />

      <q-dialog v-model="updateFinancialInformation">
        <funding-source @close="updateFinancialInformation = false" />
      </q-dialog>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="money" color="primary" />
          </q-item-section>
          <q-item-section>
            Total Investment Cost
          </q-item-section>
        </template>
        <investment-cost />
      </q-expansion-item>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="airplanemode_active" color="primary" />
          </q-item-section>
          <q-item-section>
            Infrastructure Cost
          </q-item-section>
        </template>
        <infrastructure-cost />
      </q-expansion-item>

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="map" color="primary" />
          </q-item-section>
          <q-item-section>
            Investment Target by Region
          </q-item-section>
        </template>
        <regional-breakdown />
      </q-expansion-item>
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">
        Physical &amp; Financial Status
      </q-item-label>

      <list-item
        label="Updates"
        :value="project_updates"
        @click="updateUpdates = true"
        caption="Latest updates on the project."
      />

      <q-dialog v-model="updateUpdates">
        <editUpdates @close="updateUpdates = false" />
      </q-dialog>

      <list-item
        label="Financial Accomplishments"
        @click="updateFinancialAccomplishments = true"
        caption="Information on the financial accomplishments of the project including NEP, GAA, and disbursement status."
      />

      <q-dialog v-model="updateFinancialAccomplishments">
        <financial-accomplishment
          @close="updateFinancialAccomplishments = false"
        />
      </q-dialog>

    </q-list>

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
import EditUpdates from "../../components/ViewProject/EditUpdates";
import PdpIndicators from "../../components/ViewProject/PdpIndicators";
import UpdateSdgs from "../../components/ViewProject/UpdateSdgs";
import UpdateTenAgenda from "../../components/ViewProject/UpdateTenAgenda";
import EmploymentGeneration from "../../components/ViewProject/EmploymentGeneration";
import ExpectedBenefits from "../../components/ViewProject/ExpectedBenefits";
import ReturnInvestment from "../../components/ViewProject/ReturnInvestment";
import InvestmentCost from "../../components/ViewProject/InvestmentCost";

export default {
  components: {
    ReturnInvestment,
    ExpectedBenefits,
    EmploymentGeneration,
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
    InfrastructureCost,
    EditUpdates,
    PdpIndicators,
    UpdateSdgs,
    UpdateTenAgenda,
    InvestmentCost
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
      updateNewThinking: false,
      updateUpdates: false,
      updatePdpIndicators: false,
      updateSdgs: false,
      updateTenAgenda: false,
      updateEmploymentGeneration: false,
      updateExpectedBenefits: false,
      updateReturnInvestment: false,
      infrastructureSector: false
    };
  },
  computed: {
    ...mapState("projects", ["project"]),
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
    ...mapActions("projects", ["loadProject"]),
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
