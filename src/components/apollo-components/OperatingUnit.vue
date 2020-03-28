<template>
  <single-select
    :options="operating_units"
    v-model="selected"
    :loading="loading"
  ></single-select>
</template>

<script>
import SingleSelect from '../FormInputs/SingleSelect';
import { FETCH_OPERATING_UNITS } from '../../constants/graphql';

export default {
  components: { SingleSelect },
  name: 'OperatingUnit',
  props: ['value'],
  apollo: {
    operating_units: {
      query: FETCH_OPERATING_UNITS
    }
  },
  computed: {
    selected: {
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
      operating_units: [],
      loading: false
    };
  }
};
</script>
