<template>
  <modal title="Description">
    <template v-slot:content>
      <q-input
        outlined
        stack-label
        type="textarea"
        label="Description"
        v-model="description"
      />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "EditDescription",
  data() {
    return {
      description: ""
    };
  }
};
</script>
