<template>
  <modal
    title="Description"
    @close="closeDialog"
    @save="saveData">
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
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description);
    }
  }
};
</script>
