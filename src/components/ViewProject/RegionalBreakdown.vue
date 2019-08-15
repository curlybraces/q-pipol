<template>
  <div class="q-pa-xs">
    <q-table
      title="Regional Investment"
      :data="region_investments"
      :columns="columns"
      row-key="id"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.region }}
            <q-popup-edit v-model="props.row.name">
              <q-input v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row._2016 }}
            <q-popup-edit v-model="props.row._2016" title="Update calories" buttons>
              <q-input type="number" v-model="props.row._2016" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row._2017 }}</div>
            <q-popup-edit v-model="props.row._2017">
              <q-input type="textarea" v-model="props.row._2017" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row._2018 }}
            <q-popup-edit v-model="props.row._2018" title="Update carbs" buttons persistent>
              <q-input type="number" v-model="props.row._2018" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row._2019 }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row._2020 }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row._2021 }}</q-td>
          <q-td key="iron" :props="props">{{ props.row._2022 }}</q-td>
          <q-td key="protein" :props="props">{{ props.row._2019 }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row._2020 }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row._2021 }}</q-td>
          <q-td key="iron" :props="props">{{ props.row._2022 }}</q-td>
          <q-td key="protein" :props="props">{{ props.row._2023}}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.total }}</q-td>
        </q-tr>
      </template>
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
          name: 'region',
          label: "Region",
          align: 'left',
          field: row => row.region.label
        },
        {
          name: '_2016',
          label: '2016 & Prior',
          field: 'investment_2016'
        },
        {
          name: '_2017',
          label: '2017',
          field: 'investment_2017'
        },
        {
          name: '_2018',
          label: '2018',
          field: 'investment_2018'
        },
        {
          name: '_2019',
          label: '2019',
          field: 'investment_2019'
        },
        {
          name: '_2020',
          label: '2020',
          field: 'investment_2020'
        },
        {
          name: '_2021',
          label: '2021',
          field: 'investment_2021'
        },
        {
          name: '_2022',
          label: '2022',
          field: 'investment_2022'
        },
        {
          name: '_2023',
          label: '2023 & Beyond',
          field: 'investment_2023'
        },
        {
          name: 'total',
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
