<template>
  <div>
    <q-item
      tag="label"
      v-for="(option, index) in options"
      :key="index"
      v-ripple
      clickable
      :dense="dense"
    >
      <q-item-section avatar>
        <q-checkbox color="orange-10" v-model="model" :val="option.id" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ option.name }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListOptionGroup',
  props: ['options', 'value'],
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
