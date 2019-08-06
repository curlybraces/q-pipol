<template>
  <card-component title="General Information">
    <template v-slot:content>
      <input-component
        label="Project Title"
        hint="Project title must match title in budget proposal"
        v-model="project.title"
      ></input-component>

      <options-component
        label="Program or Project"
        :options="[
          { label: 'Program', value: 1 },
          { label: 'Project', value: 2 }
        ]"
        v-model="project.pap_type_id"
      ></options-component>

      <select-component
        label="Basis for Implementation"
        hint="Included in any of the following documents"
        :options="implementation_bases"
        :multiple="true"
        v-model="project.implementation_bases"
      ></select-component>

      <input-component
        type="textarea"
        label="Description"
        hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
        v-model="project.description"
      ></input-component>

      <input-component
        type="textarea"
        label="Expected Outputs"
        hint="Actual Deliverables, i.e. 100km of paved roads"
        v-model="project.expected_outputs"
      ></input-component>

      <select-component
        label="Implementation Start"
        hint="Target year of start of implementation"
        :options="implementation_periods"
        v-model="project.implementation_start"
        @input="updateImplementationEnd"
      ></select-component>

      <select-component
        label="Implementation End"
        hint="Target year of project completion"
        :options="filteredImplementationPeriods"
        v-model="project.implementation_end"
      ></select-component>

      <input-component
        label="No. of persons to be employed"
        type="number"
        hint="Please indicate the no. of persons to be employed by the project outside of the implementing agency"
        v-model="project.employment_generation"
      ></input-component>

      <q-btn @click="submitForm">Test</q-btn>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions } from "vuex";

import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";
import InputComponent from "../../components/InputComponent";
import OptionsComponent from "../../components/OptionsComponent";

export default {
  components: {
    CardComponent,
    SelectComponent,
    InputComponent,
    OptionsComponent
  },
  name: "GeneralInformation",
  data() {
    return {
      filteredImplementationPeriods: []
    };
  },
  computed: {
    ...mapState("dropdown", ["implementation_bases", "implementation_periods"]),
    ...mapState("projects", ["project"])
  },
  methods: {
    ...mapActions("dropdown", [
      "loadImplementationBases",
      "loadImplementationPeriods"
    ]),
    updateImplementationEnd(evt) {
      let filteredImplementationPeriods = [];
      var start = parseInt(evt);
      filteredImplementationPeriods = this.implementation_periods.filter(
        period => {
          return parseInt(period.name) >= start;
        }
      );
      this.filteredImplementationPeriods = filteredImplementationPeriods;
    },
    submitForm() {
      console.log(this.project);
    }
  },
  mounted() {
    this.loadImplementationBases();
    this.loadImplementationPeriods();
  }
};
</script>

<style></style>
