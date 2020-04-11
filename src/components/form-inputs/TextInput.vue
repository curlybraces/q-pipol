<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      v-model="model"
      :type="type"
      :dense="dense"
      outlined
      @input="val => $emit('input', val)"
      :readonly="readonly"
      :rules="rules"
      :max-length="maxlength"
      :counter="type == 'textarea'"
      :hint="hint"
      clearable
      label-color="orange-10"
      hide-bottom-space
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TextInput',
  props: ['type', 'label', 'value', 'readonly', 'rules', 'maxlength', 'hint'],
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style>
.q-textarea .q-field__native {
  resize: none;
}
</style>
