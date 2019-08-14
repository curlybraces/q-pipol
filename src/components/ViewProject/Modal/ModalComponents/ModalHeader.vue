<template>
  <q-card-section class="bg-primary text-white">
    <div class="row">
      <q-btn
        flat
        icon="chevron_left"
        round
        dense
        @click="onClick"
        />
      <div class="text-h6">
        <slot/>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "ModalHeader",
  props: {
    title: String
  },
  methods: {
    onClick() {
      this.$emit("close");
    }
  }
};
</script>
