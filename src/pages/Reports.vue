<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="q-pa-sm">
      <q-card class="q-pa-sm">
        <pie-chart :data="chartData" />

        <line-chart :data="chartData" title="Column Chart" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PieChart from "../components/amcharts/PieChart";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import LineChart from "../components/amcharts/LineChart";
export default {
  name: "PageReports",
  components: { LineChart, PageBreadcrumbs, PieChart },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Reports"
        }
      ],
      chartData: [
        {
          country: "Lithuania",
          litres: 501.9
        },
        {
          country: "Czech Republic",
          litres: 301.9
        },
        {
          country: "Ireland",
          litres: 201.1
        },
        {
          country: "Germany",
          litres: 165.8
        },
        {
          country: "Australia",
          litres: 139.9
        },
        {
          country: "Austria",
          litres: 128.3
        },
        {
          country: "UK",
          litres: 99
        },
        {
          country: "Belgium",
          litres: 60
        },
        {
          country: "The Netherlands",
          litres: 50
        }
      ]
    };
  }
};
</script>
