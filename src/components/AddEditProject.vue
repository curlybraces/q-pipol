<template>
  <q-form ref="form" @submit="addProject(project)" autofocus>
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
      </form-element>

      <form-element label="Priority Ranking No.">
        <input-component
          type="number"
          label="Priority Ranking No."
          v-model="project.priorityRanking"
        ></input-component>
      </form-element>

      <form-element label="Categorization">
        <p class="lt-md">
          Categorization
        </p>
        <options-component
          label="Categorization"
          v-model="project.categorization"
          :options="categorizations"
        ></options-component>
      </form-element>

      <form-element label="Infrastructure">
        <options-component
          inline
          label="Infrastructure"
          v-model="project.infrastructure"
          :options="[
            { value: false, label: 'Non-Infrastructure' },
            { value: true, label: 'Infrastructure' }
          ]"
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

      <form-element label="Description">
        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="project.description"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Purpose">
        <input-component
          type="textarea"
          label="Purpose"
          v-model="project.purpose"
          :rules="rules.required"
        ></input-component>
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

      <q-item-label header>Project Costing</q-item-label>

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
          v-if="project.mfs == 99"
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

      <div class="text-center">
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

export default {
  components: {
    SelectComponent,
    FormElement,
    ButtonComponent,
    InputComponent,
    OptionsComponent
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
      columns: [
        {
          name: "fundingSource",
          label: "Funding Source",
          field: "fundingSource"
        },
        {
          name: "y1",
          label: "2017",
          field: "y1"
        },
        {
          name: "y2",
          label: "2018",
          field: "y2"
        },
        {
          name: "y3",
          label: "2019",
          field: "y3"
        },
        {
          name: "y4",
          label: "2020",
          field: "y4"
        },
        {
          name: "y5",
          label: "2021",
          field: "y5"
        },
        {
          name: "y6",
          label: "2022",
          field: "y6"
        }
      ],
      loading: false,
      rules: {
        required: [v => !!v || "This field is required."],
        select: [v => v.length > 0 || "This field is required"]
      }
    };
  },
  computed: {
    ...mapState("categorizations", ["categorizations"]),
    ...mapState("funding_institutions", ["fundingInstitutions"]),
    ...mapState("funding_sources", ["fundingSources"]),
    ...mapState("implementation_bases", ["implementationBases"]),
    ...mapState("implementation_periods", ["implementationPeriods"]),
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
    ...mapState("settings", ["dark"])
  },
  methods: {
    ...mapActions("projects", ["addProject", "loadProject"]),
    addRow() {
      this.form.fsbd.push({
        fundingSource: "",
        y1: 0,
        y2: 0,
        y3: 0,
        y4: 0,
        y5: 0,
        y6: 0
      });
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
