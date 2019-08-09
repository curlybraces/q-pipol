<template>
  <card-component title="General Information">
    <template v-slot:content>
      <input-component
        label="Project Title"
        hint="Project title must match title in budget proposal"
        v-model="project.title"
      ></input-component>

      <options-component
        label="Program or Project"
        :options="[
          { label: 'Program', value: '1' },
          { label: 'Project', value: '2' }
        ]"
        v-model="project.pap_type_id"
      ></options-component>

      <select-component
        label="Basis for Implementation"
        hint="Included in any of the following documents"
        :options="implementation_bases"
        :multiple="true"
        v-model="project.implementation_bases"
      ></select-component>

      <input-component
        type="textarea"
        label="Description"
        hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
        v-model="project.description"
      ></input-component>

      <input-component
        type="textarea"
        label="Expected Outputs"
        hint="Actual Deliverables, i.e. 100km of paved roads"
        v-model="project.expected_outputs"
      ></input-component>

      <select-component
        label="Implementation Start"
        hint="Target year of start of implementation"
        :options="implementation_periods"
        v-model="project.implementation_start"
        @input="updateImplementationEnd"
      ></select-component>

      <select-component
        label="Implementation End"
        hint="Target year of project completion"
        :options="filteredImplementationPeriods"
        v-model="project.implementation_end"
      ></select-component>

      <select-component
        label="Spatial Coverage"
        :options="spatial_coverages"
        v-model="spatial_coverage_id"
      ></select-component>

      <select-component
        label="Region/s"
        :options="regions"
        v-model="region_id"
      ></select-component>

      <select-component
        label="Province/s"
        v-model="project.provinces"
      ></select-component>

      <select-component
        label="City and Municipalities"
        v-model="project.city_municipalities"
      ></select-component>

      <input-component
        label="No. of persons to be employed"
        type="number"
        hint="Please indicate the no. of persons to be employed by the project outside of the implementing agency"
        v-model="project.employment_generation"
      ></input-component>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CardComponent from "../../components/UI/CardComponent";
import SelectComponent from "../../components/Form/SelectComponent";
import InputComponent from "../../components/Form/InputComponent";
import OptionsComponent from "../../components/Form/OptionsComponent";

export default {
  components: {
    CardComponent,
    SelectComponent,
    InputComponent,
    OptionsComponent
  },
  name: "GeneralInformation",
  data() {
    return {
      filteredImplementationPeriods: []
    };
  },
  computed: {
    ...mapState("dropdown",[
      "implementation_bases",
      "implementation_periods",
      "spatial_coverages",
      "regions",
      "provinces",
      "city_municipalities"]),
    ...mapState("projects", ["project"]),
    region_id: {
      get() {
        return this.project.regions;
      },
      set(val) {
        this.setRegions(val);
      }
    },
    spatial_coverage_id: {
      get() {
        return parseInt(this.project.spatial_coverage_id);
      },
      set(val) {
        this.setSpatialCoverage(val);
      }
    }
  },
  methods: {
    ...mapActions("dropdown", [
      "loadImplementationBases",
      "loadImplementationPeriods",
      "loadSpatialCoverages",
      "loadRegions",
      "loadProvinces",
      "loadCityMunicipalities"
    ]),
    ...mapMutations("projects",["setRegions","setSpatialCoverage"]),
    updateImplementationEnd(evt) {
      let filteredImplementationPeriods = [];
      var start = parseInt(evt);
      filteredImplementationPeriods = this.implementation_periods.filter(
        period => {
          return parseInt(period.name) >= start;
        }
      );
      this.filteredImplementationPeriods = filteredImplementationPeriods;
    },
    submitForm() {
      console.log(this.project);
    }
  },
  mounted() {
    this.loadImplementationBases();
    this.loadImplementationPeriods();
    this.loadSpatialCoverages();
    this.loadRegions();
    this.loadProvinces();
    this.loadCityMunicipalities();
  }
};
</script>

<style></style>
