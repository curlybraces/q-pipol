<template>
  <card-component title="Physical Accomplishments">
    <template v-slot:content>
      <select-component
        :options="categorizations"
        v-model="categorization_id"
        label="Categorization"
      >
      </select-component>

      <input-component label="UACS Code" v-model="uacs_code"></input-component>

      <input-component
        label="Updates"
        type="textarea"
        v-model="updates"
      ></input-component>

      <date-component label="As of" v-model="as_of"></date-component>
    </template>
  </card-component>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";
import InputComponent from "../Form/InputComponent";
import DateComponent from "../Form/DateComponent";

export default {
  components: {
    CardComponent,
    DateComponent,
    InputComponent,
    SelectComponent
  },
  name: "PhysicalAccomplishments",
  data() {
    return {};
  },
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown", ["categorizations"])
  },
  methods: {
    ...mapMutations("projects", [
      "setCategorizationId",
      "setUacsCode",
      "setUpdates",
      "setAsOf"
    ]),
    ...mapActions("dropdown", ["loadCategorizations"])
  },
  mounted() {
    this.loadCategorizations();
  }
};
</script>
