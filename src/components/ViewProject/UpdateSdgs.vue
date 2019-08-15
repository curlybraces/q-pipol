<template>
  <modal
    title="Sustainable Development Goals"
    @close="closeDialog"
    @save="saveData"
  >
    <template v-slot:content>
      <q-option-group
        v-model="sustainable_development_goal"
        :options="sustainable_development_goals"
        type="checkbox"
      />
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "UpdateImplementationBasesDialog",
  data() {
    return {
      sustainable_development_goal: []
    };
  },
  computed: {
    ...mapState("sustainable_development_goals", [
      "sustainable_development_goals"
    ])
  },
  methods: {
    ...mapActions("sustainable_development_goals", [
      "loadSustainableDevelopmentGoals"
    ]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.sustainable_development_goal);
    }
  },
  created() {
    this.loadSustainableDevelopmentGoals();
  }
};
</script>
