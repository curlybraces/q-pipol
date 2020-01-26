<template>
  <q-select
    v-model="model"
    @input="handleInput"
    @filter="filterFn"
    :options="filterOptions"
    :label="label"
    stack-label
    behavior="dialog"
    :dense="dense"
    :options-dense="optionsDense"
    outlined
    multiple
    map-options
    emit-value
    use-input
    clearable
    :hint="hint"
  >
    <template v-slot:prepend>
      <q-icon name="swap_vert" />
    </template>
  </q-select>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    label: {
      type: String,
      default: ""
    },
    dense: {
      type: Boolean,
      default: false
    },
    optionsDense: {
      type: Boolean,
      default: false
    },
    options: Array,
    value: {
      type: [Number, String]
    },
    hint: { type: String }
  },
  data() {
    return {
      filterOptions: [],
      model: null
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    },
    filterFn(val, update) {
      const { options } = this;
      update(() => {
        if (val === "") {
          this.filterOptions = options;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = options.filter(
            ({ label }) => label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    selectAllOptions() {
      const { options } = this;
      this.model = [];
      options.forEach(option => this.model.push(option.value));
    }
  }
};
</script>
