<template>
  <q-page padding>
    <div class="row">
      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el icon="list" label="Projects" to="/projects" />
        <q-breadcrumbs-el label="Add" />
      </q-breadcrumbs>
      <q-space />
      <q-btn
        flat
        round
        dense
        icon="help"
        color="primary"
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

    <card-component title="Add Project">
      <template v-slot:content>
        <q-banner class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="info" color="primary" />
          </template>
          This module is <strong>only</strong> for adding new projects. Once
          added, you may view your projects in the project list and edit to
          complete and finalize your submission.
        </q-banner>

        <q-form ref="form" @submit="addProject(form)" autofocus>
          <input-component
            label="Proposal/Project Name"
            hint="Project title must match title in budget proposal"
            v-model="form.t"
            :rules="rules.required"
          ></input-component>

          <select-component
            label="Implementing Department/Agency"
            :options="operatingUnits"
            v-model="form.iu"
            :rules="rules.required"
          ></select-component>

          <input-component
            type="number"
            label="Priority Ranking No."
            v-model="form.rnk"
          />

          <options-component
            label="Categorization"
            v-model="form.cat"
            :options="categorizations"
          ></options-component>

          <options-component
            label="Infrastructure"
            v-model="form.if"
            :options="[
              { value: false, label: 'Non-Infrastructure' },
              { value: true, label: 'Infrastructure' }
            ]"
          ></options-component>

          <input-component
            type="number"
            label="Total Project Cost (in PhP)"
            hint="Total cost of the project in absolute terms"
            v-model="form.tc"
            :rules="rules.required"
          />

          <input-component
            type="textarea"
            label="Description"
            hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
            v-model="form.d"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Purpose"
            v-model="form.p"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Expected Outputs"
            hint="Actual Deliverables, i.e. 100km of paved roads"
            v-model="form.eo"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Beneficiaries"
            v-model="form.b"
            :rules="rules.required"
          ></input-component>

          <div class="row">
            <div class="col-sm-3 text-weight-bold text-primary">
              Implementation Period
            </div>
            <div class="row col-sm-9 q-col-gutter-x-md">
              <div class="col-xs-6">
                <q-select
                  outlined
                  dense
                  label="Implementation Start"
                  hint="Target year of start of implementation"
                  :options="implementationPeriods"
                  v-model="form.is"
                  @input="updateImplementationEnd"
                  :rules="rules.required"
                ></q-select>
              </div>
              <div class="col-xs-6">
                <q-select
                  outlined
                  dense
                  label="Implementation End"
                  hint="Target year of project completion"
                  :options="filteredImplementationPeriods"
                  v-model="form.ie"
                  :readonly="!form.is"
                  :rules="rules.required"
                ></q-select>
              </div>
            </div>
          </div>

          <select-component
            label="Spatial Coverage"
            :options="spatialCoverages"
            v-model="form.sc"
            hint="Choose where your project will be implemented."
            :rules="rules.required"
          ></select-component>

          <multi-select-component
            v-if="form.sc == 2"
            label="Regions"
            :options="regions"
            hint="Select the regions where the project will be implemented."
            v-model="form.r"
            :rules="rules.required"
          ></multi-select-component>

          <select-component
            v-else-if="form.spatial_coverage == 3"
            label="Region"
            :options="regions"
            v-model="form.r"
            hint="Select the region where the project will be implemented."
            :rules="rules.required"
          ></select-component>

          <select-component
            label="Main Funding Source"
            v-model="form.mfs"
            hint="Choose the major type of funding source for the PAP."
            :options="fundingSources"
            :rules="rules.required"
          ></select-component>

          <select-component
            label="ODA Funding Institutions"
            v-if="form.funding_source == 2 || form.funding_source == 3"
            v-model="form.mfi"
            :options="fundingInstitutions"
            :rules="rules.required"
          ></select-component>

          <input-component
            label="Other Funding Institution"
            v-if="form.funding_institution == 99"
            v-model="form.ofi"
            :rules="rules.required"
          ></input-component>

          <select-component
            v-if="form.categorization == 2"
            label="Project Preparation Document"
            v-model="form.pd"
            :options="preparationDocuments"
            :rules="rules.required"
          ></select-component>

          <input-component
            v-if="form.categorization == 1 || form.categorization == 3"
            label="UACS Code"
            v-model="form.uacs"
            hint="UACS code is optional for new PAPs."
            :rules="rules.required"
          ></input-component>

          <div class="row q-mb-md">
            <div class="col-sm-3 text-weight-bold text-primary">
              Budget by Fund Source
            </div>
            <div class="col-sm-9 text-center">
              <q-table
                title="Breakdown by Fund Source"
                :data="form.fsbd"
                :columns="columns"
                class="my-sticky-column-table"
                :row-key="fsbd.fundingSource"
                separator="cell">
                <template v-slot:top-right>
                  <q-btn flat dense color="primary" :disable="loading" label="Add row" @click="addRow" />
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="fundingSource" :props="props">
                      <q-select
                        :options="fundingSources"
                        v-model="props.row.fundingSource"
                        dense
                        emit-value
                        map-options
                      />
                    </q-td>
                    <q-td key="y1" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y1" input-class="text-right"/>
                    </q-td>
                    <q-td key="y2" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y2" input-class="text-right"/>
                    </q-td>
                    <q-td key="y3" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y3" input-class="text-right"/>
                    </q-td>
                    <q-td key="y4" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y4" input-class="text-right"/>
                    </q-td>
                    <q-td key="y5" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y5" input-class="text-right"/>
                    </q-td>
                    <q-td key="y6" :props="props">
                      <q-input flat dense type="number" v-model="props.row.y6" input-class="text-right"/>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>

          <div class="text-center">
            <q-btn icon="save" color="primary" type="submit">
              Save
            </q-btn>
          </div>
        </q-form>
      </template>
    </card-component>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardComponent from "../../components/UI/CardComponent";
import InputComponent from "../../components/Form/InputComponent";
import SelectComponent from "../../components/Form/SelectComponent";
import MultiSelectComponent from "../../components/Form/MultiSelectComponent";
import OptionsComponent from "../../components/Form/OptionsComponent";
import HelpDialog from "../../components/AddProject/HelpDialog";

export default {
  components: {
    SelectComponent,
    MultiSelectComponent,
    CardComponent,
    InputComponent,
    OptionsComponent,
    HelpDialog
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
        },
      ],
      loading: false,
      form: {
        iu: "1",
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
        is: 1,
        ie: 1,
        mfs: 1,
        mfi: 1,
        ofi: "Other",
        uacs: 100001000,
        tc: 100000000,
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
    ...mapState("regions", ["regions"])
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
    },

  }
};
</script>
