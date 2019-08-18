<template>
  <modal
    title="Employment Generation"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <q-input
        outlined
        stack-label
        label="Employment Generation"
        type="number"
        v-model="employment_generation"
        input-class="text-right"
      />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "EmploymentGeneration",
  data() {
    return {
      employment_generation: 0
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.employment_generation);
    }
  }
};
</script>
