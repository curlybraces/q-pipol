<template>
  <q-page>
    <div class="q-pa-sm q-gutter-y-md">
      <q-item-label header
        >Sample Treemap: Rice Production in 2014</q-item-label
      >
      <div id="chartdiv" ref="chartdiv" style="height:600px;"></div>
    </div>
  </q-page>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default {
  components: {},
  name: 'PageReports',
  data() {
    return {
      treeData: [
        {
          name: 'ARMM',
          children: [
            {
              province: 'Basilan',
              production: '3,799.00'
            },
            {
              province: 'Lanao del Sur',
              production: '164,117'
            },
            {
              province: 'Maguindanao',
              production: '386,534'
            },
            {
              province: 'Sulu',
              production: '2,050'
            },
            {
              province: 'Tawi-tawi',
              production: '649'
            }
          ]
        },
        {
          name: 'Bicol Region',
          children: [
            {
              province: 'Albay',
              production: '225,700.00'
            },
            {
              province: 'Camarines Norte',
              production: '95,784'
            },
            {
              province: 'Camarines Sur',
              production: '583,797'
            },
            {
              province: 'Catanduanes',
              production: '35,452'
            },
            {
              province: 'Masbate',
              production: '180,173'
            },
            {
              province: 'Sorsogon',
              production: '137,241'
            }
          ]
        },
        {
          name: 'Cagayan Valley',
          children: [
            {
              province: 'Batanes',
              production: '86'
            },
            {
              province: 'Cagayan',
              production: '895,580'
            },
            {
              province: 'Isabela',
              production: '1,277,623'
            },
            {
              province: 'Nueva Vizcaya',
              production: '252,896'
            },
            {
              province: 'Quirino',
              production: '88,749'
            }
          ]
        },
        {
          name: 'Calabarzon',
          children: [
            {
              province: 'Batangas',
              production: '46,375'
            },
            {
              province: 'Cavite',
              production: '46,280'
            },
            {
              province: 'Laguna',
              production: '130,904'
            },
            {
              province: 'Quezon',
              production: '154,780'
            },
            {
              province: 'Rizal',
              production: '27,243'
            }
          ]
        },
        {
          name: 'CAR',
          children: [
            {
              province: 'Abra',
              production: '75,500.00'
            },
            {
              province: 'Apayao',
              production: '101,158.00'
            },
            {
              province: 'Benguet',
              production: '17,355'
            },
            {
              province: 'Ifugao',
              production: '63,076'
            },
            {
              province: 'Kalinga',
              production: '176,529'
            },
            {
              province: 'Mountain Province',
              production: '18,991'
            }
          ]
        },
        {
          name: 'Caraga',
          children: [
            {
              province: 'Agusan del Norte',
              production: '99,786.00'
            },
            {
              province: 'Agusan del Sur',
              production: '292,019.00'
            },
            {
              province: 'Dinagat Islands',
              production: '6,507'
            },
            {
              province: 'Surigao del Norte',
              production: '63,694'
            },
            {
              province: 'Surigao del Sur',
              production: '112,493'
            }
          ]
        },
        {
          name: 'Central Luzon',
          children: [
            {
              province: 'Aurora',
              production: '94,785.00'
            },
            {
              province: 'Bataan',
              production: '155,056.00'
            },
            {
              province: 'Bulacan',
              production: '372,110'
            },
            {
              province: 'Nueva Ecija',
              production: '1,930,996'
            },
            {
              province: 'Pampanga',
              production: '433,106'
            },
            {
              province: 'Tarlac',
              production: '638,906'
            },
            {
              province: 'Zambales',
              production: '140,191'
            }
          ]
        },
        {
          name: 'Central Visayas',
          children: [
            {
              province: 'Bohol',
              production: '255,053'
            },
            {
              province: 'Cebu',
              production: '16,765'
            },
            {
              province: 'Negros Oriental',
              production: '64,612'
            },
            {
              province: 'Siquijor',
              production: '2,392'
            }
          ]
        },
        {
          name: 'Davao Region',
          children: [
            {
              province: 'Compostela Valley',
              production: '109,335'
            },
            {
              province: 'Davao del Norte',
              production: '123,928'
            },
            {
              province: 'Davao del Sur (w/ Davao City)',
              production: '153,799'
            },
            {
              province: 'Davao Oriental',
              production: '65,205'
            }
          ]
        },
        {
          name: 'Eastern Visayas',
          children: [
            {
              province: 'Biliran',
              production: '66,343'
            },
            {
              province: 'Eastern Samar',
              production: '63,605'
            },
            {
              province: 'Leyte',
              production: '502,146'
            },
            {
              province: 'Northern Samar',
              production: '117,965'
            },
            {
              province: 'Samar (Western Samar)',
              production: '139,965'
            },
            {
              province: 'Southern Leyte',
              production: '92,572'
            }
          ]
        },
        {
          name: 'Ilocos Region',
          children: [
            {
              province: 'Ilocos Norte',
              production: '308,317'
            },
            {
              province: 'Ilocos Sur',
              production: '205,302'
            },
            {
              province: 'La Union',
              production: '168,885'
            },
            {
              province: 'Pangasinan',
              production: '1,113,725'
            }
          ]
        },
        {
          name: 'Mimaropa',
          children: [
            {
              province: 'Marinduque',
              production: '15,069'
            },
            {
              province: 'Occidental Mindoro',
              production: '346,525'
            },
            {
              province: 'Oriental Mindoro',
              production: '413,508'
            },
            {
              province: 'Palawan',
              production: '274,150'
            },
            {
              province: 'Romblon',
              production: '32,626'
            }
          ]
        },
        {
          name: 'Northern Mindanao',
          children: [
            {
              province: 'Bukidnon',
              production: '426,641'
            },
            {
              province: 'Camiguin',
              production: '2,574'
            },
            {
              province: 'Lanao del Norte',
              production: '171,770'
            },
            {
              province: 'Misamis Occidental',
              production: '87,203'
            },
            {
              province: 'Misamis Oriental',
              production: '25,576'
            }
          ]
        },
        {
          name: 'Soccsksargen',
          children: [
            {
              province: 'North Cotabato',
              production: '530,029'
            },
            {
              province: 'Sarangani',
              production: '49,432'
            },
            {
              province: 'South Cotabato',
              production: '344,892'
            },
            {
              province: 'Sultan Kudarat',
              production: '440,496'
            }
          ]
        },
        {
          name: 'Western Visayas',
          children: [
            {
              province: 'Aklan',
              production: '104,712.00'
            },
            {
              province: 'Antique',
              production: '280,084.00'
            },
            {
              province: 'Capiz',
              production: '291,158'
            },
            {
              province: 'Guimaras',
              production: '51,202'
            },
            {
              province: 'Iloilo',
              production: '846,636'
            },
            {
              province: 'Negros Occidental',
              production: '478,782'
            }
          ]
        },
        {
          name: 'Zamboanga Peninsula',
          children: [
            {
              province: 'Zamboanga del Norte',
              production: '114,392'
            },
            {
              province: 'Zamboanga del Sur (w/ Zambo City)',
              production: '368,850'
            },
            {
              province: 'Zamboanga Sibugay',
              production: '173,535'
            }
          ]
        }
      ],
      chart: {}
    };
  },
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = this.treeData;
    chart.dataFields.value = 'production';
    chart.dataFields.name = 'province';
    chart.dataFields.children = 'children';

    /* Create top-level series */
    var level1 = chart.seriesTemplates.create('0');
    var level1_column = level1.columns.template;
    level1_column.fillOpacity = 0;
    level1_column.strokeOpacity = 0;

    /* Create second-level series */
    var level2 = chart.seriesTemplates.create('1');
    var level2_column = level2.columns.template;
    level2_column.column.cornerRadius(10, 10, 10, 10);
    level2_column.fillOpacity = 0.8;
    level2_column.stroke = am4core.color('#fff');
    level2_column.strokeWidth = 5;
    level2_column.strokeOpacity = 1;

    var level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
    level2_bullet.locationY = 0.5;
    level2_bullet.locationX = 0.5;
    level2_bullet.label.text = '{name}';
    level2_bullet.label.fill = am4core.color('#fff');

    chart.layoutAlgorithm = chart.binaryTree;
    chart.maxLevels = 2;

    this.chart = chart;
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
