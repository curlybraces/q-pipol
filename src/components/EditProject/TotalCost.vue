<template>
  <card-component title="Project Cost (in absolute PhP)">
    <template v-slot:content>
      <select-component label="Main Funding Source"></select-component>

      <select-component label="ODA Funding Institutions"></select-component>

      <input-component label="Others"></input-component>

      <select-component
        label="Mode of Implementation/Procurement"
      ></select-component>

      <q-markup-table
        class="my-sticky-column-table"
        separator="cell"
        flat
        bordered
      >
        <thead>
          <tr>
            <th class="text-left">Year</th>
            <th class="text-right">2016 and Prior</th>
            <th class="text-right">2017</th>
            <th class="text-right">2018</th>
            <th class="text-right">2019</th>
            <th class="text-right">2020</th>
            <th class="text-right">2021</th>
            <th class="text-right">2022</th>
            <th class="text-right">2023 and Beyond</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              NG-Local
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              NG-ODA Loan
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              NG-ODA Grant
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              GOCC/GFIs
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              LGUs
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              Private Sector
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              Others
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
            <td class="text-left">
              Total
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
            <td class="text-right">
              <table-input-component></table-input-component>
            </td>
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
import InputComponent from "../InputComponent";
import TableInputComponent from "../TableInputComponent";
import SelectComponent from "../SelectComponent";
import CardComponent from "../CardComponent";

export default {
  components: {
    CardComponent,
    SelectComponent,
    InputComponent,
    TableInputComponent
  },
  name: "TotalCost",
  data() {
    return {};
  }
};
</script>
