<template>
  <div>
    <q-item-label header>
      Investment Requirements
    </q-item-label>
    <q-markup-table flat bordered separator="cell">
      <thead>
        <th>Investment</th>
        <th>2016</th>
        <th>2017</th>
        <th>2018</th>
        <th>2019</th>
        <th>2020</th>
        <th>2021</th>
        <th>2022</th>
        <th>2023</th>
        <th>Total</th>
      </thead>
      <tbody>
        <tr>
          <td>Total Investment</td>
          <td>
            <money-input v-model="investment_target_2016" />
          </td>
          <td>
            <money-input v-model="investment_target_2017" />
          </td>
          <td>
            <money-input v-model="investment_target_2018" />
          </td>
          <td>
            <money-input v-model="investment_target_2019" />
          </td>
          <td>
            <money-input v-model="investment_target_2020" />
          </td>
          <td>
            <money-input v-model="investment_target_2021" />
          </td>
          <td>
            <money-input v-model="investment_target_2022" />
          </td>
          <td>
            <money-input v-model="investment_target_2023" />
          </td>
          <td>
            <money-input v-model="investment_target_total" />
          </td>
        </tr>
        <tr>
          <td>Infrastructure Investment</td>
          <td>
            <money-input v-model="infrastructure_target_2016" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2017" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2018" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2019" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2020" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2021" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2022" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_2023" />
          </td>
          <td>
            <money-input v-model="infrastructure_target_total" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'money-input': () => import('../../form-inputs/MoneyInput.vue')
  },
  name: 'TargetInvestment',
  computed: {
    ...mapFields('project', [
      'project.investment_target_2016',
      'project.investment_target_2017',
      'project.investment_target_2018',
      'project.investment_target_2019',
      'project.investment_target_2020',
      'project.investment_target_2021',
      'project.investment_target_2022',
      'project.investment_target_2023',
      'project.investment_target_total',
      'project.infrastructure_target_2016',
      'project.infrastructure_target_2017',
      'project.infrastructure_target_2018',
      'project.infrastructure_target_2019',
      'project.infrastructure_target_2020',
      'project.infrastructure_target_2021',
      'project.infrastructure_target_2022',
      'project.infrastructure_target_2023',
      'project.infrastructure_target_total'
    ])
  }
};
</script>
