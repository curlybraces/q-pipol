<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      :value="value"
      :prefix="prefix"
      @input="val => $emit('input', val)"
      v-money="money"
      :dense="dense"
      outlined
      label-color="orange-10"
      :readonly="readonly"
      class="col"
      input-class="text-right"
      :rules="rules"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VMoney } from 'v-money';

export default {
  name: 'MoneyInput',
  props: ['label', 'value', 'prefix', 'readonly', 'rules'],
  computed: {
    ...mapState('settings', ['dense'])
  },
  data() {
    return {
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    };
  },
  directives: {
    money: VMoney
  }
};
</script>
