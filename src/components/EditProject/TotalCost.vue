<template>
  <card-component title="Project Cost (in absolute PhP)">
    <template v-slot:content>
      <select-component
        label="Main Funding Source"
        :options="funding_sources"
        v-model="project.funding_source"
        ></select-component>

      <select-component
        v-if="project.funding_source == 2 || project.funding_source == 3"
        label="ODA Funding Institutions"
        v-model="project.funding_institution"
        ></select-component>

      <input-component
        v-if="(project.funding_source == 2 || project.funding_source == 3) && project.funding_institution == 99"
        label="Others"></input-component>

      <select-component
        label="Mode of Implementation/Procurement"
        :options="implementation_modes"
        ></select-component>

      <q-btn
        color="primary"
        @click="addFundingSource"
        label="Add Funding Source"
        icon="add"/>

    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions } from "vuex";
import InputComponent from "../Form/InputComponent";
import SelectComponent from "../Form/SelectComponent";
import CardComponent from "../UI/CardComponent";

export default {
  components: {
    CardComponent,
    SelectComponent,
    InputComponent
  },
  name: "TotalCost",
  data() {
    return {};
  },
  computed: {
    ...mapState("projects",["project"]),
    ...mapState("dropdown",["funding_sources","implementation_modes"])
  },
  methods: {
    ...mapActions("dropdown",["loadFundingSources","loadImplementationModes"])
  },
  mounted() {
    this.loadFundingSources();
    this.loadImplementationModes();
  }
};
</script>
