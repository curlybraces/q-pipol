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

<!--    <q-item>-->
<!--      <multi-select-->
<!--        v-model="selected_provinces"-->
<!--        label="Province/s"-->
<!--        :options="provinces_options"-->
<!--        :dense="dense"-->
<!--        :options-dense="dense"-->
<!--        :readonly="spatial_coverage_id == '1'"-->
<!--        @clear="selected_provinces = []"-->
<!--      />-->
<!--    </q-item>-->

    <q-item>
      <multi-select
        v-model="selected_districts"
        label="District/s"
        :options="districts_options"
        :dense="dense"
        :options-dense="dense"
        :readonly="spatial_coverage_id == '1'"
        @clear="selected_districts = []"
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
      "project.selected_provinces",
      "project.selected_districts",
      "project.cities_municipalities"
    ]),
    ...mapState("options", [
      "districts_options",
      "provinces_options",
      "spatial_coverages"
    ])
  }
};
</script>
