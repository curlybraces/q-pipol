<template>
  <q-page padding>
    <div class="row">
      <p>Add Project</p>
      <q-space />
      <q-btn
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <card-component title="Basic Information" :onClick="addProject">

      <template v-slot:content>
        <input-component
          label="Project Title"
          hint="Project title must match title in budget proposal"
          v-model="form.title"
        ></input-component>

        <select-component
          label="Basis for Implementation"
          hint="Included in any of the following documents"
          :options="implementation_bases"
          :multiple="true"
          v-model="form.implementation_bases"
        ></select-component>

        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="form.description"
        ></input-component>

        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
          v-model="form.expected_outputs"
        ></input-component>

        <select-component
          label="Spatial Coverage"
          :options="spatial_coverages"
          v-model="form.spatial_coverage"
        ></select-component>

        <select-component
          label="Region/s"
          :options="regions"
          :multiple="form.spatial_coverage == 2"
          :hint="
            form.spatial_coverage == 3
              ? 'Select region'
              : 'Select as many as applicable'
          "
          v-if="form.spatial_coverage == 2 || form.spatial_coverage == 3"
          v-model="form.regions"
        ></select-component>

        <select-component
          label="Implementation Start"
          hint="Target year of start of implementation"
          :options="implementation_periods"
          v-model="form.implementation_start"
        ></select-component>

        <select-component
          label="Implementation End"
          hint="Target year of project completion"
          :options="implementation_periods"
          v-model="form.implementation_end"
        ></select-component>

        <select-component
          label="Project Preparation Document"
          v-model="form.preparation_document"
        ></select-component>

        <select-component
          label="Main Funding Source"
          v-model="form.funding_source"
        ></select-component>

        <select-component
          label="ODA Funding Institutions"
          v-if="form.funding_source == 2 || form.funding_source == 3"
          v-model="form.funding_institution"></select-component>

        <input-component
          label="Others"
          v-if="form.funding_institution == 99"
          v-model="form.other_funding_institution"></input-component>

        <select-component
          label="Categorization"
          v-model="form.categorization"
        ></select-component>

        <input-component
          label="UACS Code"
          v-model="form.uacs_code"></input-component>

      </template>
    </card-component>
  </q-page>
</template>

<script>
import InputComponent from "../../components/InputComponent";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";

export default {
  components: {
    SelectComponent,
    CardComponent,
    InputComponent
  },
  name: "PageAddProject",
  data() {
    return {
      regions: [],
      spatial_coverages: [],
      approval_levels: [],
      implementation_bases: [],
      implementation_periods: [],
      form: {}
    };
  },
  methods: {
    loadRegions() {
      this.$axios
        .get("/regions")
        .then(res => {
          this.regions = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadDropdowns() {
      this.$axios.get('/dropdowns')
        .then(res => {
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        });
    },
    loadFundingSources() {
      this.$axios
        .get("/spatial_coverages")
        .then(res => {
            this.spatial_coverages = res.data;
        })
        .catch(e => {
            console.log(e);
        });
    },
    loadSpatialCoverages() {
      this.$axios
        .get("/spatial_coverages")
        .then(res => {
          this.spatial_coverages = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadApprovalLevels() {
      this.$axios
        .get("/approval_levels")
        .then(res => {
          this.approval_levels = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadImplementationPeriods() {
      this.$axios
        .get('/implementation_periods')
        .then(res => {
          this.implementation_periods = res.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    loadImplementationBases() {
      this.$axios
        .get("/implementation_bases")
        .then(res => {
          this.implementation_bases = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addProject() {
      console.log( this.form );
      this.$axios.post('/projects', this.form )
        .then(res => {
          console.log(res.data)
          this.$q.notify({
            message: res.data,
            color: 'secondary',
            position: 'top'
          })
        })
        .catch(e => {
          this.$q.notify({
            message: e.message,
            color: 'red',
            position: 'top'
          })
        })
    }
  },
  mounted() {
    this.loadRegions();
    this.loadSpatialCoverages();
    this.loadApprovalLevels();
    this.loadImplementationBases();
    this.loadImplementationPeriods();
    this.loadDropdowns();
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
