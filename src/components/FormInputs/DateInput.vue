<template>
  <q-input
    v-model="model"
    mask="date"
    placeholder="YYYY/MM/DD"
    :label="label"
    :dense="dense"
    :hint="hint"
    stack-label
    outlined
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="model" @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "DateInput",
  props: {
    label: String,
    hint: String,
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    }
  }
};
</script>
