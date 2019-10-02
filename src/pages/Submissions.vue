<template>
  <q-page padding>
    <q-card>
      <q-list separator>
        <q-item-label header class="text-uppercase">Status of Submissions</q-item-label>
        <q-btn flat @click="showAddSubmission = true" label="Add" />
        <q-item
          v-for="item in submissions"
          :key="item.id">
          <q-item-section avatar>
            <q-btn
              flat
              size="12px"
              round
              dense
              icon="edit"
              @click="editSubmission = !editSubmission" />
          </q-item-section>
          <q-item-section class="col-2">
            {{ item.operatingUnit }}
          </q-item-section>
          <q-item-section>
            <q-option-group
              type="checkbox"
              :options="paps"
              :value="item.submitted"
              inline/>
          </q-item-section>
          <q-dialog v-model="editSubmission">
            <q-card>
              <add-edit-submission :submission="item" />
            </q-card>
          </q-dialog>
        </q-item>
      </q-list>

      <q-dialog v-model="editSubmission"></q-dialog>

      <q-dialog v-model="showAddSubmission">
        <add-edit-submission :submission="submission"> </add-edit-submission>
      </q-dialog>
    </q-card>
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
      submission: {
        operatingUnit: "",
        submitted: []
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
          label: "SAAD",
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
