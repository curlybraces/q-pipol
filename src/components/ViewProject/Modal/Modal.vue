<template>
  <q-dialog
    v-model="dialog"
    square
    persistent>
    <q-card style="width: 480px; max-width: 80vw;">
      <modal-header @close="closeDialog">
        {{ title }}
      </modal-header>
      <q-separator />
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>
      <q-separator />
      <modal-actions @close="closeDialog" @save="saveData"></modal-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ModalHeader from "./ModalComponents/ModalHeader";
import ModalActions from "./ModalComponents/ModalActions";

export default {
  components: {
	  ModalActions,
	  ModalHeader },
  name: "Modal",
  props: {
    title: String,
  },
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    saveData() {
      console.log("save");
      setTimeout(() => {
        this.dialog = false
      }, 1000);
    }
  }
};
</script>
