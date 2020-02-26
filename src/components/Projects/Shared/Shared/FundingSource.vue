<template>
  <q-card>
    <q-card-section>
      <div class="row justify item-center">
        {{ title }}
        <q-space />
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-form style="width:480px;" class="q-pa-md q-gutter-md">
        <q-select
          outlined
          stack-label
          label="Funding Source"
          v-model="fundSourceToEdit.id"
          :options="FUNDING_SOURCES"
          emit-value
          map-options
        ></q-select>
        <money-input
          label="2016"
          v-model="fundSourceToEdit.target_2016"
        ></money-input>
        <money-input
          label="2017"
          v-model="fundSourceToEdit.target_2017"
        ></money-input>
        <money-input
          label="2018"
          v-model="fundSourceToEdit.target_2018"
        ></money-input>
        <money-input
          label="2019"
          v-model="fundSourceToEdit.target_2019"
        ></money-input>
        <money-input
          label="2020"
          v-model="fundSourceToEdit.target_2020"
        ></money-input>
        <money-input
          label="2021"
          v-model="fundSourceToEdit.target_2021"
        ></money-input>
        <money-input
          label="2022"
          v-model="fundSourceToEdit.target_2022"
        ></money-input>
        <money-input
          label="2023"
          v-model="fundSourceToEdit.target_2023"
        ></money-input>
        <money-input
          label="Total"
          v-model="fundSourceToEdit.target_total"
        ></money-input>
        <div class="q-ml-md">
          <q-btn class="full-width" color="primary" @click="saveFundingSource"
            >Add</q-btn
          >
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { FUNDING_SOURCES } from "../../../../data/dropdown-values";

export default {
  components: {
    "money-input": () =>
      import("../../../../components/FormInputs/MoneyInput.vue")
  },
  props: ["title", "fundSource"],
  data() {
    return {
      FUNDING_SOURCES,
      fundSourceToEdit: {}
    };
  },
  mounted() {
    this.fundSourceToEdit = Object.assign({}, this.$props.fundSource);
  }
};
</script>
