<template>
  <div class="row">
    <select-component
      class="col"
      :options="fundingSources"
      v-model="fs.fundingSource"></select-component>
    <input-component
      label="2016 &amp; Prior"
      class="col"
      type="number"
      v-if="project.implementationStart < 2017"
      v-model="fs.investment2016"></input-component>
    <input-component
      label="2017"
      class="col"
      type="number"
      v-model="fs.investment2017"></input-component>
    <input-component
      label="2018"
      class="col"
      type="number"
      v-model="fs.investment2018"></input-component>
    <input-component
      label="2019"
      class="col"
      type="number"
      v-model="fs.investment2019"></input-component>
    <input-component
      label="2020"
      class="col"
      type="number"
      v-model="fs.investment2020"></input-component>
    <input-component
      label="2021"
      class="col"
      type="number"
      v-model="fs.investment2021"></input-component>
    <input-component
      label="2022"
      class="col"
      type="number"
      v-model="fs.investment2022"></input-component>
    <input-component
      label="2023 &amp; Beyond"
      class="col"
      type="number"
      v-if="project.implementationEnd > 2022"
      v-model="fs.investment2023"></input-component>
    <input-component
      label="Total"
      class="col"
      type="number"
      :readonly="true"
      :value="fs.investmentTotal"></input-component>
  </div>
</template>

<script>
  import InputComponent from "../FormInputs/InputComponent";
  import SelectComponent from "../FormInputs/SelectComponent";

  export default {
    components: {
      InputComponent, SelectComponent
    },
    name: "CostingComponent"
  }
</script>
