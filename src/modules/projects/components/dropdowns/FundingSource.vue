<template>
  <single-select
    v-model="model"
    label="Main Funding Source"
    :options="funding_sources"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_FUNDING_SOURCES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'FundingSource',
  props: ['value'],
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
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    }
  },
  data() {
    return {
      funding_sources: []
    };
  }
};
</script>
