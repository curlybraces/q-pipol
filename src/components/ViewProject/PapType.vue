<template>
  <modal title="Program or Project" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <q-option-group outlined type="radio" :options="pap" v-model="pap_type" />
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "PapType",
  data() {
    return {
      pap_type: "",
      pap: [
        {
          value: 1,
          label: "Program"
        },
        {
          value: 2,
          label: "Project"
        }
      ]
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
