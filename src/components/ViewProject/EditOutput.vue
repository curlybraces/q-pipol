<template>
  <modal title="Expected Outputs">
    <template v-slot:content>
      <q-input
        outlined
        stack-label
        type="textarea"
        label="Expected Outputs"
        v-model="expected_output"
      />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "EditOutput",
  data() {
    return {
      expected_output: ""
    };
  }
};
</script>
