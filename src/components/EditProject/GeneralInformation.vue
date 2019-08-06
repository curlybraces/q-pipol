<template>
  <card-component title="General Information">
    <template v-slot:content>
      <input-component
        label="Project Title"
        hint="Project title must match title in budget proposal"
        v-model="project.title"
        :readonly="true"
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
        v-model="project.implementation_basis_id"
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
        v-model="project.implementation_start"
      ></select-component>

      <select-component
        label="Implementation End"
        hint="Target year of project completion"
        v-model="project.implementation_end"
      ></select-component>

      <input-component
        label="No. of persons to be employed"
        type="number"
        hint="Please indicate the no. of persons to be employed by the project outside of the implementing agency"
      ></input-component>
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
  props: {
    project: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("dropdown", ["implementation_bases", "implementation_periods"])
  },
  methods: {
    ...mapActions("dropdown", [
      "loadImplementationBases",
      "loadImplementationPeriods"
    ])
  },
  mounted() {
    this.loadImplementationBases();
  }
};
</script>

<style></style>
