<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-select
      v-model="model"
      :options="selectOptions"
      option-label="name"
      option-value="id"
      behavior="menu"
      :dense="dense"
      :options-dense="dense"
      outlined
      :hint="hint ? hint : void 0"
      label-color="orange-10"
      :rules="rules"
      dropdown-icon="unfold_more"
      map-options
      emit-value
      clearable
      :readonly="readonly"
      hide-bottom-space
    >
      <template v-slot:before-options>
        <q-item>
          <q-item-section class="text-grey">
            <q-input
              placeholder="Filter"
              v-model="filterText"
              outlined
              :dense="dense"
            />
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
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
    options: {
      type: Array
    },
    value: [String, Number],
    hint: { type: String },
    rules: Array,
    readonly: Boolean
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    selectOptions() {
      const filterText = this.filterText;
      const options = this.$props.options;

      if (!filterText) {
        return options;
      } else {
        const filterTextLowerCase = filterText.toLowerCase();

        return options.filter(
          v => v.name.toLowerCase().indexOf(filterTextLowerCase) > -1
        );
      }
    }
  },
  data() {
    return {
      filterText: '',
      filtering: false
    };
  }
};
</script>
