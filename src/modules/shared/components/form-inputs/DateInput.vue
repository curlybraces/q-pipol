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
  >
    <template v-slot:append>
      <q-icon name="event" color="secondary" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date color="secondary" v-model="model" @input="handleInput" />
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
    hint: String
  },
  computed: {
    ...mapState('settings', ['dense'])
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    handleInput() {
      this.$refs.qDateProxy.hide();
      this.$emit('input', this.model);
    }
  }
};
</script>
