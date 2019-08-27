<template>
  <q-page padding>
    <div class="row">
      <breadcrumb-component
        :breadcrumbs="[
          {
            icon: 'list',
            label: 'Projects',
            link: '/projects'
          },
          {
            label: 'Add'
          }
        ]"></breadcrumb-component>
      <q-space />
      <q-btn
        flat
        round
        dense
        icon="help"
        :color="(dark) ? 'info': 'primary' "
        @click="showHelp = true"
      ></q-btn>
    </div>

    <q-separator></q-separator>

    <q-dialog
      maximized
      v-model="showHelp"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <help-dialog @close="showHelp = false"> </help-dialog>
    </q-dialog>

    <card-component
      title="Add Project"
      >
      <template v-slot:content>
        <q-banner :class=" (dark) ? 'bg-grey-9' : 'bg-grey-3' ">
          <template v-slot:avatar>
            <q-icon
              name="info"
              :color=" (dark) ? 'white': 'primary' " />
          </template>
          This module is <strong>only</strong> for adding new projects. Once
          added, you may view your projects in the project list and edit to
          complete and finalize your submission.
        </q-banner>

        <q-form ref="form" @submit="addProject(form)" autofocus>

          <div class="text-h6 q-my-md">General Information</div>

          <form-element
            label="Proposal/Project Name">
            <input-component
              label="Proposal/Project Name"
              hint="Project title must match title in budget proposal"
              v-model="form.t"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Implementing Department/Agency">
            <select-component
              label="Implementing Department/Agency"
              :options="operatingUnits"
              v-model="form.iu"
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element
            label="Main Funding Source">
            <select-component
              label="Main Funding Source"
              v-model="form.mfs"
              hint="Choose the major type of funding source for the PAP."
              :options="fundingSources"
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element
            label="Priority Ranking No.">
            <input-component
              type="number"
              label="Priority Ranking No."
              v-model="form.rnk"
            ></input-component>
          </form-element>

          <form-element
            label="Categorization">
              <options-component
                label="Categorization"
                v-model="form.cat"
                :options="categorizations"
              ></options-component>
          </form-element>

          <form-element
            label="Infrastructure">
            <options-component
              inline
              label="Infrastructure"
              v-model="form.if"
              :options="[
                { value: false, label: 'Non-Infrastructure' },
                { value: true, label: 'Infrastructure' }
              ]"
            ></options-component>
          </form-element>

          <form-element
            label="Spatial Coverage">
            <select-component
              label="Spatial Coverage"
              :options="spatialCoverages"
              v-model="form.sc"
              hint="Choose where your project will be implemented."
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element label="Regions" v-if="form.sc == 2 || form.sc == 3">
            <select-component
              v-if="form.sc == 2"
              label="Regions"
              :options="regions"
              :multiple="true"
              hint="Select the regions where the project will be implemented."
              v-model="form.r"
              :rules="rules.required"
            ></select-component>

            <select-component
              v-else-if="form.sc == 3"
              label="Region"
              :options="regions"
              v-model="form.r"
              hint="Select the region where the project will be implemented."
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element
            label="Total Project Cost (in PhP)">
            <input-component
              type="number"
              label="Total Project Cost (in PhP)"
              hint="Total cost of the project in absolute terms"
              v-model="form.tc"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Description">
            <input-component
              type="textarea"
              label="Description"
              hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
              v-model="form.d"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Purpose">
            <input-component
              type="textarea"
              label="Purpose"
              v-model="form.p"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Expected Outputs">
            <input-component
              type="textarea"
              label="Expected Outputs"
              hint="Actual Deliverables, i.e. 100km of paved roads"
              v-model="form.eo"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Beneficiaries">
            <input-component
              type="textarea"
              label="Beneficiaries"
              v-model="form.b"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Implementation Period">
            <select-component
              outlined
              dense
              label="Implementation Start"
              hint="Target year of start of implementation"
              :options="implementationPeriods"
              v-model="form.is"
              @input="updateImplementationEnd"
              :rules="rules.required"/>
            <select-component
              outlined
              dense
              label="Implementation End"
              hint="Target year of project completion"
              :options="filteredImplementationPeriods"
              v-model="form.ie"
              :readonly="!form.is"
              :rules="rules.required"
            />
          </form-element>

          <div class="text-h6 q-my-md">Implementation Readiness</div>

          <form-element
            label="Pre-requisites"
          >
            <options-component
              type="toggle"
              :options="prerequisites"
              v-model="form.pr"></options-component>
          </form-element>

          <q-separator :dark="dark"/>

          <form-element
            label="Technical Readiness"
          >
            <options-component
              type="toggle"
              :options="preparationDocuments"
              v-model="form.tr"></options-component>
          </form-element>

          <div class="text-h6 q-my-md">Strategic Alignment</div>

          <form-element
            label="New Thinking for Agriculture (Eight Paradigms for a Food-Secure Philippines)">
            <options-component
              type="checkbox"
              :options="newThinkings"
              v-model="form.nt"
              ></options-component>
          </form-element>

          <q-separator :dark="dark" />

          <form-element
            label="Philippine Development Plan">
            <tree-component
              :options="pdpChapters"
              :ticked.sync="form.pdp"
              ></tree-component>
          </form-element>

          <q-separator :dark="dark" />

          <form-element
            label="Sustainable Development Goals">
            <options-component
              type="checkbox"
              :options="sustainableDevelopmentGoals"
              v-model="form.sdg"
              ></options-component>
          </form-element>

          <q-separator :dark="dark" />

          <form-element
            label="0 + 10 Socioeconomic Agenda">
            <options-component
              type="checkbox"
              :options="tenPointAgenda"
              v-model="form.tpa"
              ></options-component>
          </form-element>

          <div class="text-h6 q-my-md">Project Costing</div>

          <form-element
            label="ODA Funding Institution"
            v-if="form.mfs == 2 || form.mfs == 3">
            <select-component
              label="ODA Funding Institution"
              v-if="form.mfs == 2 || form.mfs == 3"
              v-model="form.mfi"
              :options="fundingInstitutions"
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element
            label="Other Funding Institution"
            v-if="form.mfs == 99">
            <input-component
              label="Other Funding Institution"
              v-if="form.mfs == 99"
              v-model="form.ofi"
              :rules="rules.required"
            ></input-component>
          </form-element>

          <form-element
            label="Other Funding Institution"
            v-if="form.cat == 2">
            <select-component
              v-if="form.cat == 2"
              label="Project Preparation Document"
              v-model="form.pd"
              :options="preparationDocuments"
              :rules="rules.required"
            ></select-component>
          </form-element>

          <form-element
            label="PAP UACS Code"
            v-if="form.cat == 1 || form.cat == 3">
            <input-component
              v-if="form.cat == 1 || form.cat == 3"
              label="PAP UACS Code"
              v-model="form.uacs"
              hint="UACS code is optional for new PAPs."
              :rules="rules.required"
            ></input-component>
          </form-element>

          <div class="col q-mb-md">
            <q-table
              :dark="dark"
              flat
              title="Breakdown by Fund Source"
              :data="form.fsbd"
              :columns="columns"
              class="my-sticky-column-table"
              :row-key="form.fsbd.fundingSource"
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
                  <q-td key="fundingSource" :props="props">
                    <select-component
                      :outlined="false"
                      :options="fundingSources"
                      v-model="props.row.fundingSource"
                      dense
                    />
                  </q-td>
                  <q-td key="y1" :props="props">
                    <input-component
                      :outlined="false"
                      type="number"
                      v-model="props.row.y1"
                    />
                  </q-td>
                  <q-td key="y2" :props="props">
                    <input-component
                      :outlined="false"
                      type="number"
                      v-model="props.row.y2"
                    />
                  </q-td>
                  <q-td key="y3" :props="props">
                    <input-component
                      :outlined="false"
                      type="number"
                      v-model="props.row.y3"
                    />
                  </q-td>
                  <q-td key="y4" :props="props">
                    <input-component
                      :outlined="false"
                      type="number"
                      v-model="props.row.y4"
                    />
                  </q-td>
                  <q-td key="y5" :props="props">
                    <input-component
                      :outlined="false"
                      type="number"
                      v-model="props.row.y5"
                    />
                  </q-td>
                  <q-td key="y6" :props="props">
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
              label="Save"></button-component>
          </div>
        </q-form>
      </template>
    </card-component>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardComponent from "../../components/UI/CardComponent";
import ButtonComponent from "../../components/UI/ButtonComponent";
// import InputComponent from "../../components/Form/InputComponent";
import InputComponent from "../../components/FormInputs/InputComponent";
import SelectComponent from "../../components/FormInputs/SelectComponent";
import OptionsComponent from "../../components/FormInputs/OptionsComponent";
import TreeComponent from "../../components/FormInputs/TreeComponent";
import HelpDialog from "../../components/AddProject/HelpDialog";
import FormElement from "../../components/AddProject/FormElement";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";

export default {
  components: {
    SelectComponent,
    FormElement,
    CardComponent,
    ButtonComponent,
    InputComponent,
    OptionsComponent,
    HelpDialog,
    BreadcrumbComponent,
    TreeComponent
  },
  name: "PageAddProject",
  data() {
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
      form: {
        iu: 1,
        t: "Title",
        rnk: 1,
        eo: "outputs",
        cat: 1,
        ib: [1, 2, 3],
        d: "description",
        if: false,
        p: "purpose",
        b: "beneficiaries",
        sc: 2,
        r: [1, 2, 3],
        is: 2020,
        ie: 2022,
        mfs: 1,
        mfi: 1,
        ofi: "Other",
        uacs: 100001000,
        tc: 100000000,
        tr: [],
        pr: [],
        nt: [],
        pdp: [],
        sdg: [],
        tpa: [],
        fsbd: []
      },
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
    ...mapState("preparation_documents",["preparationDocuments"]),
    ...mapState("prerequisites",["prerequisites"]),
    ...mapState("new_thinkings",["newThinkings"]),
    ...mapState("pdp_chapters",["pdpChapters"]),
    ...mapState("sustainable_development_goals",["sustainableDevelopmentGoals"]),
    ...mapState("ten_point_agenda",["tenPointAgenda"]),
    ...mapState("settings",["dark"])
  },
  methods: {
    ...mapActions("projects", ["addProject"]),
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
