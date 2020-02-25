<template>
  <q-card>
    <q-card-section>
      <div class="row justify item-center">
        Edit Region
        <q-space />
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </div>
    </q-card-section>
    <q-form style="width:480px;" class="q-pa-md q-gutter-md">
      <q-select
        outlined
        stack-label
        label="Region"
        v-model="regionToEdit.id"
        :options="REGIONS"
        emit-value
        map-options
      ></q-select>
      <money-input
        label="2016"
        v-model="regionToEdit.target_2016"
      ></money-input>
      <money-input
        label="2017"
        v-model="regionToEdit.target_2017"
      ></money-input>
      <money-input
        label="2018"
        v-model="regionToEdit.target_2018"
      ></money-input>
      <money-input
        label="2019"
        v-model="regionToEdit.target_2019"
      ></money-input>
      <money-input
        label="2020"
        v-model="regionToEdit.target_2020"
      ></money-input>
      <money-input
        label="2021"
        v-model="regionToEdit.target_2021"
      ></money-input>
      <money-input
        label="2022"
        v-model="regionToEdit.target_2022"
      ></money-input>
      <money-input
        label="2023"
        v-model="regionToEdit.target_2023"
      ></money-input>
      <money-input
        label="Total"
        v-model="regionToEdit.target_total"
      ></money-input>
      <div class="q-ml-md">
        <q-btn class="full-width" color="primary" @click="saveRegion">Add</q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { REGIONS } from "../../../data/dropdown-values";
import { mapMutations } from "vuex";

export default {
  components: {
    "money-input": () => import("../../../components/FormInputs/MoneyInput.vue")
  },
  props: ["region","id"],
  name: "EditRegionalForm",
  data() {
    return {
      REGIONS,
      regionToEdit: {}
    };
  },
  methods: {
    ...mapMutations("project",["updateRegionRow"]),
    saveRegion() {
      this.updateRegionRow({
        index: this.$props.id,
        region: this.regionToEdit
      })
    }
  },
  mounted() {
    this.regionToEdit = Object.assign({}, this.$props.region);
  }
};
</script>
