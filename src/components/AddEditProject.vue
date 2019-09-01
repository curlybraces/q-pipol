<template>
  <q-form
    ref="form"
    @submit="addProject(project)"
    autofocus
  >
    <pre>{{ project }}</pre>
    <q-list
      separator
      :dark="dark"
    >
      <q-item-label
        header
        class="text-uppercase"
      >General Information</q-item-label>

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
          v-model="project.rnk"
        ></input-component>
      </form-element>

      <form-element label="Categorization">
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
          v-else-if="project.sc == 3"
          label="Region"
          :options="regions"
          v-model="project.r"
          hint="Select the region where the project will be implemented."
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element label="Total Project Cost (in PhP)">
        <input-component
          type="number"
          label="Total Project Cost (in PhP)"
          hint="Total cost of the project in absolute terms"
          v-model="project.tc"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Description">
        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="project.d"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Purpose">
        <input-component
          type="textarea"
          label="Purpose"
          v-model="project.p"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Expected Outputs">
        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
          v-model="project.eo"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element label="Beneficiaries">
        <input-component
          type="textarea"
          label="Beneficiaries"
          v-model="project.b"
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
          v-model="project.is"
          @input="updateImplementationEnd"
          :rules="rules.required"
        />
        <select-component
          outlined
          dense
          label="Implementation End"
          hint="Target year of project completion"
          :options="filteredImplementationPeriods"
          v-model="project.ie"
          :readonly="!project.is"
          :rules="rules.required"
        />
      </form-element>

      <q-item-label
        header
        class="text-uppercase"
      >Implementation Readiness</q-item-label>

      <form-element label="Pre-requisites">
        <options-component
          type="toggle"
          :options="prerequisites"
          v-model="project.pr"
        ></options-component>
      </form-element>

      <form-element label="Technical Readiness">
        <options-component
          type="toggle"
          :options="preparationDocuments"
          v-model="project.tr"
        ></options-component>
      </form-element>

      <q-item-label
        header
        class="text-uppercase"
      >Strategic Alignment</q-item-label>

      <form-element label="New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)">
        <options-component
          type="checkbox"
          :options="newThinkings"
          v-model="project.nt"
        ></options-component>
      </form-element>

      <form-element label="Philippine Development Plan">
        <tree-component
          :options="pdpChapters"
          :ticked.sync="project.pdp"
        ></tree-component>
      </form-element>

      <form-element label="Sustainable Development Goals">
        <options-component
          type="checkbox"
          :options="sustainableDevelopmentGoals"
          v-model="project.sdg"
        ></options-component>
      </form-element>

      <form-element label="0 + 10 Socioeconomic Agenda">
        <options-component
          type="checkbox"
          :options="tenPointAgenda"
          v-model="project.tpa"
        ></options-component>
      </form-element>

      <q-item-label header>Project Costing</q-item-label>

      <form-element
        label="ODA Funding Institution"
        v-if="project.mfs == 2 || project.mfs == 3"
      >
        <select-component
          label="ODA Funding Institution"
          v-if="form.mfs == 2 || form.mfs == 3"
          v-model="project.mfi"
          :options="fundingInstitutions"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="Other Funding Institution"
        v-if="project.mfs == 99"
      >
        <input-component
          label="Other Funding Institution"
          v-if="project.mfs == 99"
          v-model="project.ofi"
          :rules="rules.required"
        ></input-component>
      </form-element>

      <form-element
        label="Other Funding Institution"
        v-if="project.cat == 2"
      >
        <select-component
          v-if="project.cat == 2"
          label="Project Preparation Document"
          v-model="project.pd"
          :options="preparationDocuments"
          :rules="rules.required"
        ></select-component>
      </form-element>

      <form-element
        label="PAP UACS Code"
        v-if="project.cat == 1 || project.cat == 3"
      >
        <input-component
          v-if="project.cat == 1 || project.cat == 3"
          label="PAP UACS Code"
          v-model="project.uacs"
          hint="UACS code is optional for new PAPs."
          :rules="rules.required"
        ></input-component>
      </form-element>

      <div class="col q-mb-md">
        <q-table
          :dark="dark"
          flat
          title="Breakdown by Fund Source"
          :data="project.fundingSourceBreakdown"
          :columns="columns"
          class="my-sticky-column-table"
          :row-key="project.fundingSourceBreakdown.fundingSource"
          separator="cell"
        >
          <template v-slot:top-right>
            <button-component
              flat
              dense
              :disable="loading"
              label="Add row"
              @click="addRow"
            />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                key="fundingSource"
                :props="props"
              >
                <select-component
                  :outlined="false"
                  :options="fundingSources"
                  v-model="props.row.fundingSource"
                  dense
                />
              </q-td>
              <q-td
                key="y1"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y1"
                />
              </q-td>
              <q-td
                key="y2"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y2"
                />
              </q-td>
              <q-td
                key="y3"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y3"
                />
              </q-td>
              <q-td
                key="y4"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y4"
                />
              </q-td>
              <q-td
                key="y5"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y5"
                />
              </q-td>
              <q-td
                key="y6"
                :props="props"
              >
                <input-component
                  :outlined="false"
                  type="number"
                  v-model="props.row.y6"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

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
import TreeComponent from "./FormInputs/TreeComponent";
import FormElement from "./AddProject/FormElement";

export default {
  components: {
    SelectComponent,
    FormElement,
    ButtonComponent,
    InputComponent,
    OptionsComponent,
    TreeComponent
  },
  name: "AddEditProject",
  props: {
    project: Object
  },
  data () {
    return {
      filteredImplementationPeriods: [],
      showHelp: false,
      showAddFundSource: true,
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
    addRow () {
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
    updateImplementationEnd (evt) {
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