<template>
  <card-component title="Physical Accomplishments">
    <template v-slot:content>
      <input-component
        v-if="
          project.categorization_id == 1 ||
            project.categorization_id == 3 ||
            project.categorization_id == 4
        "
        label="UACS Code"
        :value="project.uacs_code"
      >
      </input-component>

      <input-component
        label="Updates"
        type="textarea"
        :value="project.updates"
      ></input-component>

      <date-component label="As of" :value="project.as_of"> </date-component>

      <q-markup-table
        class="my-sticky-column-table"
        separator="cell"
        flat
        bordered
      >
        <thead>
          <tr>
            <th class="text-left">Year</th>
            <th class="text-right">Amount Included in the NEP</th>
            <th class="text-right">Amount Allocated in the Budget/GAA</th>
            <th class="text-right">Actual Amount Disbursed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">2017</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2018</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2019</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2020</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2021</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">2022</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </template>
  </card-component>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CardComponent from "../UI/CardComponent";
import InputComponent from "../Form/InputComponent";
import DateComponent from "../Form/DateComponent";

export default {
  components: {
    CardComponent,
    DateComponent,
    InputComponent
  },
  name: "PhysicalAccomplishments",
  data() {
    return {};
  },
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown", ["categorizations"])
  },
  methods: {
    ...mapMutations("projects", [
      "setCategorizationId",
      "setUacsCode",
      "setUpdates",
      "setAsOf"
    ]),
    ...mapActions("dropdown", ["loadCategorizations"])
  },
  mounted() {
    this.loadCategorizations();
  }
};
</script>
