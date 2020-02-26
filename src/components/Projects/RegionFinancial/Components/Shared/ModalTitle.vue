<template>
  <q-card-section>
    <div class="row justify item-center">
      {{ title }}
      <q-space />
      <q-btn flat round dense icon="close" @click="$emit('close')" />
    </div>
  </q-card-section>
</template>

<script>
  export default {
    name: "ModalTitle",
    props: ["title"]
  }
</script>
