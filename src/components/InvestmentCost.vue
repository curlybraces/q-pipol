<template>
  <q-card style="width:350px;">
    <div class="column q-pa-sm q-gutter-sm">
      <q-item-label header>Total Investment</q-item-label>
      <text-input label="2016 &amp; Prior" dense />
      <text-input label="2017" dense />
      <text-input label="2018" dense />
      <text-input label="2019" dense />
      <text-input label="2020" dense />
      <text-input label="2021" dense />
      <text-input label="2022" dense />
      <text-input label="2023 &amp; Beyond" dense />
      <div class="row">
        <q-btn class="col" label="Add" color="primary"></q-btn>
        <q-btn class="col" flat dense label="Reset" color="primary"></q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import TextInput from "../components/FormInputs/TextInput";

export default {
  components: { TextInput },
  name: "InvestmentCost",
  data() {
    return {};
  }
};
</script>
