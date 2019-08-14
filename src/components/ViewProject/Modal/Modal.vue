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
      <modal-actions />
    </q-card>
  </q-dialog>
</template>

<script>
import ModalActions from "../../components/ViewProject/Modal/ModalComponents/ModalActions";
import ModalHeader from "../../components/ViewProject/Modal/ModalComponents/ModalHeader";

export default {
  components: { ModalHeader, ModalActions },
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
