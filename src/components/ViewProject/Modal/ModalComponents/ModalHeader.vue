<template>
  <q-card-section>
    <div class="row">
      <div class="text-h6">
        <slot/>
      </div>
      <q-space/>
      <q-btn
        flat
        icon="close"
        dense
        />
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "ModalHeader",
  props: {
    title: String
  }
};
</script>
