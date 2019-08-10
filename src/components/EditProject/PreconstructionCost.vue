<template>
  <card-component title="Pre-Construction Costs">
    <template v-slot:content>
      <p>ROWA Component? Yes or No</p>

      <input-component label="Number of affected households"></input-component>

      <p>Schedule of ROWA Cost (In Exact Amount in PhP)</p>

      <input-component label="ROWA Cost for 2017"></input-component>

      <input-component label="ROWA Cost for 2018"></input-component>

      <input-component label="ROWA Cost for 2019"></input-component>

      <input-component label="ROWA Cost for 2020"></input-component>

      <input-component label="ROWA Cost for 2021"></input-component>

      <input-component label="ROWA Cost for 2022"></input-component>

      <input-component label="Total ROWA Cost"></input-component>

      <p>Resettlement Component? Yes or No</p>

      <input-component label="Number of affected households"></input-component>

      <p>Schedule of Resettlement Cost (In Exact Amount in PhP)</p>

      <input-component label="Resettlement Cost for 2017"></input-component>

      <input-component label="Resettlement Cost for 2018"></input-component>

      <input-component label="Resettlement Cost for 2019"></input-component>

      <input-component label="Resettlement Cost for 2020"></input-component>

      <input-component label="Resettlement Cost for 2021"></input-component>

      <input-component label="Resettlement Cost for 2022"></input-component>

      <input-component label="Total Resettlement Cost"></input-component>

      <p>ROWA and Resettlement Plan? Yes or No</p>
    </template>
  </card-component>
</template>

<script>
import CardComponent from "../UI/CardComponent";
import InputComponent from "../Form/InputComponent";

export default {
  components: {
    InputComponent,
    CardComponent
  },
  name: "PreconstructionCost"
};
</script>
