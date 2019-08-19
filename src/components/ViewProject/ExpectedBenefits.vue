<template>
  <modal title="Expected Benefits" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <q-input
        outlined
        stack-label
        label="Expected Benefits"
        type="textarea"
        v-model="expected_benefits"
      />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "ExpectedBenefits",
  data() {
    return {
      expected_benefits: ""
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.expected_benefits);
    }
  }
};
</script>
