<template>
  <q-markup-table v-if="showIf">
    <thead>
      <tr>
        <th>Cost Item</th>
        <th>2017</th>
        <th>2018</th>
        <th>2019</th>
        <th>2020</th>
        <th>2021</th>
        <th>2022</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="technical_readinesses.includes(5)">
        <td>Feasibility Study</td>
        <td>
          <money-input v-model="fs_target_2017" />
        </td>
        <td>
          <money-input v-model="fs_target_2018" />
        </td>
        <td>
          <money-input v-model="fs_target_2019" />
        </td>
        <td>
          <money-input v-model="fs_target_2020" />
        </td>
        <td>
          <money-input v-model="fs_target_2021" />
        </td>
        <td>
          <money-input v-model="fs_target_2022" />
        </td>
      </tr>
      <tr v-if="technical_readinesses.includes(6)">
        <td>Right-of-Way Cost</td>
        <td>
          <money-input v-model="row_target_2017" />
        </td>
        <td>
          <money-input v-model="row_target_2018" />
        </td>
        <td>
          <money-input v-model="row_target_2019" />
        </td>
        <td>
          <money-input v-model="row_target_2020" />
        </td>
        <td>
          <money-input v-model="row_target_2021" />
        </td>
        <td>
          <money-input v-model="row_target_2022" />
        </td>
      </tr>
      <tr v-if="technical_readinesses.includes(6)">
        <td>Right-of-Way Affected Families</td>
        <td>
          <number-input v-model="row_affected_2017" />
        </td>
        <td>
          <number-input v-model="row_affected_2018" />
        </td>
        <td>
          <number-input v-model="row_affected_2019" />
        </td>
        <td>
          <number-input v-model="row_affected_2020" />
        </td>
        <td>
          <number-input v-model="row_affected_2021" />
        </td>
        <td>
          <number-input v-model="row_affected_2022" />
        </td>
      </tr>
      <tr v-if="technical_readinesses.includes(7)">
        <td>Resettlement Action Plan Cost</td>
        <td>
          <money-input v-model="rap_target_2017" />
        </td>
        <td>
          <money-input v-model="rap_target_2018" />
        </td>
        <td>
          <money-input v-model="rap_target_2019" />
        </td>
        <td>
          <money-input v-model="rap_target_2020" />
        </td>
        <td>
          <money-input v-model="rap_target_2021" />
        </td>
        <td>
          <money-input v-model="rap_target_2022" />
        </td>
      </tr>
      <tr v-if="technical_readinesses.includes(7)">
        <td>Resettlement Action Plan Affected Families</td>
        <td>
          <number-input v-model="rap_affected_2017" />
        </td>
        <td>
          <number-input v-model="rap_affected_2018" />
        </td>
        <td>
          <number-input v-model="rap_affected_2019" />
        </td>
        <td>
          <number-input v-model="rap_affected_2020" />
        </td>
        <td>
          <number-input v-model="rap_affected_2021" />
        </td>
        <td>
          <number-input v-model="rap_affected_2022" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'money-input': () => import('../../components/FormInputs/MoneyInput.vue'),
    'number-input': () => import('../../components/FormInputs/NumberInput.vue')
  },
  name: 'OtherCosts',
  computed: {
    ...mapFields('project', [
      'project.fs_target_2017',
      'project.fs_target_2018',
      'project.fs_target_2019',
      'project.fs_target_2020',
      'project.fs_target_2021',
      'project.fs_target_2022',
      'project.fs_target_total',
      'project.row_target_2017',
      'project.row_target_2018',
      'project.row_target_2019',
      'project.row_target_2020',
      'project.row_target_2021',
      'project.row_target_2022',
      'project.row_target_total',
      'project.row_affected_2017',
      'project.row_affected_2018',
      'project.row_affected_2019',
      'project.row_affected_2020',
      'project.row_affected_2021',
      'project.row_affected_2022',
      'project.rap_target_2017',
      'project.rap_target_2018',
      'project.rap_target_2019',
      'project.rap_target_2020',
      'project.rap_target_2021',
      'project.rap_target_2022',
      'project.rap_target_total',
      'project.rap_affected_2017',
      'project.rap_affected_2018',
      'project.rap_affected_2019',
      'project.rap_affected_2020',
      'project.rap_affected_2021',
      'project.rap_affected_2022',
      'project.technical_readinesses'
    ]),
    showIf() {
      return (
        this.technical_readinesses.includes(5) ||
        this.technical_readinesses.includes(6) ||
        this.technical_readinesses.includes(7)
      );
    }
  }
};
</script>
