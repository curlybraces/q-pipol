<template>
  <tr>
    <th>{{ region.id }}</th>
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
      <q-btn flat round dense icon="edit" color="blue" @click="editRegionDialog = true"/>
      <q-btn flat round dense icon="delete" color="red" @click="$emit('deleteRow')" />
    </th>

    <q-dialog v-model="editRegionDialog" transition-hide="fade" transition-show="fade">
      <edit-regional-form :region="region" :id="id" />
    </q-dialog>
  </tr>
</template>

<script>
export default {
  components: {
    "edit-regional-form": () => import("./EditRegionalForm.vue")
  },
  name: "RegionRow",
  props: ["region","id"],
  data() {
    return {
      editRegionDialog: false
    }
  }
}
</script>