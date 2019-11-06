<template>
  <div>
    <div class="col-3 lt-md" v-if="inline">
      {{ label }}
    </div>
    <div class="col">
      <q-option-group
        :dense="dense"
        :options="options"
        @input="onInput"
        :value="value"
        :inline="inline"
        :type="type"
        :disable="disable"
      ></q-option-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsComponent",
  props: {
    label: String,
    options: Array,
    value: [Array, Number, String, Boolean],
    inline: {
      default: false,
      type: Boolean
    },
    dense: {
      default: false,
      type: Boolean
    },
    disable: {
      default: false,
      type: Boolean
    },
    type: {
      type: String,
      default: "radio"
    }
  },
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>
