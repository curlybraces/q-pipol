<template>
  <div :class=" dark? 'bg-grey-10': 'bg-white' ">
    <div class="row q-pa-md q-col-gutter-sm">
      <select-component
        class="col-12 col-md"
        :options="fundingSources"
        v-model="fs.fundingSource"
      ></select-component>
      <input-component
        label="2016 &amp; Prior"
        class="col-12 col-md"
        type="number"
        v-if="implementationStart < 2017"
        v-model="fs.investment2016"
      ></input-component>
      <input-component
        label="2017"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2017"
      ></input-component>
      <input-component
        label="2018"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2018"
      ></input-component>
      <input-component
        label="2019"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2019"
      ></input-component>
      <input-component
        label="2020"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2020"
      ></input-component>
      <input-component
        label="2021"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2021"
      ></input-component>
      <input-component
        label="2022"
        class="col-12 col-md"
        type="number"
        v-model="fs.investment2022"
      ></input-component>
      <input-component
        label="2023 &amp; Beyond"
        class="col-12 col-md"
        type="number"
        v-if="implementationEnd > 2022"
        v-model="fs.investment2023"
      ></input-component>
      <input-component
        label="Total"
        class="col-12 col-md"
        type="number"
        :readonly="true"
        :value="investmentTotal"
      ></input-component>
      <q-btn
        flat
        dense
        round
        icon="delete"
        color="red"
        class="text-right"
        @click="$emit('delete')"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import InputComponent from "./FormInputs/InputComponent";
import SelectComponent from "./FormInputs/SelectComponent";

export default {
  components: {
    InputComponent,
    SelectComponent
  },
  name: "CostingComponent",
  props: {
    fs: Object,
    implementationStart: Number,
    implementationEnd: Number
  },
  computed: {
    ...mapState("settings",["dark"]),
    ...mapState("funding_sources", ["fundingSources"]),
    investmentTotal: {
      get() {
        var y1 = parseFloat(this.fs.investment2016) || 0;
        var y2 = parseFloat(this.fs.investment2017) || 0;
        var y3 = parseFloat(this.fs.investment2018) || 0;
        var y4 = parseFloat(this.fs.investment2019) || 0;
        var y5 = parseFloat(this.fs.investment2020) || 0;
        var y6 = parseFloat(this.fs.investment2021) || 0;
        var y7 = parseFloat(this.fs.investment2022) || 0;
        var y8 = parseFloat(this.fs.investment2023) || 0;
        return y1 + y2 + y3 + y4 + y5 + y6 + y7 + y8;
      }
    }
  },
  watch: {
    investmentTotal() {
      this.fs.investmentTotal = this.investmentTotal;
    }
  }
};
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>
