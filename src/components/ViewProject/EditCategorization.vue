<template>
  <modal
    title="Categorization"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <q-option-group
        type="radio"
        :options="categorizations"
        v-model="categorization"
      />
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "EditCategorization",
  data() {
    return {
      categorization: ""
    };
  },
  computed: {
    ...mapState("categorizations",["categorizations"])
  },
  methods: {
    ...mapActions("categorizations",["loadCategorizations"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.categorization);
    }
  },
  created() {
    this.loadCategorizations();
  }
};
</script>
