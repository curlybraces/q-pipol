<template>
  <q-input
    outlined
    placeholder="Email"
    :dense="dense"
    type="email"
    v-model="username"
    :rules="rules"
    hide-bottom-space
    :dark="dark"
  >
    <template v-slot:prepend>
      <q-icon name="email"></q-icon>
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EmailInput',
  props: ['value', 'rules', 'dark'],
  computed: {
    ...mapState('settings', ['dense']),
    username: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {}
};
</script>
