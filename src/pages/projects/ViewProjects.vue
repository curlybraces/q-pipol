<template>
  <q-page padding>
    <p>View Projects</p>

    <q-table
      :grid="$q.screen.lt.md"
      class="my-sticky-column-table"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">{{ tableTitle }}</div>
        <q-space/>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

    </q-table>

  </q-page>
</template>

<script>
export default {
  name: "PageViewProjects",
  data() {
  	return {
      tableTitle: 'Projects',
      columns: [
        {
          name: 'pipol_code',
          required: true,
          label: 'PIPOL Code',
          align: 'left',
          field: 'pipol_code',
          sortable: true
        },
        {
          name: 'title',
          align: 'center',
          label: 'Title',
          field: 'title',
          sortable: true
        },
        {
          name: 'spatial_coverage',
          label: 'Spatial Coverage',
          field: 'spatial_coverage',
          sortable: true
        },
        {
          name: 'pdp_chapter',
          label: 'Main PDP Chapter',
          field: 'pdp_chapter',
          sortable: true
        },
        {
          name: 'main_funding_source',
          label: 'Main Funding Source',
          field: 'main_funding_source',
          sortable: true
        },
        {
          name: 'categorization',
          label: 'Categorization',
          field: 'categorization',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action'
        }
      ],

      data: [
        {
	      pipol_code: 'Frozen Yogurt',
          title: 'Ice cream sandwich',
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0,
        },
        {

          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  }
};
</script>

<style>

</style>
