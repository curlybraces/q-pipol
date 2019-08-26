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
      <help-dialog @close="showHelp = false"></help-dialog>
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

        <q-form ref="form" @submit="onSubmit" autofocus>
          <input-component
            label="Proposal/Project Name"
            hint="Project title must match title in budget proposal"
            v-model="form.title"
            :rules="rules.required"
          ></input-component>

          <select-component
            label="Implementing Department/Agency"
            :options="operatingUnits"
            v-model="form.implementing_unit"
            :rules="rules.required"
          ></select-component>

          <input-component
            type="number"
            label="Priority Ranking No."
            v-model="form.rank"
          />

          <options-component
            label="Categorization"
            v-model="form.categorization"
            :options="categorizations"
          ></options-component>

          <options-component
            label="Infrastructure"
            v-model="form.infrastructure"
            :options="[
              { value: 0, label: 'Non-Infrastructure' },
              { value: 1, label: 'Infrastructure' }
            ]"
          ></options-component>

          <input-component
            type="number"
            label="Total Project Cost (in PhP)"
            hint="Total cost of the project in absolute terms"
            v-model="form.total_cost"
            :rules="rules.required"
          />

          <input-component
            type="textarea"
            label="Description"
            hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
            v-model="form.description"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Purpose"
            v-model="form.purpose"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Expected Outputs"
            hint="Actual Deliverables, i.e. 100km of paved roads"
            v-model="form.expected_outputs"
            :rules="rules.required"
          ></input-component>

          <input-component
            type="textarea"
            label="Beneficiaries"
            v-model="form.beneficiaries"
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
                  v-model="form.implementation_start"
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
                  v-model="form.implementation_end"
                  :readonly="!form.implementation_start"
                  :rules="rules.required"
                ></q-select>
              </div>
            </div>
          </div>

          <select-component
            label="Spatial Coverage"
            :options="spatialCoverages"
            v-model="form.spatial_coverage"
            hint="Choose where your project will be implemented."
            :rules="rules.required"
          ></select-component>

          <multi-select-component
            v-if="form.spatial_coverage == 2"
            label="Regions"
            :options="regions"
            hint="Select the regions where the project will be implemented."
            v-model="form.regions"
            :rules="rules.required"
          ></multi-select-component>

          <select-component
            v-else-if="form.spatial_coverage == 3"
            label="Region"
            :options="regions"
            v-model="form.regions"
            hint="Select the region where the project will be implemented."
            :rules="rules.required"
          ></select-component>

          <select-component
            label="Main Funding Source"
            v-model="form.funding_source"
            hint="Choose the major type of funding source for the PAP."
            :options="fundingSources"
            :rules="rules.required"
          ></select-component>

          <select-component
            label="ODA Funding Institutions"
            v-if="form.funding_source == 2 || form.funding_source == 3"
            v-model="form.funding_institution"
            :options="fundingInstitutions"
            :rules="rules.required"
          ></select-component>

          <input-component
            label="Other Funding Institution"
            v-if="form.funding_institution == 99"
            v-model="form.other_funding_institution"
            :rules="rules.required"
          ></input-component>

          <select-component
            v-if="form.categorization == 2"
            label="Project Preparation Document"
            v-model="form.preparation_document"
            :options="preparationDocuments"
            :rules="rules.required"
          ></select-component>

          <input-component
            v-if="form.categorization == 1 || form.categorization == 3"
            label="UACS Code"
            v-model="form.uacs_code"
            hint="UACS code is optional for new PAPs."
            :rules="rules.required"
          ></input-component>

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
import { mapState, mapGetters } from "vuex";
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
      form: {
        operating_unit: null,
        title: null,
        ranking: null,
        key_result_area: null,
        expected_outputs: null,
        implementation_bases: [],
        description: null,
        spatial_coverage: null,
        regions: [],
        implementation_start: null,
        implementation_end: null,
        funding_source: null,
        categorization: null,
        uacs_code: null,
        preparation_document: null,
        total_cost: null,
        regional_breakdown: []
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
    ...mapGetters("regions", ["regions"])
  },
  methods: {
    updateImplementationEnd(evt) {
      let filteredImplementationPeriods = [];
      var start = parseInt(evt);
      filteredImplementationPeriods = this.implementation_periods.filter(
        period => {
          return parseInt(period.value) >= start;
        }
      );
      this.filteredImplementationPeriods = filteredImplementationPeriods;
    },
    addProject(payload) {
      this.$q.loading.show();
      this.$axios
        .post("/projects", payload)
        .then(() => {
          this.$q.loading.hide();

          this.$router.push("/projects");
        })
        .catch(e => {
          console.log("Error: ", e.message);
        });
    },
    onSubmit() {
      // this.addProject(this.form);
      console.log(this.form);
    }
  }
};
</script>

<style lang="stylus">
.my-sticky-column-table
  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child
    background-color #344955
    opacity 1

  td:first-child
    background-color #344955

  thead tr:first-child th:first-child,
  td:first-child
    position sticky
    left 0
    z-index 1
    color: #FFF
</style>
