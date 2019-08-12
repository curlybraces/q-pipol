<template>
  <q-card class="q-my-md">
    <q-card-section class="bg-primary text-white">
      <div class="row align-center">
        <div class="text-weight-bold text-uppercase">
          {{ title }}
        </div>
        <q-space/>
        <slot name="action"/>
      </div>
    </q-card-section>

    <q-separator color="primary" />

    <q-card-section>
      <slot name="content" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String
  }
};
</script>
