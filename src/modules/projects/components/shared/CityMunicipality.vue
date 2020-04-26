<template>
  <div class="col">
    <span class="text-caption text-weight-bold">City/Municipality</span>
    <q-select
      :options="options"
      option-value="id"
      option-label="name"
      hide-dropdown-icon
      use-input
      outlined
      class="col"
      @filter="filterFn"
      v-model="model"
      :hint="hint"
      :dense="dense"
      clearable
      emit-value
      map-options
    ></q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { FETCH_CITY_MUNICIPALITIES_QUERY } from '../../../constants/_graphql';

export default {
  name: 'CityMunicipality',
  apollo: {
    city_municipalities: {
      query: FETCH_CITY_MUNICIPALITIES_QUERY
    }
  },
  props: ['value'],
  data() {
    return {
      city_municipalities: [],
      selected: null,
      options: [],
      hint: 'Please type at least 3 characters to search'
    };
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
  methods: {
    filterFn(val, update) {
      const city_municipalities = this.city_municipalities;
      setTimeout(() => {
        update(() => {
          if (val.length >= 3) {
            const needle = val.toLowerCase();
            this.options = city_municipalities.filter(
              v => v.name.toLowerCase().indexOf(needle) > -1
            );
          } else {
            this.options = [];
          }
        });
      }, 500);
    }
  }
};
</script>
