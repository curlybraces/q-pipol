<template>
  <q-page padding>
    <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
      <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
        <q-avatar icon="note_add"/>
        <q-toolbar-title>View Project</q-toolbar-title>
      </q-toolbar>
      <q-list separator :dark="dark">
        <form-element
          label="PAP UACS Code"
          v-if="project.categorization == 1 || project.categorization == 3"
        >
          <p>{{ project.uacsCode }}</p>
        </form-element>

        <q-item-label header class="text-uppercase">General Information</q-item-label>

        <form-element label="Commodity/ies">
          <input-component label="Commodity/ies" v-model="project.commodities"></input-component>
        </form-element>

        <form-element label="Program/Functional Classification">
          <input-component label="Program/Functional Classification" v-model="project.program"></input-component>
        </form-element>

        <q-item>
          <q-item-section>
            <q-item-label caption>1. Proposal/Project Name</q-item-label>
            <q-item-label>{{ project.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>2. Implementing Department/Agency</q-item-label>
            <q-item-label>{{ project.implementingAgency }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>3. Program or Project</q-item-label>
            <q-item-label>{{ project.classification }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>4. Main Funding Source</q-item-label>
            <q-item-label>{{ project.mainFundingSource }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>4a. Mode of Implementation</q-item-label>
            <q-item-label>{{ project.implementationMode }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>5. Priority Ranking No.</q-item-label>
            <q-item-label>{{ project.priorityRanking }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header class="text-uppercase">Categorization</q-item-label>

        <form-element label="6a. Status">
          <p class="lt-md">6a. Status</p>
          <options-component label="Status" v-model="project.status"></options-component>
        </form-element>

        <form-element label="6b. Infrastructure">
          <options-component label="6b. Infrastructure" v-model="project.infrastructure"></options-component>
        </form-element>

        <form-element label="6c. Typology">
          <p class="lt-md">6c. Typology</p>
          <options-component label="Typology" v-model="project.typology"></options-component>
        </form-element>

        <form-element label="6d. Budget Tier">
          <p class="lt-md">6d. Budget Tier</p>
          <options-component label="Budget Tier" v-model="project.budgetTier"></options-component>
        </form-element>

        <form-element label="7a. Spatial Coverage">
          <select-component label="7a. Spatial Coverage" v-model="project.spatialCoverage"></select-component>
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
            v-model="project.regions"
          ></select-component>

          <select-component
            v-else-if="project.spatialCoverage == 'Region-specific'"
            label="7b. Region"
            v-model="project.regions"
          ></select-component>
        </form-element>

        <form-element label="7c. Province/s">
          <input-component label="7c. Province/s" v-model="project.provinces"></input-component>
        </form-element>

        <form-element label="7d. City/Municipality/ies">
          <input-component label="7d. City/Municipality/ies" v-model="project.cityMunicipalities"></input-component>
        </form-element>

        <form-element label="8. Total Project Cost (in PhP)">
          <input-component
            type="number"
            label="8. Total Project Cost (in PhP)"
            hint="Total cost of the project in absolute terms"
            v-model="project.totalProjectCost"
          ></input-component>
        </form-element>

        <form-element label="9. Bases for Implementation">
          <p class="lt-md">9. Bases for Implementation</p>
          <options-component
            label="9. Bases for Implementation"
            type="checkbox"
            v-model="project.implementationBases"
            :options="implementationBases"
          ></options-component>
        </form-element>

        <form-element label="10. RDIP Inclusion">
          <p class="lt-md">10. RDIP Inclusion</p>
          <options-component inline v-model="project.rdipInclusion" :options="yesNo"></options-component>
        </form-element>

        <form-element label="11. PCIP Inclusion">
          <p class="lt-md">11. PCIP Inclusion</p>
          <options-component inline v-model="project.pcipInclusion" :options="yesNo"></options-component>
        </form-element>

        <form-element label="12. Status of ICC/NEDA Board Processing">
          <select-component
            label="12. Status of ICC/NEDA Board Processing"
            v-model="project.nedaProcessing"
          ></select-component>
          <input-component class="q-mt-md" type="date" v-model="project.dateNedaProcessing"></input-component>
        </form-element>

        <form-element label="13. Description">
          <input-component label="13. Description" v-model="project.description"></input-component>
        </form-element>

        <form-element label="Components">
          <q-select
            :dark="dark"
            :color="dark ? 'info' : 'primary'"
            label="Add component"
            v-model="project.components"
          />
        </form-element>

        <form-element label="14. Purpose">
          <input-component label="14. Purpose" v-model="project.purpose"></input-component>
        </form-element>

        <form-element label="15. Challenges being addressed">
          <options-component label="15. Challenges being addressed" v-model="project.challenges"></options-component>
        </form-element>

        <form-element label="16. Expected Outputs">
          <input-component label="16. Expected Outputs" v-model="project.expectedOutputs"></input-component>
        </form-element>

        <form-element label="17. Beneficiaries">
          <input-component label="17. Beneficiaries" v-model="project.beneficiaries"></input-component>
        </form-element>

        <form-element label="18. Estimated number of persons to be employed">
          <input-component
            label="18. Estimated number of persons to be employed"
            v-model="project.employmentGeneration"
          ></input-component>
        </form-element>

        <form-element label="19. Implementation Period">
          <select-component
            label="19a. Implementation Start"
            v-model="project.implementationStart"
          />
          <select-component label="19b. Implementation End" v-model="project.implementationEnd"/>
        </form-element>

        <form-element label="20. Physical Status Update/Accomplishment">
          <input-component
            label="20. Physical Status Update/Accomplishment"
            type="textarea"
            v-model="project.updates"
          ></input-component>
        </form-element>

        <q-item-label header class="text-uppercase">Implementation Readiness</q-item-label>

        <q-item-label header>21. Prerequisites</q-item-label>

        <form-element label="NEDA Board">
          <options-component label="NEDA Board" v-model="project.nedaBoard"></options-component>
        </form-element>

        <form-element label="NEDA Board-ICC">
          <options-component label="NEDA Board-ICC" v-model="project.nedaBoardIcc"></options-component>
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
          <options-component label="DPWH Costing" v-model="project.dpwhCosting"></options-component>
        </form-element>

        <form-element label="DENR Clearance">
          <options-component label="DENR Clearance" v-model="project.denrClearance"></options-component>
        </form-element>

        <form-element label="RDC Consultation">
          <options-component label="RDC Consultation" v-model="project.rdcConsultation"></options-component>
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
          <options-component label="List of Locations" v-model="project.listLocations"></options-component>
        </form-element>

        <form-element label="List of Beneficiaries">
          <options-component label="List of Beneficiaries" v-model="project.listBeneficiaries"></options-component>
        </form-element>

        <form-element label="Evaluated and endorsed by DA Clearinghouse Committee">
          <options-component
            label="Evaluated and endorsed by DA Clearinghouse Committee"
            v-model="project.daClearingHouse"
          ></options-component>
        </form-element>

        <q-item-label header>22. Technical Readiness</q-item-label>

        <form-element label="Concept Note">
          <options-component label="Concept Note" v-model="project.conceptNote"></options-component>
        </form-element>

        <form-element label="Feasibility Study">
          <options-component label="Feasibility Study" v-model="project.feasibilityStudy"></options-component>
        </form-element>

        <form-element label="Detailed Engineering Design">
          <options-component
            inline
            label="Detailed Engineering Design"
            v-model="project.detailedEngineeringDesign"
          ></options-component>
        </form-element>

        <form-element label="Business Plan">
          <options-component inline label="Business Plan" v-model="project.businessPlan"></options-component>
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

        <q-item-label header class="text-uppercase">Strategic Alignment</q-item-label>

        <form-element
          label="26. New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)"
        >
          <p class="lt-md">26. New Thinking in Agriculture</p>
          <options-component type="checkbox" :options="newThinkings" v-model="project.newThinkings"></options-component>
        </form-element>

        <form-element label="Philippine Development Plan">
          <p class="lt-md">Philippine Development Plan</p>
          <q-tree
            :nodes="pdpChapters"
            node-key="value"
            tick-strategy="strict"
            label-key="label"
            :ticked.sync="project.pdp"
            :dark="dark"
          />
        </form-element>

        <form-element label="29. Sustainable Development Goals">
          <p class="lt-md">29. Sustainable Development Goals</p>
          <options-component
            type="checkbox"
            :options="sustainableDevelopmentGoals"
            v-model="project.sustainableDevelopmentGoals"
          ></options-component>
        </form-element>

        <form-element label="30. 0-10 Socioeconomic Agenda">
          <p class="lt-md">30. 0-10 Socioeconomic Agenda</p>
          <options-component
            type="checkbox"
            :options="tenPointAgenda"
            v-model="project.tenPointAgenda"
          ></options-component>
        </form-element>

        <form-element label="31. Level of GAD Responsiveness">
          <p class="lt-md">31. Level of GAD Responsiveness</p>
          <options-component :options="gadResponsiveness" v-model="project.gadResponsiveness"></options-component>
        </form-element>

        <form-element label="32. Infrastructure Sector">
          <p class="lt-md">32. Infrastructure Sector</p>
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

        <q-item-label header class="text-uppercase">FINANCIAL AND ECONOMIC BENEFITS</q-item-label>

        <form-element label="33. Estimated Project Life (in years)">
          <input-component
            label="33. Estimated Project Life (in years)"
            type="number"
            v-model="project.projectLife"
          ></input-component>
        </form-element>

        <form-element label="34. Benefit-Cost Ratio">
          <input-component label="34. Benefit-Cost Ratio" type="number" v-model="project.bcr"></input-component>
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
          ></select-component>
        </form-element>

        <form-element label="Other Funding Institution" v-if="project.mainFundingSource == 99">
          <input-component
            label="Other Funding Institution"
            v-if="project.mainFundingSource == 99"
            v-model="project.otherFundingInstitution"
            :rules="rules.required"
          ></input-component>
        </form-element>

        <form-element label="Other Funding Institution" v-if="project.categorization == 2">
          <select-component
            v-if="project.categorization == 2"
            label="Project Preparation Document"
            v-model="project.preparationDocument"
            :options="preparationDocuments"
            :rules="rules.required"
          ></select-component>
        </form-element>

        <form-element label="Costing by Fund Source">
          <p class="lt-md">Costing by Funding Source</p>
          <template v-if="project.fundingSourceBreakdown">
            <div class="row" v-for="(fs, index) in project.fundingSourceBreakdown" :key="index">
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
            <q-btn flat dense round color="green" icon="add_box" @click="addFundingSource()"/>
          </div>
        </form-element>

        <form-element v-if="project.components" label="Costing by Component">
          <p class="lt-md">Costing by Component</p>
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
              <q-icon name="error"/>No components added.
            </p>
          </template>
        </form-element>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { firebaseDb } from "boot/firebase";
import { mapState, mapGetters } from "vuex";
import { Notify } from "quasar";
import InputComponent from "../../components/FormInputs/InputComponent";
import SelectComponent from "../../components/FormInputs/SelectComponent";
import OptionsComponent from "../../components/FormInputs/OptionsComponent";
import FormElement from "../../components/FormInputs/FormElement";
import CostingComponent from "../../components/CostingComponent";

export default {
  components: {
    SelectComponent,
    FormElement,
    InputComponent,
    OptionsComponent,
    CostingComponent
  },
  name: "PageViewProject",
  data() {
    return {
      project: {}
    };
  },
  computed: {
    ...mapState("settings", ["dark"]),
    ...mapGetters("projects", ["getProject"])
  },
  created() {
    let ref = firebaseDb.collection("projects");
    console.log(this.$route.params.id);
    ref
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.project = doc.data();
      })
      .catch(err => {
        Notify.create("Error message: ", err.message);
      });
  }
};
</script>