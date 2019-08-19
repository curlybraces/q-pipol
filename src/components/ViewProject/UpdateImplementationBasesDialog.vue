<template>
  <modal title="Implementation Bases" @close="closeDialog" @save="saveData">
    <template v-slot:information>
      Implementation bases
    </template>
    <template v-slot:content>
      <q-option-group
        v-model="implementation_basis_id"
        :options="implementation_bases"
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
      implementation_basis_id: [],
      dialog: true
    };
  },
  computed: {
    ...mapState("implementation_bases", ["implementation_bases"])
  },
  methods: {
    ...mapActions("implementation_bases", ["loadImplementationBases"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.implementation_basis_id);
    }
  },
  created() {
    this.loadImplementationBases();
  }
};
</script>
