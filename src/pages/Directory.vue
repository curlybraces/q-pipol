<template>
  <q-page padding>
    <q-table
      title="Directory"
      :data="directory"
      :columns="columns"
      row-key="name"
      color="amber"
      :filter="filter"
      :loading="!directoryDownloaded"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.abbr }}</q-td>
          <q-td key="head" :props="props">
            {{ props.row.head }}
            <div class="my-table-details">
              {{ props.row.headPosition }}<br />
              {{ props.row.headContactNumber }} / {{ props.row.headEmail }}
            </div>
          </q-td>
          <q-td key="main" :props="props">
            {{ props.row.main }}
            <div class="my-table-details">
              {{ props.row.mainPosition }}<br />
              {{ props.row.mainContactNumber }} / {{ props.row.headEmail }}
            </div>
          </q-td>
          <q-td key="alt1" :props="props">
            {{ props.row.alt1 }}
            <div class="my-table-details">
              {{ props.row.alt1Position }}<br />
              {{ props.row.alt1ContactNumber }} / {{ props.row.alt1Email }}
            </div>
          </q-td>
          <q-td key="alt2" :props="props">
            {{ props.row.alt2 }}
            <div class="my-table-details">
              {{ props.row.alt2Position }}<br />
              {{ props.row.alt2ContactNumber }} / {{ props.row.alt2Email }}
            </div>
          </q-td>
          <q-td key="submission" :props="props">
            {{ props.row.submission }}
          </q-td>
          <q-td>
            <div class="text-center">
              <q-btn flat dense round color="primary" size="sm" icon="edit" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PageDirectory",
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Operating Unit",
          align: "left",
          field: row => row.abbr,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "head",
          align: "center",
          label: "Head of Agency",
          field: "head",
          sortable: true
        },
        {
          name: "main",
          align: "center",
          label: "Main Focal",
          field: "main",
          sortable: true
        },
        {
          name: "alt1",
          align: "center",
          label: "Alternate Focal 1",
          field: "alt1"
        },
        {
          name: "alt2",
          align: "center",
          label: "Alternate Focal 2",
          field: "alt2"
        },
        { name: "submission", label: "Submission", field: "sodium" },
        {
          name: "calcium",
          label: "Actions",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ]
    };
  },
  computed: {
    ...mapState("directory", ["directory", "directoryDownloaded"])
  }
};
</script>

<style scoped>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
