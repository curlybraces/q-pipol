<template>
  <q-page padding>
    <p>View Programs</p>

    <q-table
      :title="tableTitle"
      :data="data"
      :columns="columns"
      row-key="id"
      :grid="$q.screen.xs"
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

    <fab-component link="/programs/add-activities" />
  </q-page>
</template>

<script>
import FabComponent from "../../components/UI/FabComponent";

export default {
  components: { FabComponent },
  name: "PageViewActivities",
  data() {
    return {
      tableTitle: "Programs",
      data: [],
      columns: [
        {
          name: "asc",
          label: "PREXC Activities",
          field: "name",
          align: "left"
        }
      ]
    };
  },
  methods: {
    loadPrexcActivities() {
      this.$axios
        .get("/prexc_activities")
        .then(res => {
          this.data = res.data;
        })
        .catch(e => {
          console.log("Error: ", e.message);
        });
    }
  },
  mounted() {
    this.loadPrexcActivities();
  }
};
</script>
