<template>
  <q-form style="width:480px;" class="q-pa-md q-gutter-md">
    <single-select
      label="Region"
      v-model="regionToEdit.id"
      :options="regions_options"
    ></single-select>
    <money-input label="2016" v-model="regionToEdit.target_2016"></money-input>
    <money-input label="2017" v-model="regionToEdit.target_2017"></money-input>
    <money-input label="2018" v-model="regionToEdit.target_2018"></money-input>
    <money-input label="2019" v-model="regionToEdit.target_2019"></money-input>
    <money-input label="2020" v-model="regionToEdit.target_2020"></money-input>
    <money-input label="2021" v-model="regionToEdit.target_2021"></money-input>
    <money-input label="2022" v-model="regionToEdit.target_2022"></money-input>
    <money-input label="2023" v-model="regionToEdit.target_2023"></money-input>
    <money-input
      label="Total"
      v-model="regionToEdit.target_total"
    ></money-input>
  </q-form>
</template>

<script>
// import { mapState } from 'vuex';
import MoneyInput from '../../../../form-inputs/MoneyInput';
import SingleSelect from '../../../../form-inputs/SingleSelect';

export default {
  components: {
    SingleSelect,
    MoneyInput
  },
  name: 'ModalBody',
  props: ['value'],
  computed: {
    regions_options() {
      return this.$state.options.regions_options;
    },
    // ...mapState('options', ['regions_options']),
    regionToEdit: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
