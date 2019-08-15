<template>
  <modal
    title="Spatial Coverage"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <div class="q-col-gutter-y-md">

        <q-select
          dense
          outlined
          stack-label
          label="Spatial Coverage"
          :options="spatial_coverages"
          v-model="spatial_coverage"
          />

        <p>Regions</p>
        <q-scroll-area class="scroll-area">
          <q-option-group
            dense
            v-model="selectedRegions"
            type="checkbox"
            :options="regions"
            ></q-option-group>
        </q-scroll-area>

        <p>Provinces</p>
        <q-scroll-area class="scroll-area">
          <q-option-group
            dense
            v-model="selectedProvinces"
            type="checkbox"
            :options="provinces"
            ></q-option-group>
        </q-scroll-area>

        <q-input
          outlined
          dense
          stack-label
          type="textarea"
          label="City/Municipalities"
          v-model="city_municipalities"
        />

      </div>
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "SpatialCoverage",
  data() {
    return {
      spatial_coverage: "",
      selectedRegions: [],
      selectedProvinces: [],
      city_municipalities: ""
    };
  },
  computed: {
    ...mapState("spatial_coverages",["spatial_coverages"]),
    ...mapState("regions",["regions"]),
    ...mapState("provinces",["provinces"])
  },
  methods: {
    ...mapActions("spatial_coverages",["loadSpatialCoverages"]),
    ...mapActions("regions",["loadRegions"]),
    ...mapActions("provinces",["loadProvinces"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description);
    }
  },
  created() {
    this.loadSpatialCoverages();
    this.loadRegions();
    this.loadProvinces();
  }
};
</script>

<style scoped>
  .scroll-area {
    height: 120px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 5px;
  }
</style>
