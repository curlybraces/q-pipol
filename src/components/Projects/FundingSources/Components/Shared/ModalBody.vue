<template>
  <q-form style="width:480px;" class="q-pa-md q-gutter-md">
    <single-select
      label="Funding Source"
      v-model="fundSourceToEdit.id"
      :options="FUNDING_SOURCES"
    ></single-select>
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
  </q-form>
</template>

<script>
import MoneyInput from "../../../../FormInputs/MoneyInput";
import SingleSelect from "../../../../FormInputs/SingleSelect";
import { FUNDING_SOURCES } from "../../../../../data/dropdown-values";

export default {
  components: {
    SingleSelect,
    MoneyInput
  },
  name: "ModalBody",
  data() {
    return {
      FUNDING_SOURCES
    };
  },
  props: ["value"],
  computed: {
    fundSourceToEdit: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
