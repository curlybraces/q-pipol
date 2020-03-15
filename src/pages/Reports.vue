<template>
  <q-page>
    <!--    <page-breadcrumbs :breadcrumbs="breadcrumbs" />-->

    <div class="q-pa-sm q-gutter-y-md">
      <q-card class="q-pa-sm">
        <pie-chart :data="chartData" />
      </q-card>
      <q-card class="q-pa-sm">
        <column-chart
          :data="chartData"
          category="country"
          value="litres"
          categoryTitle="Liters sold (M)"
          seriesName="Sales"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PieChart from '../components/amcharts/PieChart';
// import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ColumnChart from '../components/amcharts/ColumnChart';

export default {
  components: { ColumnChart, PieChart },
  // components: { ColumnChart, PageBreadcrumbs, PieChart },
  name: 'PageReports',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Reports'
        }
      ],
      chartData: [
        {
          country: 'Lithuania',
          litres: 501.9
        },
        {
          country: 'Czech Republic',
          litres: 301.9
        },
        {
          country: 'Ireland',
          litres: 201.1
        },
        {
          country: 'Germany',
          litres: 165.8
        },
        {
          country: 'Australia',
          litres: 139.9
        },
        {
          country: 'Austria',
          litres: 128.3
        },
        {
          country: 'UK',
          litres: 99
        },
        {
          country: 'Belgium',
          litres: 60
        },
        {
          country: 'The Netherlands',
          litres: 50
        }
      ]
    };
  }
};
</script>
