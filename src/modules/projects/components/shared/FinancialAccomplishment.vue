<template>
  <q-markup-table flat bordered separator="cell" class="col">
    <thead>
      <th style="width:25%">Year</th>
      <th style="width:25%">NEP</th>
      <th style="width:25%">GAA</th>
      <th style="width:25%">Disbursement</th>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">2017</td>
        <td class="text-right">
          <money-input v-model="nep_2017" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2017" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2017" />
        </td>
      </tr>
      <tr>
        <td class="text-center">2018</td>
        <td class="text-right">
          <money-input v-model="nep_2018" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2018" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2018" />
        </td>
      </tr>
      <tr>
        <td class="text-center">2019</td>
        <td class="text-right">
          <money-input v-model="nep_2019" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2019" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2019" />
        </td>
      </tr>
      <tr>
        <td class="text-center">2020</td>
        <td class="text-right">
          <money-input v-model="nep_2020" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2020" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2020" />
        </td>
      </tr>
      <tr>
        <td class="text-center">2021</td>
        <td class="text-right">
          <money-input v-model="nep_2021" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2021" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2021" />
        </td>
      </tr>
      <tr>
        <td class="text-center">2022</td>
        <td class="text-right">
          <money-input v-model="nep_2022" />
        </td>
        <td class="text-right">
          <money-input v-model="gaa_2022" />
        </td>
        <td class="text-right">
          <money-input v-model="disbursement_2022" />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Total</th>
        <th class="text-right">{{ nep_total.toLocaleString() }}</th>
        <th class="text-right">{{ gaa_total.toLocaleString() }}</th>
        <th class="text-right">{{ disbursement_total.toLocaleString() }}</th>
      </tr>
    </tfoot>
  </q-markup-table>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'money-input': () => import('../../../ui/form-inputs/MoneyInput.vue')
  },
  name: 'FinancialAccomplishment',
  computed: {
    ...mapFields('project', [
      'project.nep_2017',
      'project.nep_2018',
      'project.nep_2019',
      'project.nep_2020',
      'project.nep_2021',
      'project.nep_2022',
      'project.nep_2023',
      'project.gaa_2017',
      'project.gaa_2018',
      'project.gaa_2019',
      'project.gaa_2020',
      'project.gaa_2021',
      'project.gaa_2022',
      'project.disbursement_2017',
      'project.disbursement_2018',
      'project.disbursement_2019',
      'project.disbursement_2020',
      'project.disbursement_2021',
      'project.disbursement_2022'
    ]),
    ...mapGetters('project', ['nep_total', 'gaa_total', 'disbursement_total'])
  },
  nepTotal: {
    get() {
      return this.nep_total;
    },
    set(val) {
      console.log(val);
    }
  }
};
</script>
