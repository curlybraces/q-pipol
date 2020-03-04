<template>
  <tr>
    <th>{{ selectedRegion(region.id) }}</th>
    <th>{{ region.target_2016 }}</th>
    <th>{{ region.target_2017 }}</th>
    <th>{{ region.target_2018 }}</th>
    <th>{{ region.target_2019 }}</th>
    <th>{{ region.target_2020 }}</th>
    <th>{{ region.target_2021 }}</th>
    <th>{{ region.target_2022 }}</th>
    <th>{{ region.target_2023 }}</th>
    <th>{{ region.target_total }}</th>
    <th>
      <q-btn
        flat
        round
        dense
        icon="edit"
        color="blue"
        @click="editRegionDialog = true"
      />
      <q-btn
        flat
        round
        dense
        icon="delete"
        color="red"
        @click="$emit('deleteRow')"
      />
    </th>

    <q-dialog
      v-model="editRegionDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
    >
      <edit-region
        :region="region"
        :index="index"
        @close="editRegionDialog = false"
      />
    </q-dialog>
  </tr>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    "edit-region": () => import("./EditRegion.vue")
  },
  name: "RegionRow",
  props: ["region", "index"],
  computed: {
    ...mapState("options",["regions_options"])
  },
  data() {
    return {
      editRegionDialog: false
    };
  },
  methods: {
    selectedRegion(id) {
      return this.regions_options.filter(region => region.id === id).map(obj => obj.name).reduce(val => val);
    }
  }
};
</script>
