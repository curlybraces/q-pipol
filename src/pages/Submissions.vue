<template>
  <q-page padding>
    <q-table
      title="Submissions"
      :columns="columns"
      :data="submissions"
      :filter="filter"
      key="name"
      :rows-per-page-options="[10, 25, 50, 100]"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input borderless placeholder="Search" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="operatingUnit" :props="props">
            <q-btn
              flat
              dense
              round
              color="primary"
              size="sm"
              icon="edit"
              @click="showEditSubmission = true"
            />
            {{ props.row.operatingUnit }}
          </q-td>
          <q-td key="riceProgram" :props="props">
            <q-checkbox :value="props.row.riceProgram" />
          </q-td>
          <q-td key="cornProgram" :props="props">
            <q-checkbox :value="props.row.cornProgram" />
          </q-td>
          <q-td key="hvcProgram" :props="props">
            <q-checkbox :value="props.row.hvcProgram" />
          </q-td>
          <q-td key="livestockProgram" :props="props">
            <q-checkbox :value="props.row.livestockProgram" />
          </q-td>
          <q-td key="fisheriesProgram" :props="props">
            <q-checkbox :value="props.row.fisheriesProgram" />
          </q-td>
          <q-td key="organicProgram" :props="props">
            <q-checkbox :value="props.row.organicProgram" />
          </q-td>
          <q-td key="halalProgram" :props="props">
            <q-checkbox :value="props.row.halalProgram" />
          </q-td>
          <q-td key="fmrProgram" :props="props">
            <q-checkbox :value="props.row.halalProgram" />
          </q-td>
          <q-td key="saadProgram" :props="props">
            <q-checkbox :value="props.row.saadProgram" />
          </q-td>
          <q-td key="prdpProgram" :props="props">
            <q-checkbox :value="props.row.prdpProgram" />
          </q-td>
          <q-td key="projects" :props="props">
            <q-checkbox :value="props.row.projects" />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:top-left>
        <q-btn
          color="primary"
          label="Add"
          @click="showAddSubmission = !showAddSubmission"
        ></q-btn>
      </template>
    </q-table>

    <q-dialog v-model="showAddSubmission">
      <add-edit-submission :submission="submission"> </add-edit-submission>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    "add-edit-submission": () =>
      import("../components/Submissions/AddEditSubmission")
  },
  name: "PageSubmissions",
  data() {
    return {
      filter: "",
      showAddSubmission: false,
      showEditSubmission: false,
      pagination: {
        rowsPerPage: 10
      },
      submission: {
        operatingUnit: "",
        riceProgram: false,
        cornProgram: false,
        hvcProgram: false,
        livestockProgram: false,
        fisheriesProgram: false,
        organicProgram: false,
        halalProgram: false,
        fmrProgram: false,
        saadProgram: false,
        prdpProgram: false,
        projects: false
      },
      columns: [
        {
          name: "operatingUnit",
          label: "Operating Unit",
          align: "left",
          field: "operatingUnit",
          sortable: true
        },
        {
          name: "riceProgram",
          label: "Rice Program",
          align: "center",
          field: "riceProgram"
        },
        {
          name: "cornProgram",
          label: "Corn",
          align: "center",
          field: "cornProgram"
        },
        {
          name: "hvcProgram",
          label: "HVCDP",
          align: "center",
          field: "hvcProgram"
        },
        {
          name: "livestockProgram",
          label: "Livestock",
          align: "center",
          field: "livestockProgram"
        },
        {
          name: "fisheriesProgram",
          label: "Fisheries",
          align: "center",
          field: "fisheriesProgram"
        },
        {
          name: "organicProgram",
          label: "Organic",
          align: "center",
          field: "organicProgram"
        },
        {
          name: "halalProgram",
          label: "Halal",
          align: "center",
          field: "halalProgram"
        },
        {
          name: "fmrProgram",
          label: "FMR",
          align: "center",
          field: "fmrProgram"
        },
        {
          name: "saadProgram",
          label: "SAAD",
          align: "center",
          field: "saadProgram"
        },
        {
          name: "prdpProgram",
          label: "PRDP",
          align: "center",
          field: "prdpProgram"
        },
        {
          name: "projects",
          label: "Projects",
          align: "center",
          field: "projects"
        }
      ]
    };
  },
  computed: {
    ...mapState("submissions", ["submissions"])
  }
};
</script>
