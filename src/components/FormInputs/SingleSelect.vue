<template>
  <q-select
    class="col"
    v-model="model"
    @input="handleInput"
    :options="selectOptions"
    :label="label"
    option-label="label"
    option-value="value"
    stack-label
    behavior="menu"
    @filter="filterFn"
    :dense="dense"
    :options-dense="optionsDense"
    outlined
    filled
    map-options
    emit-value
    clearable
    :hint="hint"
    use-input
    label-color="orange-10"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
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
    value: [String, Number],
    hint: { type: String }
  },
  data() {
    return {
      model: this.value,
      selectOptions: this.$props.options
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    },
    filterFn(val, update) {
      const options = this.$props.options;

      if (val === '') {
        update(() => {
          this.selectOptions = options;
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.selectOptions = options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
};
</script>
