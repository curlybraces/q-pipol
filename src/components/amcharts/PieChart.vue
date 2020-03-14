<template>
  <div class="hello" ref="chartdiv"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default {
  name: 'PieChart',
  props: ['data', 'chartTitle'],
  data() {
    return {
      chart: {},
      xData: '',
      yData: '',
      xAxis: '',
      yAxis: ''
    };
  },
  methods: {
    createChart() {
      const config = {
        series: [
          {
            type: 'PieSeries',
            dataFields: {
              value: 'litres',
              category: 'country'
            }
          }
        ],
        data: this.$props.data,
        legend: {},
        titles: [
          {
            text: this.$props.chartTitle,
            marginBottom: 30,
            fontSize: 25
          }
        ],
        exporting: {
          menu: {}
        }
      };

      const chart = am4core.createFromConfig(
        config,
        this.$refs.chartdiv,
        am4charts.PieChart
      );

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
