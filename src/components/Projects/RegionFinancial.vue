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
    <q-markup-table v-if="regions.length" flat bordered separator="cell">
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
      </thead>
      <tbody>
        <tr v-for="region in regions" :key="region.item.value">
          <th>{{ region.item.label }}</th>
          <th>{{ region.target_2016 }}</th>
          <th>{{ region.target_2017 }}</th>
          <th>{{ region.target_2018 }}</th>
          <th>{{ region.target_2019 }}</th>
          <th>{{ region.target_2020 }}</th>
          <th>{{ region.target_2021 }}</th>
          <th>{{ region.target_2022 }}</th>
          <th>{{ region.target_2023 }}</th>
          <th>{{ region.target_total }}</th>
        </tr>
      </tbody>
    </q-markup-table>

    <q-dialog v-model="addRegion">
      <regional-form @close="addRegion = false"></regional-form>
    </q-dialog>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "RegionInformation",
  components: {
    "regional-form": () => import("../Projects/Shared/RegionalForm.vue")
  },
  computed: {
    ...mapFields("project", ["project.regions"])
  },
  data() {
    return {
      addRegion: false
    };
  }
};
</script>
