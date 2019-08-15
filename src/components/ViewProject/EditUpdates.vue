<template>
  <modal
    title="Updates"
    @close="closeDialog"
    @save="saveData">

    <template v-slot:content>
      <div class="q-col-gutter-y-md">
        <q-input
          dense
          outlined
          stack-label
          type="textarea"
          label="Updates"
          v-model="updates"
        />

        <q-input
          dense
          outlined
          stack-label
          type="date"
          label="As of"
          v-model="as_of"/>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "EditUpdates",
  data() {
    return {
      updates: "",
      as_of: ""
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description, this.as_of);
    }
  }
};
</script>
