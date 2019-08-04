<template>
  <q-card class="q-my-md">
    <q-card-section class="bg-primary text-white">
      <div class="row align-center">
        <div class="text-weight-bold text-uppercase">
          {{ title }}
        </div>
      </div>
    </q-card-section>

    <q-separator color="primary" />

    <q-card-section v-show="show">
      <slot name="content" />
    </q-card-section>

    <q-card-actions align="center" v-if="show && onClick">
      <q-btn icon="save" class="bg-primary text-white" @click="onClick"
        >Save</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String,
    onClick: Function,
    collapsible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  }
};
</script>

<style></style>
