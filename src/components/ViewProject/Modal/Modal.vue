<template>
  <q-dialog v-model="dialog" square persistent>
    <q-card>
      <modal-header>
        {{ title }}
      </modal-header>
      <q-separator />
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>
      <q-separator />
      <modal-actions></modal-actions>
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
  }
};
</script>
