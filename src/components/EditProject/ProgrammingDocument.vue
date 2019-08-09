<template>
  <card-component title="Project for Inclusion in Which Programming Document">
    <template v-slot:content>
      <select-component
        label="PIP Category"
        :options="pip_types"
        v-model="pip_type_id"
      ></select-component>

      <select-component
        label="CIP Category"
        :options="cip_types"
        v-model="cip_type_id"
      ></select-component>

      <options-component
        label="TRIP"
        :options="[{ label: 'TRIP', value: 1 }, { label: 'No', value: 0 }]"
        v-model="trip"
      ></options-component>

      <options-component
        label="RDIP"
        :options="[{ label: 'RDIP', value: 1 }, { label: 'No', value: 0 }]"
        v-model="rdip"
      ></options-component>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";
import OptionsComponent from "../Form/OptionsComponent";

export default {
  components: {
    OptionsComponent,
    SelectComponent,
    CardComponent
  },
  name: "ProgrammingDocument",
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown", ["pip_types", "cip_types"]),
    pip_type_id: {
      get() {
        return this.project.pip_type_id
      },
      set(val) {
        this.setPipType(val);
      }
    },
    cip_type_id: {
      get() {
        return this.project.cip_type_id
      },
      set(val) {
        this.setCipType(val);
      }
    },
    trip: {
      get() {
        return this.project.trip;
      },
      set(val) {
        this.setTrip(val);
      }
    },
    rdip: {
      get() {
        return this.project.rdip;
      },
      set(val) {
        this.setRdip(val);
      }
    }
  },
  methods: {
    ...mapActions("dropdown", ["loadPipTypes", "loadCipTypes"]),
    ...mapMutations("projects",["setPipType","setCipType","setTrip","setRdip"])
  },
  mounted() {
    this.loadPipTypes();
    this.loadCipTypes();
  }
};
</script>
