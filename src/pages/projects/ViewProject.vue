<template>
  <q-page padding>
    <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
      <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
        <q-avatar icon="note_add" />
        <q-toolbar-title>View Project</q-toolbar-title>
        <q-btn @click="printProject" icon="print" flat round dense />
      </q-toolbar>
      <q-list separator :dark="dark">
        <label-value label="PAP UACS Code" :value="project.uacsCode" />

        <q-item-label header class="text-uppercase">General Information</q-item-label>

        <label-value label="Commodity/ies" :value="project.commodities" />

        <label-value label="Program/Functional Classification" :value="project.program" />

        <label-value label="1. Proposal/Project Name" :value="project.title" />

        <label-value label="2. Implementing Department/Agency" :value="project.implementingAgency" />

        <label-value label="4. Main Funding Source" :value="project.mainFundingSource" />

        <label-value label="4a. Mode of Implementation" :value="project.implementationMode" />

        <label-value label="5. Priority Ranking No." :value="project.priorityRanking" />

        <q-item-label header class="text-uppercase">Categorization</q-item-label>

        <label-value label="6a. Status" :value="project.status"></label-value>

        <label-value label="6b. Infrastructure" :value="project.infrastructure"></label-value>

        <label-value label="6c. Typology" :value="project.typology" />

        <label-value label="6d. Budget Tier" :value="project.budgetTier" />

        <label-value label="7a. Spatial Coverage" :value="project.spatialCoverage" />

        <label-value label="7b. Regions" :value="project.regions" />

        <label-value label="7c. Province/s" :value="project.provinces" />

        <label-value label="7d. City/Municipality/ies" :value="project.cityMunicipalities" />

        <label-value label="8. Total Project Cost (in PhP)" :value="project.totalProjectCost" />

        <label-value label="9. Bases for Implementation" :value="project.implementationBases" />

        <label-value label="10. RDIP Inclusion" :value="project.rdipInclusion" />

        <label-value label="11. PCIP Inclusion" :value="project.pcipInclusion" />

        <label-value
          label="12. Status of ICC/NEDA Board Processing"
          :value="project.nedaProcessing + ' on ' + project.dateNedaProcessing"
        />

        <label-value label="13. Description" :value="project.description" />

        <label-value label="Add component" :value="project.components" />

        <label-value label="14. Purpose" :value="project.purpose" />

        <label-value label="15. Challenges being addressed" :value="project.challenges" />

        <label-value label="16. Expected Outputs" :value="project.expectedOutputs" />

        <label-value label="17. Beneficiaries" :value="project.beneficiaries" />

        <label-value
          label="18. Estimated number of persons to be employed"
          :value="project.employmentGeneration"
        />

        <label-value
          label="19. Implementation Period"
          :value="project.implementationStart + '-' + project.implementationEnd"
        />

        <label-value label="20. Physical Status Update/Accomplishment" :value="project.updates" />

        <q-item-label header class="text-uppercase">Implementation Readiness</q-item-label>

        <q-item-label header>21. Prerequisites</q-item-label>

        <label-value label="NEDA Board" :value="project.nedaBoard" />

        <label-value label="NEDA Board-ICC" :value="project.nedaBoardIcc" />

        <label-value label="DPWH Certification" :value="project.dpwhCertification" />

        <label-value label="DPWH MOA" :value="project.dpwhMoa" />

        <label-value label="DPWH Costing" :value="project.dpwhCosting" />

        <label-value label="DENR Clearance" :value="project.denrClearance" />

        <label-value label="RDC Consultation" :value="project.rdcConsultation" />

        <label-value label="CSO Consultation" :value="project.csoConsultation" />

        <label-value label="List of Locations" :value="project.listLocations" />

        <label-value label="List of Beneficiaries" :value="project.listBeneficiaries" />

        <label-value
          label="Evaluated and endorsed by DA Clearinghouse Committee"
          :value="project.daClearingHouse"
        />

        <q-item-label header>22. Technical Readiness</q-item-label>

        <label-value label="Concept Note" :value="project.conceptNote" />

        <label-value label="Feasibility Study" :value="project.feasibilityStudy" />

        <label-value
          label="Detailed Engineering Design"
          :value="project.detailedEngineeringDesign"
        />

        <label-value label="Business Plan" :value="project.businessPlan" />

        <label-value label="Right of Way" :value="project.rightOfWay" />

        <label-value label="Resettlement Plan" :value="project.resettlementPlan" />

        <label-value label="Others" :value="project.otherTechnicalReadiness" />

        <label-value label="23. Level of Readiness" :value="project.readinessLevel" />

        <label-value label="24. Implementation Risks" :value="project.implementationRisks" />

        <label-value label="25. Mitigation Strategies" :value="project.mitigationStrategies" />

        <q-item-label header class="text-uppercase">Strategic Alignment</q-item-label>

        <label-value
          label="26. New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)"
          :value="project.newThinkings"
        />

        <label-value label="Philippine Development Plan" :value="project.pdp" />

        <label-value
          label="29. Sustainable Development Goals"
          :value="project.sustainableDevelopmentGoals"
        />

        <label-value label="30. 0-10 Socioeconomic Agenda" :value="project.tenPointAgenda" />

        <label-value label="31. Level of GAD Responsiveness" :value="project.gadResponsiveness" />

        <label-value label="32. Infrastructure Sector" :value="project.infrastructureSectors" />

        <q-item-label header class="text-uppercase">FINANCIAL AND ECONOMIC BENEFITS</q-item-label>

        <label-value label="33. Estimated Project Life (in years)" :value="project.projectLife" />

        <label-value label="34. Benefit-Cost Ratio" :value="project.bcr" />

        <label-value label="35. Internal Rate of Return (in %)" :value="project.irr" />

        <label-value label="36. Return on Investment (in %)" :value="project.roi" />

        <q-item-label header>PROJECT COSTING</q-item-label>

        <label-value label="ODA Funding Institution" :value="project.mainFundingInstitution" />

        <label-value label="Other Funding Institution" :value="project.otherFundingInstitution" />

        <label-value label="Other Funding Institution" :value="project.preparationDocument" />

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
            <q-btn flat dense round color="green" icon="add_box" @click="addFundingSource()" />
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
              <q-icon name="error" />No components added.
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
import FormElement from "../../components/FormInputs/FormElement";
import CostingComponent from "../../components/CostingComponent";

const LabelValue = () => import("../../components/LabelValue");

import * as fs from "fs";
import * as docx from "docx";

export default {
  components: {
    SelectComponent,
    FormElement,
    InputComponent,
    CostingComponent,
    LabelValue
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
  methods: {
    printProject() {
      const doc = new docx.Document({
        creator: "DA-IPMS"
      });
    }
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