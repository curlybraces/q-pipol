<template>
  <funding-source
    title="Add Funding Source"
    @save="addFundingSource"
    :fundSource="fundSourceToEdit"
  ></funding-source>
</template>

<script>
export default {
  components: {
    "funding-source": () => import("./Shared/FundingSource.vue")
  },
  name: "EditFundingSource",
  data() {
    return {
      fundSourceToEdit: {
        id: "",
        target_2016: "",
        target_2017: "",
        target_2018: "",
        target_2019: "",
        target_2020: "",
        target_2021: "",
        target_2022: "",
        target_2023: "",
        target_total: ""
      }
    };
  },
  methods: {
    saveFundingSource() {
      console.log("save fund source");
    },
    addFundingSource() {
      // Todo: update funding source via mutations
    }
  }
};
</script>
