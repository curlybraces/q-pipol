<template>
  <q-card>
    <q-card-section>
      <div class="row justify item-center">
        {{ title }}
        <q-space />
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </div>
    </q-card-section>
    <q-form style="width:480px;" class="q-pa-md q-gutter-md">
      <single-select
        label="Fund Source"
        v-model="funding_source.id"
        :options="FUNDING_SOURCES"
      ></single-select>
      <money-input
        label="2016"
        v-model="funding_source.target_2016"
      ></money-input>
      <money-input
        label="2017"
        v-model="funding_source.target_2017"
      ></money-input>
      <money-input
        label="2018"
        v-model="funding_source.target_2018"
      ></money-input>
      <money-input
        label="2019"
        v-model="funding_source.target_2019"
      ></money-input>
      <money-input
        label="2020"
        v-model="funding_source.target_2020"
      ></money-input>
      <money-input
        label="2021"
        v-model="funding_source.target_2021"
      ></money-input>
      <money-input
        label="2022"
        v-model="funding_source.target_2022"
      ></money-input>
      <money-input
        label="2023"
        v-model="funding_source.target_2023"
      ></money-input>
      <money-input
        label="Total"
        v-model="funding_source.target_total"
      ></money-input>
      <div class="q-ml-md">
        <q-btn class="full-width" color="primary" @click="$emit('save')"
          >Add</q-btn
        >
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { FUNDING_SOURCES } from "../../../data/dropdown-values";

export default {
  components: {
    "money-input": () => import("../../FormInputs/MoneyInput.vue"),
    "single-select": () => import("../../FormInputs/SingleSelect.vue"),
  },
  name: "FundSource",
  props: ["title", "funding_source"],
  data() {
    return {
      FUNDING_SOURCES
    };
  },

};
</script>
