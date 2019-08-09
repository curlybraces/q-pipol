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

      <options-component
        label="TRIP"
        :options="[{ label: 'Infrastructure', value: 1 }, { label: 'Non-Infrastructure', value: 0 }]"
        v-model="trip"
      ></options-component>

      <checkbox-component
        label="Basis for Implementation"
        :options="implementation_bases"
        v-model="project.implementation_bases"
      ></checkbox-component>

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
        v-if="spatial_coverage_id == 2 || spatial_coverage_id == 3"
        label="Region/s"
        :options="regions"
        optionLabel="label"
        v-model="region_id"
      ></select-component>

      <select-component
        v-if="spatial_coverage_id == 3"
        label="Province/s"
        v-model="project.provinces"
      ></select-component>

      <select-component
        v-if="spatial_coverage_id == 3"
        label="City and Municipalities"
        v-model="project.city_municipalities"
      ></select-component>

      <select-component
        :options="categorizations"
        :value="project.categorization_id"
        label="Categorization"
      >
      </select-component>

    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CardComponent from "../../components/UI/CardComponent";
import SelectComponent from "../../components/Form/SelectComponent";
import InputComponent from "../../components/Form/InputComponent";
import OptionsComponent from "../../components/Form/OptionsComponent";
import CheckboxComponent from "../../components/Form/CheckboxComponent";

export default {
  components: {
    CardComponent,
    SelectComponent,
    InputComponent,
    OptionsComponent,
    CheckboxComponent
  },
  name: "GeneralInformation",
  data() {
    return {
      filteredImplementationPeriods: [],
      trip: false
    };
  },
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown",[
      "implementation_bases",
      "implementation_periods",
      "spatial_coverages",
      "regions",
      "provinces",
      "city_municipalities",
      "categorizations"]),
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
        return this.project.spatial_coverage_id;
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
      "loadCityMunicipalities",
      "loadCategorizations"
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
    }
  },
  mounted() {
    this.loadImplementationBases();
    this.loadImplementationPeriods();
    this.loadSpatialCoverages();
    this.loadRegions();
    this.loadProvinces();
    this.loadCityMunicipalities();
    this.loadCategorizations()
  }
};
</script>

<style></style>
