<template>
  <q-card-section>
    <div class="text-h6">
      {{ title }}
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
