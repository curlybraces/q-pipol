<template>
  <modal title="Financial Accomplishment" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <q-banner dense class="bg-grey-3 q-mb-md">
        <template v-slot:avatar>
          <q-icon color="primary" name="info" />
        </template>
        Applicable only to projects funded <strong>solely</strong> through GAA.
        Save before closing this window to avoid data loss.
      </q-banner>
      <q-markup-table separator="cell" flat bordered dense>
        <thead>
          <tr>
            <th class="text-left col">Year</th>
            <th class="text-center col">NEP</th>
            <th class="text-center col">GAA</th>
            <th class="text-center col">Disbursement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">2017</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2017" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">2018</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2018" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">2019</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2019" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">2020</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2020" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">2021</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2021" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">2022</td>
            <td class="text-right">
              <q-input dense borderless v-model="form.gaa_2022" />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
            <td class="text-right">
              <q-input dense borderless flat />
            </td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-right">
              <q-input dense flat readonly />
            </td>
            <td class="text-right">
              <q-input dense flat readonly />
            </td>
            <td class="text-right">
              <q-input dense flat readonly />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "FinancialAccomplishment",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description);
    }
  }
};
</script>

<style scoped>
th,
td {
  width: 25%;
  padding: 0;
  margin: 0;
}
</style>
