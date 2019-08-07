<template>
  <card-component title="Spatial Coverage">
    <template v-slot:content>
      <select-component
        label="Spatial Coverage"
        :options="spatial_coverages"
        v-model="project.spatial_coverage_id"
      ></select-component>

      <select-component
        label="Region/s"
        :options="regions"
        v-model="project.regions"
      ></select-component>

      <select-component
        label="Province/s"
        v-model="project.provinces"
      ></select-component>

      <select-component
        label="City and Municipalities"
        v-model="project.city_municipalities"
      ></select-component>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";

export default {
  name: "SpatialCoverage",
  components: {
    CardComponent,
    SelectComponent
  },
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown", [
      "spatial_coverages",
      "regions",
      "provinces",
      "city_municipalities"
    ])
  },
  methods: {
    ...mapActions("dropdown", [
      "loadSpatialCoverages",
      "loadRegions",
      "loadProvinces",
      "loadCityMunicipalities"
    ])
  },
  mounted() {
    this.loadSpatialCoverages();
    this.loadRegions();
    this.loadProvinces();
    this.loadCityMunicipalities();
  }
};
</script>
