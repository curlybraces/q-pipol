<template>
  <q-input
    v-model="model"
    mask="date"
    :label="label"
    :dense="dense"
    filled
    :hint="hint"
    stack-label
    outlined
    readonly
    label-color="orange-10"
  >
    <template v-slot:append>
      <q-icon name="event" color="orange-10" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date color="orange-10" v-model="model" @input="handleInput" />
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
      this.$refs.qDateProxy.hide();
      this.$emit("input", this.model);
    }
  }
};
</script>
