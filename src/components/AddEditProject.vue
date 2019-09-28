<template>
  <q-form ref="form" @submit="submitProject" autofocus>
    <q-list separator :dark="dark">
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

      <q-item-label header class="text-uppercase"
        >General Information</q-item-label
      >

      <form-element label="Commodity/ies">
        <input-component
          label="Commodity/ies"
          v-model="project.commodities"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Program/Functional Classification">
        <input-component
          label="Program/Functional Classification"
          v-model="project.program"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="1. Proposal/Project Name">
        <input-component
          label="1. Proposal/Project Name"
          hint="Project title must match title in budget proposal"
          v-model="project.title"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="2. Implementing Department/Agency">
        <select-component
          label="2. Implementing Department/Agency"
          :options="operatingUnits"
          v-model="project.implementingAgency"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="3. Program or Project">
        <options-component
          label="3. Program or Project"
          :options="[
            {
              label: 'Program',
              value: 'Program'
            },
            {
              label: 'Project',
              value: 'Project'
            }
          ]"
          type="radio"
          v-model="project.classification"
          :rules="rules.required"
        ></options-component>
      </form-element>

      <form-element label="4. Main Funding Source">
        <select-component
          label="4. Main Funding Source"
          v-model="project.mainFundingSource"
          hint="Choose the major type of funding source for the PAP."
          :options="fundingSources"
          :rules="rules.required"
        ></select-component>
        <input-component
          v-if="project.mainFundingSource == 'NG-Local'"
          label="PREXC Activity"
          v-model="project.prexcActivity"
        ></input-component>
      </form-element>

      <form-element label="4a. Mode of Implementation">
        <select-component
          label="4a. Mode of Implementation"
          v-model="project.implementationMode"
          :options="implementationModes"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="5. Priority Ranking No.">
        <input-component
          type="number"
          label="5. Priority Ranking No."
          v-model="project.priorityRanking"
          disable
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase">Categorization</q-item-label>

      <form-element label="6a. Status">
        <options-component
          label="Status"
          v-model="project.status"
          :options="statuses"
        ></options-component>
      </form-element>

      <form-element label="6b. Infrastructure">
        <options-component
          inline
          v-model="project.infrastructure"
          :options="[
            { value: 'Infrastructure', label: 'Infrastructure' },
            { value: 'Non-Infrastructure', label: 'Non-Infrastructure' },
            { value: 'Mixed', label: 'Mixed' }
          ]"
        ></options-component>
      </form-element>

      <form-element label="6c. Typology">
        <options-component
          label="Typology"
          v-model="project.typology"
          :options="typologies"
        ></options-component>
      </form-element>

      <form-element label="6d. Budget Tier">
        <options-component
          label="Budget Tier"
          v-model="project.budgetTier"
          :options="[
            {
              label: 'Tier 1',
              value: 'Tier 1'
            },
            {
              label: 'Tier 2',
              value: 'Tier 2'
            }
          ]"
        ></options-component>
      </form-element>

      <form-element label="7a. Spatial Coverage">
        <select-component
          label="7a. Spatial Coverage"
          :options="spatialCoverages"
          v-model="project.spatialCoverage"
          hint="Choose where your project will be implemented."
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="7b. Regions"
        v-if="
          project.spatialCoverage == 'Inter-regional' ||
            project.spatialCoverage == 'Region-specific'
        "
      >
        <select-component
          v-if="project.spatialCoverage == 'Inter-regional'"
          label="7b. Regions"
          :options="regions"
          :multiple="true"
          hint="Select the regions where the project will be implemented."
          v-model="project.regions"
          :rules="rules.required"
        ></select-component>

        <select-component
          v-else-if="project.spatialCoverage == 'Region-specific'"
          label="7b. Region"
          :options="regions"
          v-model="project.regions"
          hint="Select the region where the project will be implemented."
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="7c. Province/s"
        v-if="
          project.spatialCoverage == 'Inter-regional' ||
            project.spatialCoverage == 'Region-specific'
        ">
        <input-component
          label="7c. Province/s"
          v-model="project.provinces"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element
        label="7d. City/Municipality/ies"
        v-if="
          project.spatialCoverage == 'Inter-regional' ||
            project.spatialCoverage == 'Region-specific'
        ">
        <input-component
          label="7d. City/Municipality/ies"
          v-model="project.cityMunicipalities"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="8. Total Project Cost (in PhP)">
        <input-component
          type="number"
          label="8. Total Project Cost (in PhP)"
          hint="Total cost of the project in absolute terms"
          v-model="project.totalProjectCost"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="9. Bases for Implementation">
        <options-component
          label="9. Bases for Implementation"
          type="checkbox"
          v-model="project.implementationBases"
          :options="implementationBases"
        ></options-component>
      </form-element>

      <form-element label="10. RDIP Inclusion">
        <options-component
          inline
          v-model="project.rdipInclusion"
          :options="yesNo"
        ></options-component>
      </form-element>

      <form-element label="11. PCIP Inclusion">
        <options-component
          inline
          v-model="project.pcipInclusion"
          :options="yesNo"
        ></options-component>
      </form-element>

      <form-element label="12. Status of ICC/NEDA Board Processing">
        <select-component
          v-model="project.nedaProcessing"
          :options="nedaProcessing"
        ></select-component>
        <input-component
          class="q-mt-md"
          type="date"
          v-if="project.nedaProcessing != 'Not Applicable'"
          v-model="project.dateNedaProcessing"
        ></input-component>
      </form-element>

      <form-element label="13. Description">
        <input-component
          type="textarea"
          label="13. Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="project.description"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="14. Purpose">
        <input-component
          type="textarea"
          label="14. Purpose"
          v-model="project.purpose"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="15. Challenges being addressed">
        <options-component
          type="checkbox"
          v-model="project.challenges"
          :options="challenges"
          :rules="rules.required"
        ></options-component>
      </form-element>

      <form-element label="16. Expected Outputs">
        <input-component
          type="textarea"
          label="16. Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
          v-model="project.expectedOutputs"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="17. Beneficiaries">
        <input-component
          type="textarea"
          label="17. Beneficiaries"
          v-model="project.beneficiaries"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="18. Estimated number of persons to be employed">
        <input-component
          label="18. Estimated number of persons to be employed"
          v-model="project.employmentGeneration"
          type="number"
        ></input-component>
      </form-element>

      <form-element label="19. Implementation Period">
        <select-component
          outlined
          dense
          label="19a. Implementation Start"
          hint="Target year of start of implementation"
          :options="implementationPeriods"
          v-model="project.implementationStart"
          @input="updateImplementationEnd"
          :rules="rules.required"
        />
        <select-component
          outlined
          dense
          label="19b. Implementation End"
          hint="Target year of project completion"
          :options="filteredImplementationPeriods"
          v-model="project.implementationEnd"
          :readonly="!project.implementationStart"
          :rules="rules.required"
        />
      </form-element>

      <form-element label="20. Physical Status Update/Accomplishment">
        <input-component
          label="20. Physical Status Update/Accomplishment"
          type="textarea"
          v-model="project.updates"
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase"
        >Implementation Readiness</q-item-label
      >

      <q-item-label header>21. Prerequisites</q-item-label>

      <form-element label="NEDA Board">
        <options-component
          inline
          v-model="project.nedaBoard"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="NEDA Board-ICC">
        <options-component
          inline
          v-model="project.nedaBoardIcc"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH Certification">
        <options-component
          inline
          v-model="project.dpwhCertification"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH MOA">
        <options-component
          inline
          v-model="project.dpwhMoa"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DPWH Costing">
        <options-component
          inline
          v-model="project.dpwhCosting"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="DENR Clearance">
        <options-component
          inline
          v-model="project.denrClearance"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="RDC Consultation">
        <options-component
          inline
          v-model="project.rdcConsultation"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="CSO Consultation">
        <options-component
          inline
          v-model="project.csoConsultation"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="List of Locations">
        <options-component
          inline
          v-model="project.listLocations"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="List of Beneficiaries">
        <options-component
          inline
          v-model="project.listBeneficiaries"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element
        label="Evaluated and endorsed by DA Clearinghouse Committee"
      >
        <options-component
          inline
          v-model="project.daClearingHouse"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <q-item-label header>22. Technical Readiness</q-item-label>

      <form-element label="Concept Note">
        <options-component
          inline
          v-model="project.conceptNote"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Feasibility Study">
        <options-component
          inline
          v-model="project.feasibilityStudy"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Detailed Engineering Design">
        <options-component
          inline
          v-model="project.detailedEngineeringDesign"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Business Plan">
        <options-component
          inline
          v-model="project.businessPlan"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Right of Way">
        <options-component
          inline
          v-model="project.rightOfWay"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Resettlement Plan">
        <options-component
          inline
          v-model="project.resettlementPlan"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="Others">
        <options-component
          inline
          v-model="project.otherTechnicalReadiness"
          :options="yesNoNotApplicable"
        ></options-component>
      </form-element>

      <form-element label="23. Level of Readiness">
        <input-component
          label="23. Level of Readiness"
          type="textarea"
          v-model="project.readinessLevel"
        ></input-component>
      </form-element>

      <form-element label="24. Implementation Risks">
        <input-component
          label="24. Implementation Risks"
          type="textarea"
          v-model="project.implementationRisks"
        ></input-component>
      </form-element>

      <form-element label="25. Mitigation Strategies">
        <input-component
          label="25. Mitigation Strategies"
          type="textarea"
          v-model="project.mitigationStrategies"
        ></input-component>
      </form-element>

      <q-item-label header class="text-uppercase"
        >Strategic Alignment</q-item-label
      >

      <form-element
        label="26. New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)"
      >
        <options-component
          type="checkbox"
          :options="newThinkings"
          v-model="project.newThinkings"
        ></options-component>
      </form-element>

      <form-element label="27a. Philippine Development Plan Chapters">
        <select-component
          :options="pdpChapters"
          node-key="value"
          v-model="project.pdp"
          multiple
        />
      </form-element>

      <form-element label="27b. Philippine Development Plan Indicators">
        <q-tree
          :nodes="pdpChaptersFiltered"
          node-key="value"
          tick-strategy="strict"
          label-key="label"
          :ticked.sync="project.pdpIndicators"
          :expanded="project.pdp"
          :dark="dark"
        />
      </form-element>

      <form-element label="29. Sustainable Development Goals">
        <options-component
          type="checkbox"
          :options="sustainableDevelopmentGoals"
          v-model="project.sustainableDevelopmentGoals"
        ></options-component>
      </form-element>

      <form-element label="30. 0-10 Socioeconomic Agenda">
        <options-component
          type="checkbox"
          :options="tenPointAgenda"
          v-model="project.tenPointAgenda"
        ></options-component>
      </form-element>

      <form-element label="31. Level of GAD Responsiveness">
        <options-component
          :options="gadResponsiveness"
          v-model="project.gadResponsiveness"
        ></options-component>
      </form-element>

      <form-element label="32. Infrastructure Sector">
        <q-tree
          :nodes="infrastructureSectors"
          node-key="value"
          tick-strategy="leaf"
          label-key="label"
          :ticked.sync="project.infrastructureSectors"
          :dark="dark"
          default-expand-all
        ></q-tree>
      </form-element>

      <q-item-label header class="text-uppercase"
        >FINANCIAL AND ECONOMIC BENEFITS</q-item-label
      >

      <form-element label="33. Estimated Project Life (in years)">
        <input-component
          label="33. Estimated Project Life (in years)"
          type="number"
          v-model="project.projectLife"
        ></input-component>
      </form-element>

      <form-element label="34. Benefit-Cost Ratio">
        <input-component
          label="34. Benefit-Cost Ratio"
          type="number"
          v-model="project.bcr"
        ></input-component>
      </form-element>

      <form-element label="35. Internal Rate of Return (in %)">
        <input-component
          label="35. Internal Rate of Return (in %)"
          type="number"
          v-model="project.irr"
        ></input-component>
      </form-element>

      <form-element label="36. Return on Investment (in %)">
        <input-component
          label="36. Return on Investment (in %)"
          type="number"
          v-model="project.roi"
        ></input-component>
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

      <form-element v-if="project.components" label="38. Costing by Component">
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
            <q-icon name="error" />No components added.
          </p>
        </template>
      </form-element>

      <form-element label="39. Cost of Infrastructure Component"></form-element>

      <form-element label="40. Costing by Fund Source">
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
            ></costing-component>
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

      <form-element
        label="41. Cost by Location of Implementation"
      ></form-element>

      <form-element
        label="42. Financial Accomplishment (only for locally funded projects)"
      ></form-element>

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
const ButtonComponent = () => import("./UI/ButtonComponent");
const InputComponent = () => import("./FormInputs/InputComponent");
const SelectComponent = () => import("./FormInputs/SelectComponent");
const OptionsComponent = () => import("./FormInputs/OptionsComponent");
const FormElement = () => import("./FormInputs/FormElement");
const CostingComponent = () => import("./CostingComponent");

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
      yesNo: [
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        }
      ],
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
    },
    pdpChaptersFiltered() {
      let pdpChaptersFiltered = []
      if (this.project.pdp.length > 0) {
        pdpChaptersFiltered = this.pdpChapters.filter(chapter => {
          return this.project.pdp.includes(chapter.value)
        })
        return pdpChaptersFiltered
      }
      return this.pdpChapters;
    }
  },
  methods: {
    ...mapActions("projects", ["addProject", "loadProject", "updateProject"]),
    submitProject() {
      if (!this.project.id) {
        this.addProject(this.project);
      } else {
        this.updateProject({
          id: this.project.id,
          project: this.project
        });
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
