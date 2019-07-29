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
        <q-space />
        <q-btn
          flat
          round
          dense
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
      tableTitle: "Projects",
      columns: [
        {
          name: "pipol_code",
          required: true,
          label: "PIPOL Code",
          align: "left",
          field: "pipol_code",
          sortable: true
        },
        {
          name: "title",
          align: "center",
          label: "Title",
          field: "title",
          sortable: true
        },
        {
          name: "spatial_coverage",
          label: "Spatial Coverage",
          field: "spatial_coverage",
          sortable: true
        },
        {
          name: "pdp_chapter",
          label: "Main PDP Chapter",
          field: "pdp_chapter",
          sortable: true
        },
        {
          name: "main_funding_source",
          label: "Main Funding Source",
          field: "main_funding_source",
          sortable: true
        },
        {
          name: "categorization",
          label: "Categorization",
          field: "categorization",
          sortable: true
        },
        {
          name: "action",
          label: "Action"
        }
      ],

      data: [
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        },
        {
          pipol_code: "Frozen Yogurt",
          title: "Ice cream sandwich",
          spatial_coverage: 159,
          pdp_chapter: 6.0,
          main_funding_source: 24,
          categorization: 4.0
        }
      ]
    };
  }
};
</script>

<style></style>
