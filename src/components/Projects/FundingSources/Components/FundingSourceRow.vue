<template>
  <tr>
    <th>{{ fundingSource(funding_source.id) }}</th>
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
      <edit-funding-source
        :funding_source="funding_source"
        :index="index"
        @close="editFundingSourceDialog = false"
      />
    </q-dialog>
  </tr>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    "edit-funding-source": () => import("../Components/EditFundingSource")
  },
  name: "FundingSourceRow",
  props: ["funding_source", "index"],
  computed: {
    ...mapState("options", ["funding_sources_options"])
  },
  data() {
    return {
      editFundingSourceDialog: false
    };
  },
  methods: {
    fundingSource(id) {
      return this.funding_sources_options
        .filter(fs => fs.id === id)
        .map(obj => obj.name)
        .reduce(val => val);
    }
  }
};
</script>
