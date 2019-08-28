<template>
  <q-page padding>
    <p>Ranked PAPs</p>

    <q-table
      title="Prioritized Projects"
      separator="cell"
      flat
      bordered
      :data="data"
      :columns="columns"
      row-key="id"
    >
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: "RankedProjects",
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
          name: "criteria1",
          label: "#1",
          field: "criteria_1",
          sortable: true
        },
        {
          name: "criteria2",
          label: "#2",
          field: "criteria_2",
          sortable: true
        },
        {
          name: "criteria3",
          label: "#3",
          field: "criteria_3",
          sortable: true
        },
        {
          name: "criteria4",
          label: "#4",
          field: "criteria_4",
          sortable: true
        },
        {
          name: "criteria5",
          label: "#5",
          field: "criteria_5",
          sortable: true
        },
        {
          name: "criteria6",
          label: "#6",
          field: "criteria_6",
          sortable: true
        },
        {
          name: "total",
          label: "Total Score",
          field: "total",
          sortable: true
        },
        {
          name: "rank",
          label: "Rank",
          field: "rank",
          sortable: true
        }
      ],
      data: [
        {
          id: "1",
          title: "National Food Consumption Quantification Study",
          criteria_1: 10,
          criteria_2: 20,
          criteria_3: 10,
          criteria_4: 25,
          criteria_5: 10,
          criteria_6: 15,
          total: 90,
          rank: 1
        },
        {
          id: "2",
          criteria_1: 20
        }
      ]
    };
  }
};
</script>
