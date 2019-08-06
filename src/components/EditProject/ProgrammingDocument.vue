<template>
  <card-component title="Project for Inclusion in Which Programming Document">
    <template v-slot:content>
      <select-component
        label="PIP Category"
        :options="pip_types"
        v-model="project.pip_type_id"
      ></select-component>

      <select-component
        label="CIP Category"
        :options="cip_types"
        v-model="project.cip_type_id"
      ></select-component>

      <options-component
        label="TRIP"
        :options="[{ label: 'TRIP', value: 1 }, { label: 'No', value: 0 }]"
        v-model="project.trip"
      ></options-component>

      <options-component
        label="RDIP"
        :options="[{ label: 'RDIP', value: 1 }, { label: 'No', value: 0 }]"
        v-model="project.rdip"
      ></options-component>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardComponent from "../CardComponent";
import SelectComponent from "../SelectComponent";
import OptionsComponent from "../OptionsComponent";

export default {
  components: {
    OptionsComponent,
    SelectComponent,
    CardComponent
  },
  name: "ProgrammingDocument",
  computed: {
    ...mapState("projects",["project"]),
    ...mapState("dropdown",["pip_types","cip_types"])
  },
  methods: {
    ...mapActions("dropdown",["loadPipTypes","loadCipTypes"])
  },
  mounted() {
    this.loadPipTypes();
    this.loadCipTypes();
  }
};
</script>
