<template>
  <single-select
    :options="districts"
    v-model="selected"
    :loading="loading"
  ></single-select>
</template>

<script>
import SingleSelect from '../form-inputs/SingleSelect';
import { FETCH_DISTRICTS } from '../../constants/graphql';

export default {
  components: { SingleSelect },
  name: 'Districts',
  props: ['value'],
  apollo: {
    districts: {
      query: FETCH_DISTRICTS
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
      districts: [],
      loading: false
    };
  }
};
</script>
