<template>
  <q-list>
    <q-item>
      <single-select
        v-model="spatial_coverage_id"
        label="Spatial Coverage"
        :dense="dense"
        :options-dense="dense"
        :options="spatial_coverages"
      />
    </q-item>

    <q-item>
      <multi-select
        v-model="provinces"
        label="Province/s"
        :options="provinces_options"
        :dense="dense"
        :options-dense="dense"
        :readonly="spatial_coverage_id == '1'"
        @clear="provinces = []"
      />
    </q-item>

    <q-item>
      <multi-select
        v-model="districts"
        label="District/s"
        :options="districts_options"
        :dense="dense"
        :options-dense="dense"
        :readonly="spatial_coverage_id == '1'"
        @clear="districts = []"
      />
    </q-item>

    <q-item>
      <text-input
        type="textarea"
        label="Cities and Municipalities"
        v-model="cities_municipalities"
      />
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  components: {
    "single-select": () => import("../FormInputs/SingleSelect.vue"),
    "text-input": () => import("../FormInputs/TextInput.vue"),
    "multi-select": () => import("../FormInputs/MultiSelect.vue")
  },
  name: "SpatialCoverage",
  props: ["dense"],
  computed: {
    ...mapFields("project", [
      "project.spatial_coverage_id",
      "project.provinces",
      "project.districts",
      "project.cities_municipalities"
    ]),
    ...mapState("options",["districts_options","provinces_options","spatial_coverages"])
  }
};
</script>
