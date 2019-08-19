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
              <q-input
                dense
                borderless
                v-model="form.nep_2017"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2017"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2017"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">2018</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                v-model="form.nep_2018"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2018"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2018"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">2019</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                v-model="form.nep_2019"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2019"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2019"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">2020</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                v-model="form.nep_2020"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2020"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2020"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">2021</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                v-model="form.nep_2021"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2021"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2021"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">2022</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                v-model="form.nep_2022"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.gaa_2022"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                flat
                v-model="form.disbursement_2022"
                input-class="text-right"
              />
            </td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-right">
              <q-input
                dense
                borderless
                readonly
                flat
                v-model="gaa_total"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                readonly
                flat
                v-model="nep_total"
                input-class="text-right"
              />
            </td>
            <td class="text-right">
              <q-input
                dense
                borderless
                readonly
                flat
                v-model="disbursement_total"
                input-class="text-right"
              />
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
      form: {
        gaa_2017: 0,
        gaa_2018: 0,
        gaa_2019: 0,
        gaa_2020: 0,
        gaa_2021: 0,
        gaa_2022: 0,
        nep_2017: 0,
        nep_2018: 0,
        nep_2019: 0,
        nep_2020: 0,
        nep_2021: 0,
        nep_2022: 0,
        disbursement_2017: 0,
        disbursement_2018: 0,
        disbursement_2019: 0,
        disbursement_2020: 0,
        disbursement_2021: 0,
        disbursement_2022: 0
      }
    };
  },
  computed: {
    gaa_total() {
      let gaa_total =
        this.form.gaa_2017 +
        this.form.gaa_2018 +
        this.form.gaa_2019 +
        this.form.gaa_2020 +
        this.form.gaa_2021 +
        this.form.gaa_2022;
      return gaa_total;
    },
    nep_total() {
      let nep_total = 0;
      return nep_total;
    },
    disbursement_total() {
      return null;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.form);
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
