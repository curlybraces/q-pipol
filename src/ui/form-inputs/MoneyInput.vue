<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      v-model="displayValue"
      :prefix="prefix"
      :dense="dense"
      outlined
      label-color="orange-10"
      :readonly="readonly"
      class="col"
      input-class="text-right"
      :rules="rules"
      @blur="isInputActive = false"
      @focus="isInputActive = true"
      hide-bottom-space
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MoneyInput',
  props: ['label', 'value', 'prefix', 'readonly', 'rules'],
  computed: {
    ...mapState('settings', ['dense']),
    displayValue: {
      get() {
        const value = this.$props.value ? this.$props.value : 0;

        if (this.isInputActive) {
          return value.toString();
        } else {
          return value
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
        }
      },
      set(val) {
        let newValue = parseFloat(val.replace(/[^\d.]/g, ''));

        if (isNaN(newValue)) {
          newValue = 0;
        }

        this.$emit('input', newValue);
      }
    }
  },
  data() {
    return {
      isInputActive: false
    };
  }
};
</script>
