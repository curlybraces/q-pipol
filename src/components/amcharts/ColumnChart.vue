<template>
  <div style="height:500px" ref="chartdiv" />
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "ColumnChart",
  props: ["data", "category", "value", "categoryTitle", "seriesName"],
  data() {
    return {
      chart: []
    };
  },
  methods: {
    createChart() {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.$props.category; // this is required
      categoryAxis.title.text = "Countries";

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.dataFields.value = this.$props.value;
      valueAxis.title.text = this.$props.categoryTitle;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.name = this.$props.seriesName;
      series.dataFields.valueY = "litres";
      series.dataFields.categoryX = this.$props.category;

      // add legend
      chart.legend = new am4charts.Legend();

      chart.data = this.$props.data;

      this.chart = chart;
    }
  },
  mounted() {
    this.createChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
