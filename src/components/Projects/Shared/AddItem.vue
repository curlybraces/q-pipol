<template>
  <q-card>
    <q-card-section>
      <div class="row justify item-center">
        Add
        <q-space />
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </div>
    </q-card-section>
    <q-form style="width:480px;" class="q-pa-md q-gutter-md">
      <q-select
        outlined
        stack-label
        label="Region"
        v-model="itemToSubmit.item"
        :options="REGIONS"
      ></q-select>
      <money-input
        label="2016"
        v-model="itemToSubmit.target_2016"
      ></money-input>
      <money-input
        label="2017"
        v-model="itemToSubmit.target_2017"
      ></money-input>
      <money-input
        label="2018"
        v-model="itemToSubmit.target_2018"
      ></money-input>
      <money-input
        label="2019"
        v-model="itemToSubmit.target_2019"
      ></money-input>
      <money-input
        label="2020"
        v-model="itemToSubmit.target_2020"
      ></money-input>
      <money-input
        label="2021"
        v-model="itemToSubmit.target_2021"
      ></money-input>
      <money-input
        label="2022"
        v-model="itemToSubmit.target_2022"
      ></money-input>
      <money-input
        label="2023"
        v-model="itemToSubmit.target_2023"
      ></money-input>
      <money-input
        label="Total"
        v-model="itemToSubmit.target_total"
      ></money-input>
      <div class="q-ml-md">
        <q-btn class="full-width" color="primary" @click="addToItem">Add</q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { REGIONS } from '../../../data/dropdown-values.js';

export default {
  name: 'AddItem',
  components: {
    'money-input': () => import('../../../modules/shared/components/form-inputs/MoneyInput.vue')
  },
  props: ['item'],
  computed: {
    itemToSubmit: {
      get() {
        return this.item;
      },
      set(itemToSubmit) {
        this.$emit('update', itemToSubmit);
      }
    }
  },
  data() {
    return {
      REGIONS,
      initialState: {
        item: {
          value: '',
          label: ''
        },
        target_2016: '',
        target_2017: '',
        target_2018: '',
        target_2019: '',
        target_2020: '',
        target_2021: '',
        target_2022: '',
        target_2023: '',
        target_total: ''
      }
    };
  },
  methods: {
    addToItem() {
      if (!this.itemToSubmit.item.value) {
        alert('ID field is required');
      } else {
        this.$emit('add');
      }
      this.itemToSubmit = Object.assign({}, this.initialState);
    }
  }
};
</script>
