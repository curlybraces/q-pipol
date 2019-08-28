<template>
  <q-card
    :class="cardClass"
    :dark="dark">
    <q-card-section
      :class=" (dark) ? 'bg-grey-10': 'bg-primary' ">
      <div class="row align-center">
        <div class="text-weight-bold text-uppercase text-white">
          {{ title }}
        </div>
        <q-space />
        <slot name="action" />
      </div>
    </q-card-section>

    <q-card-section class="q-mt-md">
      <slot name="content" />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CardComponent",
  props: {
    title: String
  },
  computed: {
    ...mapState("settings",["dark"]),
    cardClass() {
      if (this.dark) {
        return 'bg-grey-10 q-my-md';
      }
      else {
        return 'q-my-md';
      }
    }
  }
};
</script>
