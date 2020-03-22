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
    >
      <template v-slot:before-options>
        <q-item>
          <q-item-section class="text-grey">
            <q-input
              placeholder="Filter"
              v-model="filterText"
              outlined
              :dense="dense"
              :loading="filtering"
              @input="filterOptions"
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
    options: Array,
    value: [String, Number],
    hint: { type: String },
    rules: Array
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
    }
  },
  data() {
    return {
      selectOptions: [],
      filterText: '',
      filtering: false
    };
  },
  methods: {
    filterOptions(e) {
      const options = this.$props.options;

      if (e === '') {
        this.selectOptions = options;
        return;
      } else {
        this.filtering = true;
        setTimeout(() => {
          const needle = e.toLowerCase();
          this.selectOptions = options.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          );
          this.filtering = false;
        }, 500);
        return;
      }
    },
    filterFn(val, update) {
      console.log(val);
      console.log(update);
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
