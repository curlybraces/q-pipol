<template>
  <q-markup-table dense separator="cell">
    <thead>
      <th>Region</th>
      <th>2016 &amp; Prior</th>
      <th>2017</th>
      <th>2018</th>
      <th>2019</th>
      <th>2020</th>
      <th>2021</th>
      <th>2022</th>
      <th>2023 &amp; Beyond</th>
      <th>Total</th>
    </thead>
    <tbody>
      <tr>
        <td>NCR</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>CAR</td>
        <td><table-input v-model="regional_breakdown.car_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.car_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 1</td>
        <td><table-input v-model="regional_breakdown.r1_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r1_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 2</td>
        <td><table-input v-model="regional_breakdown.r2_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r2_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 3</td>
        <td><table-input v-model="regional_breakdown.r3_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r3_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 4A</td>
        <td><table-input v-model="regional_breakdown.r4a_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4a_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 4B</td>
        <td><table-input v-model="regional_breakdown.r4b_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r4b_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 5</td>
        <td><table-input v-model="regional_breakdown.r5_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.r5_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 6</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 7</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 8</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 9</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 10</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 11</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Region 12</td>
        <td><table-input v-model="regional_breakdown.ncr_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.ncr_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>CARAGA</td>
        <td><table-input v-model="regional_breakdown.caraga_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.caraga_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>ARMM</td>
        <td><table-input v-model="regional_breakdown.armm_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.armm_total" :readonly="true"></table-input></td>
      </tr>
      <tr>
        <td>Total</td>
        <td><table-input v-model="regional_breakdown.total_2016"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2017"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2018"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2019"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2020"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2021"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2022"></table-input></td>
        <td><table-input v-model="regional_breakdown.total_2023"></table-input></td>
        <td><table-input v-model="regional_breakdown.total" :readonly="true"></table-input></td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
import TableInput from "./TableInput";

export default {
  components: {
    TableInput
  },
  name: "RegionalBreakdown",
  props: {
    regionalBreakdown: {
      type: Array
    }
  },
  computed: {
    regional_breakdown: {
      get() {
        return this.regionalBreakdown;
      },
      set(val) {
        this.regionalBreakdown = val;
      }
    },
    'regional_breakdown.ncr_total': {
      get() {
        return this.regional_breakdown.ncr_2016
              + this.regional_breakdown.ncr_2017;
      },
      set(val) {
        this.regional_breakdown.ncr_total = val;
      }
    }
  },
  methods: {
    onInput(val) {
      this.$emit("input",val);
    }
  }
}
</script>
