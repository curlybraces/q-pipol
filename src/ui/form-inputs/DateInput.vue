<template>
  <q-input
    v-model="model"
    mask="date"
    :label="label"
    :dense="dense"
    :hint="hint"
    stack-label
    outlined
    readonly
    label-color="secondary"
    :rules="rules"
  >
    <template v-slot:append>
      <q-icon name="event" color="secondary" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date color="secondary" v-model="model" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex';

// This is a template for date inputs
export default {
  name: 'DateInput',
  props: {
    label: String,
    hint: String,
    value: String,
    rules: Array
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$refs.qDateProxy.hide();
        this.$emit('input', val);
      }
    }
  }
};
</script>
