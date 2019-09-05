<template>
  <q-form ref="form" @submit="submitProject" autofocus>
    <q-list separator :dark="dark">
      <q-item-label header class="text-uppercase"
        >General Information</q-item-label
      >

      <form-element label="Proposal/Project Name">
        <input-component
          label="Proposal/Project Name"
          hint="Project title must match title in budget proposal"
          v-model="project.title"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Implementing Department/Agency">
        <select-component
          label="Implementing Department/Agency"
          :options="operatingUnits"
          v-model="project.implementingAgency"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="Main Funding Source">
        <select-component
          label="Main Funding Source"
          v-model="project.mainFundingSource"
          hint="Choose the major type of funding source for the PAP."
          :options="fundingSources"
          :rules="rules.required"
        ></select-component>
        <p v-if="project.mainFundingSource == 'NG-Local'">PREXC Activity</p>
        <input-component
          v-if="project.mainFundingSource == 'NG-Local'"
          label="PREXC Activity"
          v-model="project.prexcActivity"
        ></input-component>
      </form-element>

      <form-element label="Mode of Implementation">
        <select-component
          label="Mode of Implementation"
          v-model="project.implementationMode"
          :options="implementationModes"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="Priority Ranking No.">
        <input-component
          type="number"
          label="Priority Ranking No."
          v-model="project.priorityRanking"
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase">Categorization</q-item-label>

      <form-element label="Status">
        <p class="lt-md">
          Status
        </p>
        <options-component
          label="Status"
          v-model="project.status"
          :options="statuses"
        ></options-component>
      </form-element>

      <form-element label="Infrastructure">
        <options-component
          inline
          label="Infrastructure"
          v-model="project.infrastructure"
          :options="[
            { value: 'Infrastructure', label: 'Infrastructure' },
            { value: 'Non-Infrastructure', label: 'Non-Infrastructure' },
            { value: 'Mixed', label: 'Mixed' }
          ]"
        ></options-component>
      </form-element>

      <form-element label="Typology">
        <p class="lt-md">
          Typology
        </p>
        <options-component
          label="Typology"
          v-model="project.typology"
          :options="typologies"
        ></options-component>
      </form-element>

      <form-element label="Spatial Coverage">
        <select-component
          label="Spatial Coverage"
          :options="spatialCoverages"
          v-model="project.spatialCoverage"
          hint="Choose where your project will be implemented."
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="Regions"
        v-if="project.spatialCoverage == 2 || project.spatialCoverage == 3"
      >
        <select-component
          v-if="project.spatialCoverage == 2"
          label="Regions"
          :options="regions"
          :multiple="true"
          hint="Select the regions where the project will be implemented."
          v-model="project.regions"
          :rules="rules.required"
        ></select-component>

        <select-component
          v-else-if="project.spatialCoverage == 3"
          label="Region"
          :options="regions"
          v-model="project.regions"
          hint="Select the region where the project will be implemented."
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="Total Project Cost (in PhP)">
        <input-component
          type="number"
          label="Total Project Cost (in PhP)"
          hint="Total cost of the project in absolute terms"
          v-model="project.totalProjectCost"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Bases for Implementation">
        <p class="lt-md">
          Bases for Implementation
        </p>
        <options-component
          label="Bases for Implementation"
          type="checkbox"
          v-model="project.implementationBases"
          :options="implementationBases"
        ></options-component>
      </form-element>

      <form-element label="RDIP Inclusion">
        <p class="lt-md">
          RDIP Inclusion
        </p>
        <options-component
          inline
          v-model="project.rdipInclusion"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="PCIP Inclusion">
        <p class="lt-md">
          PCIP Inclusion
        </p>
        <options-component
          inline
          v-model="project.pcipInclusion"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Status of ICC/NEDA Board Processing">
        <select-component
          label="Status of ICC/NEDA Board Processing"
          v-model="project.nedaProcessing"
          :options="nedaProcessing"
        >
        </select-component>
        <input-component
          class="q-mt-md"
          type="date"
          v-model="project.dateNedaProcessing"
        ></input-component>
      </form-element>

      <form-element label="Description">
        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="project.description"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Components">
        <q-select
          label="Add component"
          outlined
          dense
          v-model="project.components"
          hint="Press enter once you are done typing component to add item."
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          @new-value="addComponent"
        />
      </form-element>

      <form-element label="Purpose">
        <input-component
          type="textarea"
          label="Purpose"
          v-model="project.purpose"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Challenges being addressed">
        <options-component
          type="checkbox"
          label="Challenges being addressed"
          v-model="project.challenges"
          :options="challenges"
          :rules="rules.required"
        ></options-component>
      </form-element>

      <form-element label="Expected Outputs">
        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
          v-model="project.expectedOutputs"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Beneficiaries">
        <input-component
          type="textarea"
          label="Beneficiaries"
          v-model="project.beneficiaries"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Estimated number of persons to be employed">
        <input-component
          label="Estimated number of persons to be employed"
          v-model="project.employmentGeneration"
          type="number"
        ></input-component>
      </form-element>

      <form-element label="Implementation Period">
        <select-component
          outlined
          dense
          label="Implementation Start"
          hint="Target year of start of implementation"
          :options="implementationPeriods"
          v-model="project.implementationStart"
          @input="updateImplementationEnd"
          :rules="rules.required"
        />
        <select-component
          outlined
          dense
          label="Implementation End"
          hint="Target year of project completion"
          :options="filteredImplementationPeriods"
          v-model="project.implementationEnd"
          :readonly="!project.implementationStart"
          :rules="rules.required"
        />
      </form-element>

      <form-element label="Update on physical accomplishments">
        <input-component
          label="Update on physical accomplishments"
          type="textarea"
          v-model="project.updates"
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase"
        >Implementation Readiness</q-item-label
      >

      <q-item-label header class="text-uppercase">Prerequisites</q-item-label>

      <form-element label="NEDA Board">
        <options-component
          inline
          label="NEDA Board"
          v-model="project.nedaBoard"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="NEDA Board-ICC">
        <options-component
          inline
          label="NEDA Board-ICC"
          v-model="project.nedaBoardIcc"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH Certification">
        <options-component
          inline
          label="DPWH Certification"
          v-model="project.dpwhCertification"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH MOA">
        <options-component
          inline
          label="DPWH MOA"
          v-model="project.dpwhMoa"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH Costing">
        <options-component
          inline
          label="DPWH Costing"
          v-model="project.dpwhCosting"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DENR Clearance">
        <options-component
          inline
          label="DENR Clearance"
          v-model="project.denrClearance"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="RDC Consultation">
        <options-component
          inline
          label="RDC Consultation"
          v-model="project.rdcConsultation"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="CSO Consultation">
        <options-component
          inline
          label="CSO Consultation"
          v-model="project.csoConsultation"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="List of Locations">
        <options-component
          inline
          label="List of Locations"
          v-model="project.listLocations"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="List of Beneficiaries">
        <options-component
          inline
          label="List of Beneficiaries"
          v-model="project.listBeneficiaries"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element
        label="Evaluated and endorsed by DA Clearinghouse Committee"
      >
        <options-component
          inline
          label="Evaluated and endorsed by DA Clearinghouse Committee"
          v-model="project.daClearingHouse"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <q-item-label header class="text-uppercase"
        >Technical Readiness</q-item-label
      >

      <form-element label="Concept Note">
        <options-component
          inline
          label="Concept Note"
          v-model="project.conceptNote"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Feasibility Study">
        <options-component
          inline
          label="Feasibility Study"
          v-model="project.feasibilityStudy"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Detailed Engineering Design">
        <options-component
          inline
          label="Detailed Engineering Design"
          v-model="project.detailedEngineeringDesign"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Business Plan">
        <options-component
          inline
          label="Business Plan"
          v-model="project.businessPlan"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Right of Way">
        <options-component
          inline
          label="Right of Way"
          v-model="project.rightOfWay"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Resettlement Plan">
        <options-component
          inline
          label="Resettlement Plan"
          v-model="project.resettlementPlan"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Others">
        <options-component
          inline
          label="Others"
          v-model="project.otherTechnicalReadiness"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Implementation Risks">
        <input-component
          label="Implementation Risks"
          type="textarea"
          v-model="project.implementationRisks"
        ></input-component>
      </form-element>

      <form-element label="Mitigation Strategies">
        <input-component
          label="Mitigation Strategies"
          type="textarea"
          v-model="project.mitigationStrategies"
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase"
        >Strategic Alignment</q-item-label
      >

      <form-element
        label="New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)"
      >
        <p class="lt-md">
          New Thinking in Agriculture
        </p>
        <options-component
          type="checkbox"
          :options="newThinkings"
          v-model="project.newThinkings"
        ></options-component>
      </form-element>

      <form-element label="Philippine Development Plan">
        <p class="lt-md">
          Philippine Development Plan
        </p>
        <q-tree
          :nodes="pdpChapters"
          node-key="value"
          tick-strategy="strict"
          label-key="label"
          :ticked.sync="project.pdp"
          :dark="dark"
        />
      </form-element>

      <form-element label="Sustainable Development Goals">
        <p class="lt-md">
          Sustainable Development Goals
        </p>
        <options-component
          type="checkbox"
          :options="sustainableDevelopmentGoals"
          v-model="project.sustainableDevelopmentGoals"
        ></options-component>
      </form-element>

      <form-element label="0 + 10 Socioeconomic Agenda">
        <p class="lt-md">
          0+10 Socioeconomic Agenda
        </p>
        <options-component
          type="checkbox"
          :options="tenPointAgenda"
          v-model="project.tenPointAgenda"
        ></options-component>
      </form-element>

      <form-element label="Level of GAD Responsiveness">
        <p class="lt-md">
          Level of GAD Responsiveness
        </p>
        <options-component
          :options="gadResponsiveness"
          v-model="project.gadResponsiveness"
        ></options-component>
      </form-element>

      <form-element label="Infrastructure Sector">
        <p class="lt-md">
          Infrastructure Sector
        </p>
        <q-tree
          :nodes="infrastructureSectors"
          node-key="value"
          tick-strategy="leaf"
          label-key="label"
          :ticked.sync="project.infrastructureSectors"
          :dark="dark"
          default-expand-all
        >
        </q-tree>
      </form-element>

      <q-item-label header>
        FINANCIAL AND ECONOMIC BENEFITS
      </q-item-label>

      <form-element label="Estimated Project Life (in years)">
        <input-component
          label="Estimated Project Life (in years)"
          type="number"
          v-model="project.projectLife"
        >
        </input-component>
      </form-element>

      <form-element label="Benefit-Cost Ratio">
        <input-component
          label="Benefit-Cost Ratio"
          type="number"
          v-model="project.bcr"
        >
        </input-component>
      </form-element>

      <form-element label="Internal Rate of Return (in %)">
        <input-component
          label="Internal Rate of Return (in %)"
          type="number"
          v-model="project.irr"
        >
        </input-component>
      </form-element>

      <form-element label="Return on Investment (in %)">
        <input-component
          label="Return on Investment (in %)"
          type="number"
          v-model="project.roi"
        >
        </input-component>
      </form-element>

      <q-item-label header>PROJECT COSTING</q-item-label>

      <form-element
        label="ODA Funding Institution"
        v-if="project.mainFundingSource == 2 || project.mainFundingSource == 3"
      >
        <select-component
          label="ODA Funding Institution"
          v-if="
            project.mainFundingSource == 2 || project.mainFundingSource == 3
          "
          v-model="project.mainFundingInstitution"
          :options="fundingInstitutions"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="Other Funding Institution"
        v-if="project.mainFundingSource == 99"
      >
        <input-component
          label="Other Funding Institution"
          v-if="project.mainFundingSource == 99"
          v-model="project.otherFundingInstitution"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element
        label="Other Funding Institution"
        v-if="project.categorization == 2"
      >
        <select-component
          v-if="project.categorization == 2"
          label="Project Preparation Document"
          v-model="project.preparationDocument"
          :options="preparationDocuments"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="PAP UACS Code"
        v-if="project.categorization == 1 || project.categorization == 3"
      >
        <input-component
          v-if="project.categorization == 1 || project.categorization == 3"
          label="PAP UACS Code"
          v-model="project.uacsCode"
          hint="UACS code is optional for new PAPs."
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Costing by Fund Source">
        <p class="lt-md">
          Costing by Funding Source
        </p>
        <template v-if="project.fundingSourceBreakdown">
          <div
            class="row"
            v-for="(fs, index) in project.fundingSourceBreakdown"
            :key="index"
          >
            <costing-component
              :fs="fs"
              :key="index"
              :implementationStart="project.implementationStart"
              :implementationEnd="project.implementationEnd"
              @delete="deleteFundingSource(index)"
            >
            </costing-component>
          </div>
        </template>

        <div class="row q-col-gutter-sm q-pa-md">
          <select-component
            class="col-12 col-md"
            :options="fundingSources"
            v-model="fundingSource"
          ></select-component>
          <input-component
            label="2016 &amp; Prior"
            class="col-12 col-md"
            type="number"
            v-if="project.implementationStart < 2017"
            v-model="investment2016"
          ></input-component>
          <input-component
            label="2017"
            class="col-12 col-md"
            type="number"
            v-model="investment2017"
          ></input-component>
          <input-component
            label="2018"
            class="col-12 col-md"
            type="number"
            v-model="investment2018"
          ></input-component>
          <input-component
            label="2019"
            class="col-12 col-md"
            type="number"
            v-model="investment2019"
          ></input-component>
          <input-component
            label="2020"
            class="col-12 col-md"
            type="number"
            v-model="investment2020"
          ></input-component>
          <input-component
            label="2021"
            class="col-12 col-md"
            type="number"
            v-model="investment2021"
          ></input-component>
          <input-component
            label="2022"
            class="col-12 col-md"
            type="number"
            v-model="investment2022"
          ></input-component>
          <input-component
            label="2023 &amp; Beyond"
            class="col-12 col-md"
            type="number"
            v-if="project.implementationEnd > 2022"
            v-model="investment2023"
          ></input-component>
          <input-component
            label="Total"
            class="col-12 col-md"
            type="number"
            :readonly="true"
            :value="investmentTotal"
          ></input-component>
          <q-btn
            flat
            dense
            round
            color="green"
            icon="add_box"
            @click="addFundingSource()"
          />
        </div>
      </form-element>

      <form-element v-if="project.components" label="Costing by Component">
        <p class="lt-md">
          Costing by Component
        </p>
        <template v-if="project.components.length">
          <div
            class="row q-pa-md q-col-gutter-sm"
            v-for="(comp, index) in project.componentBreakdown"
            :key="index"
          >
            <select-component
              class="col-12 col-md"
              :options="project.components"
              v-model="comp.component"
            ></select-component>
            <input-component
              label="2016 &amp; Prior"
              class="col-12 col-md"
              type="number"
              v-if="project.implementationStart < 2017"
              v-model="comp.investment2016"
            ></input-component>
            <input-component
              label="2017"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2017"
            ></input-component>
            <input-component
              label="2018"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2018"
            ></input-component>
            <input-component
              label="2019"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2019"
            ></input-component>
            <input-component
              label="2020"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2020"
            ></input-component>
            <input-component
              label="2021"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2021"
            ></input-component>
            <input-component
              label="2022"
              class="col-12 col-md"
              type="number"
              v-model="comp.investment2022"
            ></input-component>
            <input-component
              label="2023 &amp; Beyond"
              class="col-12 col-md"
              type="number"
              v-if="project.implementationEnd > 2022"
              v-model="comp.investment2023"
            ></input-component>
            <input-component
              label="Total"
              class="col-12 col-md"
              type="number"
              :readonly="true"
              :value="comp.investmentTotal"
            ></input-component>
          </div>
        </template>
        <template v-else>
          <p class="text-red">
            <q-icon name="error" />
            No components added.
          </p>
        </template>
      </form-element>

      <div class="text-center q-py-md">
        <button-component
          icon="save"
          type="submit"
          label="Save"
        ></button-component>
      </div>
    </q-list>
  </q-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ButtonComponent from "./UI/ButtonComponent";
import InputComponent from "./FormInputs/InputComponent";
import SelectComponent from "./FormInputs/SelectComponent";
import OptionsComponent from "./FormInputs/OptionsComponent";
import FormElement from "./FormInputs/FormElement";
import CostingComponent from "./CostingComponent";

export default {
  components: {
    SelectComponent,
    FormElement,
    ButtonComponent,
    InputComponent,
    OptionsComponent,
    CostingComponent
  },
  name: "AddEditProject",
  props: {
    project: Object
  },
  data() {
    return {
      filteredImplementationPeriods: [],
      showHelp: false,
      showAddFundSource: true,
      yesNoNotApplicable: [
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        },
        {
          label: "Not Applicable",
          value: null
        }
      ],
      loading: false,
      rules: {
        // required: [v => !!v || "This field is required."],
        // select: [v => v.length > 0 || "This field is required"]
        required: [],
        select: []
      },
      fundingSourceBreakdown: [],
      fundingSource: null,
      investment2016: 0,
      investment2017: 0,
      investment2018: 0,
      investment2019: 0,
      investment2020: 0,
      investment2021: 0,
      investment2022: 0,
      investment2023: 0
    };
  },
  computed: {
    ...mapState("categorizations", ["categorizations"]),
    ...mapState("challenges", ["challenges"]),
    ...mapState("funding_institutions", ["fundingInstitutions"]),
    ...mapState("funding_sources", ["fundingSources"]),
    ...mapState("gad_responsiveness", ["gadResponsiveness"]),
    ...mapState("implementation_bases", ["implementationBases"]),
    ...mapState("implementation_modes", ["implementationModes"]),
    ...mapState("implementation_periods", ["implementationPeriods"]),
    ...mapState("infrastructure_sectors", ["infrastructureSectors"]),
    ...mapState("neda_processing", ["nedaProcessing"]),
    ...mapState("operating_units", ["operatingUnits"]),
    ...mapState("preparation_documents", ["preparationDocuments"]),
    ...mapState("spatial_coverages", ["spatialCoverages"]),
    ...mapState("regions", ["regions"]),
    ...mapState("preparation_documents", ["preparationDocuments"]),
    ...mapState("prerequisites", ["prerequisites"]),
    ...mapState("new_thinkings", ["newThinkings"]),
    ...mapState("pdp_chapters", ["pdpChapters"]),
    ...mapState("sustainable_development_goals", [
      "sustainableDevelopmentGoals"
    ]),
    ...mapState("ten_point_agenda", ["tenPointAgenda"]),
    ...mapState("settings", ["dark"]),
    ...mapState("statuses", ["statuses"]),
    ...mapState("typologies", ["typologies"]),
    investmentTotal: {
      get() {
        var y1 = parseFloat(this.investment2016) || 0;
        var y2 = parseFloat(this.investment2017) || 0;
        var y3 = parseFloat(this.investment2018) || 0;
        var y4 = parseFloat(this.investment2019) || 0;
        var y5 = parseFloat(this.investment2020) || 0;
        var y6 = parseFloat(this.investment2021) || 0;
        var y7 = parseFloat(this.investment2022) || 0;
        var y8 = parseFloat(this.investment2023) || 0;
        return y1 + y2 + y3 + y4 + y5 + y6 + y7 + y8;
      }
    }
  },
  methods: {
    ...mapActions("projects", ["addProject", "loadProject", "updateProject"]),
    submitProject() {
      if (!this.project.id) {
        this.addProject(this.project);
      } else {
        this.updateProject(this.project);
        this.$emit("close");
      }
    },
    addComponent(val, done) {
      done(val, "add-unique");
      this.project.componentBreakdown.push({
        component: val
      });
    },
    addFundingSource() {
      this.project.fundingSourceBreakdown.push({
        fundingSource: this.fundingSource,
        investment2016: this.investment2016,
        investment2017: this.investment2017,
        investment2018: this.investment2018,
        investment2019: this.investment2019,
        investment2020: this.investment2020,
        investment2021: this.investment2021,
        investment2022: this.investment2022,
        investment2023: this.investment2023,
        investmentTotal: this.investmentTotal
      });
      this.fundingSource = null;
      this.investment2016 = 0;
      this.investment2017 = 0;
      this.investment2018 = 0;
      this.investment2019 = 0;
      this.investment2020 = 0;
      this.investment2021 = 0;
      this.investment2022 = 0;
      this.investment2023 = 0;
    },
    deleteFundingSource(index) {
      this.project.fundingSourceBreakdown.splice(index, 1);
    },
    updateImplementationEnd(evt) {
      let filteredImplementationPeriods = [];
      var start = parseInt(evt);
      filteredImplementationPeriods = this.implementationPeriods.filter(
        period => {
          return parseInt(period.value) >= start;
        }
      );
      this.filteredImplementationPeriods = filteredImplementationPeriods;
    }
  }
};
</script>
