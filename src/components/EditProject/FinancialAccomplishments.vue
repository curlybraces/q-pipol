<template>
  <card-component title="Financial Accomplishments In exact amount in PhP">
    <p>Not Applicable (For PAPs not for funding in the GAA)</p>

    <template v-slot:content>
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
export default {
  name: "FinancialAccomplishments",
  data() {
    return {};
  }
};
</script>
