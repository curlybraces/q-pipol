<template>
  <q-page padding>
    <p>Programmed Projects</p>
    <q-table :data="data" :columns="columns" row-key="id"> </q-table>
  </q-page>
</template>

<script>
export default {
  name: "ProgrammedProjects",
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: "id",
          sortable: true
        },
        {
          name: "title",
          label: "Proposal",
          field: "title",
          align: "left",
          sortable: true
        },
        {
          name: "total_cost",
          label: "Total Project Cost",
          field: "total_cost",
          sortable: true
        },
        {
          name: "2020",
          label: "2020 (based on NEP)",
          field: "2020",
          sortable: true
        },
        {
          name: "2021",
          label: "2021",
          field: "2021",
          sortable: true
        },
        {
          name: "2022",
          label: "2022",
          field: "2022",
          sortable: true
        },
        {
          name: "2023",
          label: "2023 and Beyond",
          field: "2023",
          sortable: true
        }
      ],
      data: [
        {
          id: "1",
          title: "National Food Consumption Quantification Study",
          total_cost: 15000000,
          2020: 15000000,
          2021: 0,
          2022: 0,
          2023: 0
        },
        {
          id: "2",
          title: "National Farmers and Fisherfolks Information System",
          total_cost: 3000000000,
          2020: 1000000000,
          2021: 1000000000,
          2022: 1000000000,
          2023: 0
        }
      ]
    };
  }
};
</script>
