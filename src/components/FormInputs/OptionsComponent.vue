<template>
  <div>
    <div
      class="col-3 lt-md"
      v-if="inline"
    >
      {{ label }}
    </div>
    <div class="col">
      <q-option-group
        :dense="dense"
        :color="dark ? 'info' : 'primary'"
        :options="options"
        @input="onInput"
        :value="value"
        :inline="inline"
        :dark="dark"
        :type="type"
        :disable="disable"
      ></q-option-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OptionsComponent",
  props: {
    label: String,
    options: Array,
    value: [Number, String, Boolean, Array],
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
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    onInput (evt) {
      this.$emit("input", evt);
    }
  }
};
</script>