<template>
  <q-stepper-navigation>
    <q-btn
      @click="$emit('next')"
      color="orange-10"
      label="Next"
      class="q-ml-sm"
    />
    <q-btn
      flat
      @click="$emit('back')"
      color="orange-5"
      label="Back"
      class="q-ml-sm"
      v-if="withBack"
    />
    <slot></slot>
  </q-stepper-navigation>
</template>

<script>
export default {
  name: 'StepperNavigation',
  props: ['withBack']
};
</script>
