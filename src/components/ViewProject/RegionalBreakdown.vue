<template>
  <div class="q-pa-xs">
    <q-table
      title="Regional Investment"
      :data="region_investments"
      :columns="columns"
      row-key="id"
      rows-per-page="20"
      >
      <template v-slot:top>
        <q-btn flat dense color="primary" :disable="loading" label="Add row" @click="addRow" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="region" :props="props">
            {{ props.row.region.label }}
            <q-popup-edit v-model="props.row.region" title="Update region" buttons persistent>
              <q-select
                v-model="props.row.region"
                :options="regions"
                dense
                autofocus
                counter />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2016" :props="props">
            {{ props.row.investment_2016 }}
            <q-popup-edit v-model="props.row._2016" title="Update 2016" buttons persistent>
              <q-input type="number" v-model="props.row._2016" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2017" :props="props">
            <div class="text-pre-wrap">{{ props.row.investment_2017 }}</div>
            <q-popup-edit v-model="props.row.investment_2017" title="Update 2017" buttons persistent>
              <q-input type="textarea" v-model="props.row.investment_2017" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2018" :props="props">
            {{ props.row.investment_2018 }}
            <q-popup-edit v-model="props.row.investment_2018" title="Update 2018" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2018" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2019" :props="props">
            {{ props.row.investment_2019 }}
            <q-popup-edit v-model="props.row.investment_2019" title="Update 2019" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2019" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2020" :props="props">
            {{ props.row.investment_2020 }}
            <q-popup-edit v-model="props.row.investment_2020" title="Update 2020" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2020" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2021" :props="props">
            {{ props.row.investment_2021 }}
            <q-popup-edit v-model="props.row.investment_2021" title="Update 2021" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2021" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2022" :props="props">
            {{ props.row.investment_2022 }}
            <q-popup-edit v-model="props.row.investment_2022" title="Update 2022" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2022" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_2023" :props="props">
            {{ props.row.investment_2023}}
            <q-popup-edit v-model="props.row.investment_2023" title="Update 2023 and beyond" buttons persistent>
              <q-input type="number" v-model="props.row.investment_2023" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="investment_total" :props="props">
            {{ props.row.investment_total }}
            <q-popup-edit v-model="props.row.investment_total" title="Update total" buttons persistent>
              <q-input type="number" v-model="props.row.investment_total" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
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
      loading: false,
      columns: [
        {
          name: 'region',
          label: "Region",
          align: 'left',
          field: row => row.region.label
        },
        {
          name: 'investment_2016',
          label: '2016 & Prior',
          field: 'investment_2016'
        },
        {
          name: 'investment_2017',
          label: '2017',
          field: 'investment_2017'
        },
        {
          name: 'investment_2018',
          label: '2018',
          field: 'investment_2018'
        },
        {
          name: 'investment_2019',
          label: '2019',
          field: 'investment_2019'
        },
        {
          name: 'investment_2020',
          label: '2020',
          field: 'investment_2020'
        },
        {
          name: 'investment_2021',
          label: '2021',
          field: 'investment_2021'
        },
        {
          name: 'investment_2022',
          label: '2022',
          field: 'investment_2022'
        },
        {
          name: 'investment_2023',
          label: '2023 & Beyond',
          field: 'investment_2023'
        },
        {
          name: 'investment_total',
          label: "Total",
          field: 'investment_total'
        },
      ]
    };
  },
  computed: {
    ...mapState("projects",["project"]),
    ...mapState("regions",["regions"]),
    region_investments() {
      return this.project.region_investments;
    }
  },
  methods: {
    addRow() {
      this.project.region_investments.push({
        region: "",
        investment_2016: 0,
        investment_2017: 0,
        investment_2018: 0,
        investment_2019: 0,
        investment_2020: 0,
        investment_2021: 0,
        investment_2022: 0,
        investment_2023: 0,
        investment_total: 0,
      });
    }
  }
};
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }
</style>
