<template>
  <div>
    <q-item-label header>
      Funding Sources
      <q-icon
        name="edit"
        label="Add Funding Source"
        class="cursor-pointer"
        color="primary"
        @click="showAddFundingSourceDialog = true"
      />
    </q-item-label>
    <q-markup-table flat bordered separator="cell">
      <thead>
        <th>Fund Source</th>
        <th>2016</th>
        <th>2017</th>
        <th>2018</th>
        <th>2019</th>
        <th>2020</th>
        <th>2021</th>
        <th>2022</th>
        <th>2023</th>
        <th>Total</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <template v-if="funding_sources.length">
          <template v-for="(funding_source, index) in funding_sources">
            <funding-source-row
              :funding_source="funding_source"
              :key="index"
              :index="index"
              @deleteRow="deleteThis(index)"
            />
          </template>
        </template>
        <template v-else>
          <tr>
            <th colspan="10">No data to show.</th>
          </tr>
        </template>
      </tbody>
    </q-markup-table>

    <q-dialog
      v-model="showAddFundingSourceDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
    >
      <add-funding-source
        @close="showAddFundingSourceDialog = false"
      ></add-funding-source>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
import { Dialog } from "quasar";

export default {
  components: {
    "funding-source-row": () => import("./Components/FundingSourceRow"),
    "add-funding-source": () => import("./Components/AddFundingSource.vue")
  },
  name: "FundingSources",
  computed: {
    ...mapFields("project", ["project.funding_sources"])
  },
  data() {
    return {
      showAddFundingSourceDialog: false,
      newFundingSource: {
        id: "",
        target_2016: "",
        target_2017: "",
        target_2018: "",
        target_2019: "",
        target_2020: "",
        target_2021: "",
        target_2022: "",
        target_2023: "",
        target_total: ""
      }
    };
  },
  methods: {
    ...mapMutations("project", [
      "addFundingSourceRow",
      "deleteFundingSourceRow",
      "updateFundingSourceRow"
    ]),
    deleteThis(index) {
      Dialog.create({
        title: "Delete",
        message: "Are you sure you want to delete this row?",
        cancel: true
      }).onOk(() => this.deleteFundingSourceRow(index));
    },
    addFundingSource() {
      this.addFundingSourceRow(this.newFundingSource);
    }
  }
};
</script>
