<template>
  <div>
    <q-item-label header>
      Regional Investment
      <q-icon
        name="edit"
        label="Add Region"
        class="cursor-pointer"
        color="primary"
        @click="addRegion = true"
      />
    </q-item-label>
    <q-markup-table flat bordered separator="cell">
      <thead>
        <th>Region</th>
        <th>2016</th>
        <th>2017</th>
        <th>2018</th>
        <th>2019</th>
        <th>2020</th>
        <th>2021</th>
        <th>2022</th>
        <th>2023</th>
        <th>Total</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <template v-if="regions.length">
          <template v-for="(region, index) in regions">
            <region-row
              :region="region"
              :key="index"
              @deleteRow="deleteThis(index)"
            />
          </template>
        </template>
        <template v-else>
          <tr>
            <th colspan="10">No data to show.</th>
          </tr>
        </template>
      </tbody>
    </q-markup-table>

    <q-dialog v-model="addRegion" transition-hide="fade" transition-show="fade">
      <regional-form @close="addRegion = false"></regional-form>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "RegionInformation",
  components: {
    "regional-form": () => import("../Projects/Shared/RegionalForm.vue"),
    "region-row": () => import("../Projects/Shared/RegionRow.vue")
  },
  computed: {
    ...mapFields("project", ["project.regions"])
  },
  data() {
    return {
      addRegion: false
    };
  },
  methods: {
    ...mapMutations("project", ["deleteRegion"]),
    deleteThis(index) {
      this.deleteRegion(index);
    }
  }
};
</script>
