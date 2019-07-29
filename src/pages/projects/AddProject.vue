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
        ></input-component>

        <options-component
          label="Program or Project"
          :options="[
            { label: 'Program', value: '1' },
            { label: 'Project', value: '2' }
          ]"
        ></options-component>

        <select-component
          label="Basis for Implementation"
          hint="Included in any of the following documents"
          :options="implementation_bases"
          :multiple="true"
        ></select-component>

        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
        ></input-component>

        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
        ></input-component>

        <select-component label="Spatial Coverage" :options="spatial_coverages"></select-component>

        <select-component label="Region/s" :options="regions"></select-component>

        <select-component label="Province/s"></select-component>

        <select-component label="City and Municipalities"></select-component>

        <select-component
                label="Implementation Start"
                hint="Target year of start of implementation"
        ></select-component>

        <select-component
                label="Implementation End"
                hint="Target year of project completion"
        ></select-component>

        <select-component
          label="Project Preparation Document"
        ></select-component>

        <select-component label="Main Funding Source"></select-component>

        <select-component label="ODA Funding Institutions"></select-component>

        <input-component label="Others"></input-component>

        <select-component
          label="Mode of Implementation/Procurement"
        ></select-component>

        <select-component label="Categorization"></select-component>

        <input-component label="UACS Code"></input-component>

      </template>

    </card-component>

  </q-page>
</template>

<script>
import InputComponent from "../../components/InputComponent";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";
import OptionsComponent from "../../components/OptionsComponent";

export default {
  components: {
    OptionsComponent,
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
      implementation_bases: []
    };
  },
  methods: {
    loadRegions() {
      this.$axios.get('/regions')
        .then(res => {
          this.regions = res.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    loadSpatialCoverages() {
        this.$axios.get('/spatial_coverages')
            .then(res => {
                this.spatial_coverages = res.data
            })
            .catch(e => {
                console.log(e)
            })
    },
    loadApprovalLevels() {
      this.$axios.get('/approval_levels')
          .then(res => {
              this.approval_levels = res.data
          })
          .catch(e => {
              console.log(e)
          })
    },
    loadImplementationBases() {
      this.$axios.get('/implementation_bases')
          .then(res => {
              this.implementation_bases = res.data
          })
          .catch(e => {
              console.log(e)
          })
    },
    addProject() {
    	console.log('adding project')
    }
  },
  mounted() {
    this.loadRegions()
    this.loadSpatialCoverages()
    this.loadApprovalLevels()
    this.loadImplementationBases()
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
