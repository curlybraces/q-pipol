<template>
  <card-component title="Physical Accomplishments">
    <template v-slot:content>
      <select-component
        :options="categorizations"
        :value="project.categorization_id"
        label="Categorization"
      >
      </select-component>

      <input-component
        v-if="project.categorization_id == 1 || project.categorization_id == 3 || project.categorization_id == 4 "
        label="UACS Code"
        :value="project.uacs_code">
      </input-component>

      <input-component
        label="Updates"
        type="textarea"
        :value="project.updates"
      ></input-component>

      <date-component
        label="As of"
        :value="project.as_of">
      </date-component>

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
