<template>
  <modal
    title="Implementation Readiness"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <q-select
        outlined
        stack-label
        :options="preparation_documents"
        label="Preparation Document"
        v-model="preparation_document"
      />
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "ImplementationReadiness",
  data () {
    return {
      preparation_document: ""
    }
  },
  computed: {
    ...mapState("preparation_documents",["preparation_documents"])
  },
  methods: {
    ...mapActions("preparation_documents",["loadPreparationDocuments"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description);
    }
  },
  created() {
    this.loadPreparationDocuments();
  }
}
</script>
