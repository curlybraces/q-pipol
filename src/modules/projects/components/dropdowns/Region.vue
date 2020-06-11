<template>
  <single-select
    v-model="model"
    label="Region"
    :options="regions"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_REGIONS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'Region',
  props: ['value', 'rules'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  apollo: {
    regions: {
      query: FETCH_REGIONS
    }
  },
  data() {
    return {
      regions: []
    };
  }
};
</script>
