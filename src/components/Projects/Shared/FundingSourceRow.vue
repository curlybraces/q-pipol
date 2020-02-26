<template>
  <tr>
    <th>{{ funding_source.id }}</th>
    <th>{{ funding_source.target_2016 }}</th>
    <th>{{ funding_source.target_2017 }}</th>
    <th>{{ funding_source.target_2018 }}</th>
    <th>{{ funding_source.target_2019 }}</th>
    <th>{{ funding_source.target_2020 }}</th>
    <th>{{ funding_source.target_2021 }}</th>
    <th>{{ funding_source.target_2022 }}</th>
    <th>{{ funding_source.target_2023 }}</th>
    <th>{{ funding_source.target_total }}</th>
    <th>
      <q-btn
        flat
        round
        dense
        icon="edit"
        color="blue"
        @click="editFundingSourceDialog = true"
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
      v-model="editFundingSourceDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
    >
      <fund-source-form
        @close="editFundingSourceDialog = false"
        :funding_source="funding_source"
        :id="id"
      />
    </q-dialog>
  </tr>
</template>

<script>
export default {
  components: {
    "fund-source-form": () => import("./FundSourceForm")
  },
  name: "FundingSourceRow",
  props: ["funding_source"],
  data() {
    return {
      editFundingSourceDialog: false
    };
  }
};
</script>
