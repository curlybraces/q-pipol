<template>
  <q-select
    class="col"
    v-model="model"
    @input="handleInput"
    :options="selectOptions"
    :label="label"
    option-label="name"
    option-value="id"
    stack-label
    behavior="menu"
    @filter="filterFn"
    :dense="dense"
    :options-dense="dense"
    outlined
    filled
    map-options
    emit-value
    clearable
    :hint="hint"
    use-input
    label-color="orange-10"
    :rules="rules"
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
import { mapState } from 'vuex';

export default {
  name: 'SingleSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    optionsDense: {
      type: Boolean,
      default: false
    },
    options: Array,
    value: [String, Number],
    hint: { type: String },
    rules: Array
  },
  computed: {
    ...mapState('settings', ['dense'])
  },
  data() {
    return {
      model: this.value,
      selectOptions: []
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', this.model);
    },
    filterFn(val, update) {
      const options = this.$props.options;

      if (val === '') {
        update(() => {
          this.selectOptions = options;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.selectOptions = options.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  mounted() {
    this.selectOptions = this.$props.options;
  }
};
</script>
