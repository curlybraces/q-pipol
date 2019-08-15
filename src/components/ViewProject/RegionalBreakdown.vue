<template>
  <div class="q-pa-xs">
    <q-table
      title="Regional Investment"
      :data="region_investments"
      :columns="columns"
      row-key="id"
    >
    </q-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RegionalBreakdown",
  data() {
    return {
      columns: [
        {
          name: 'Region',
          label: "Region",
          align: 'left',
          field: row => row.region.label
        },
        {
          name: '2016 & Prior',
          label: '2016 & Prior',
          field: 'investment_2016'
        },
        {
          name: '2017',
          label: '2017',
          field: 'investment_2017'
        },
        {
          name: '2018',
          label: '2018',
          field: 'investment_2018'
        },
        {
          name: '2019',
          label: '2019',
          field: 'investment_2019'
        },
        {
          name: '2020',
          label: '2020',
          field: 'investment_2020'
        },
        {
          name: '2021',
          label: '2021',
          field: 'investment_2021'
        },
        {
          name: '2022',
          label: '2022',
          field: 'investment_2022'
        },
        {
          name: '2023 & Beyond',
          label: '2023 & Beyond',
          field: 'investment_2023'
        },
        {
          name: 'Total',
          label: "Total",
          field: 'investment_total'
        },
      ]
    };
  },
  computed: {
    ...mapState("projects",["project"]),
    region_investments() {
      return this.project.region_investments;
    }
  }
};
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }
</style>
