<template>
  <modal title="Returns on Investment" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <q-input
        outlined
        stack-label
        label="Returns on Investment"
        type="number"
        v-model="roi"
        suffix="%"
        mask="#.##"
        reverse-fill-mask
        fill-mask="0"
        input-class="text-right"
      />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "ReturnInvestment",
  data() {
    return {
      roi: 0
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.roi);
    }
  }
};
</script>
