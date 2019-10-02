<template>
  <q-page padding>
    <q-table
      title="Submissions (under Construction)"
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
            {{ props.row.operatingUnit }}
          </q-td>
          <q-td>
            <q-option-group
              readonly
              :options="paps"
              type="checkbox"
              :value="props.row.submitted"
              inline></q-option-group>
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

    <!-- <q-markup-table>
      <thead>
        <tr>
          <th>Operating Unit</th>
          <th>Rice</th>
          <th>Corn</th>
          <th>HVCDP</th>
          <th>Livestock</th>
          <th>Fisheries</th>
          <th>Organic</th>
          <th>Halal</th>
          <th>FMRDP</th>
          <th>SAAD</th>
          <th>PRDP</th>
          <th>Projects</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in submissions" :key="item.id">
          <td>
            {{ item.operatingUnit }}
          </td>
          <td>
            <q-checkbox readonly :value="item.riceProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.cornProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.hvcProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.livestockProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.fisheriesProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.organicProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.halalProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.fmrProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.saadProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.prdpProgram" />
          </td>
          <td>
            <q-checkbox readonly :value="item.projects" />
          </td>
        </tr>
      </tbody>
    </q-markup-table> -->

    <q-dialog v-model="editSubmission"></q-dialog>

    <q-dialog v-model="showAddSubmission">
      <add-edit-submission :submission="submission"> </add-edit-submission>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

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
      editSubmission: false,
      pagination: {
        rowsPerPage: 10
      },
      submission: {},
      columns: [
        {
          name: "operatingUnit",
          label: "Operating Unit",
          align: "left",
          field: "operatingUnit",
          sortable: true
        },
        {
          name: "submitted",
          label: "Submitted",
          align: "center",
          field: "submitted"
        }
      ],
      paps: [
        {
          label: "Rice",
          value: "rice"
        },
        {
          label: "Corn",
          value: "corn"
        },
        {
          label: "Livestock",
          value: "livestock"
        },
        {
          label: "HVCDP",
          value: "hvcdp"
        },
        {
          label: "Fisheries",
          value: "fisheries"
        },
        {
          label: "NOAP",
          value: "organic"
        },
        {
          label: "Halal",
          value: "halal"
        },
        {
          label: "FMRDP",
          value: "fmrdp"
        },
        {
          label: "Special Area for Agricultural Development",
          value: "saad"
        },
        {
          label: "Other Programs",
          value: "otherPrograms"
        },
        {
          label: "Other Projects",
          value: "projects"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("submissions", ["submissions"])
  }
};
</script>
