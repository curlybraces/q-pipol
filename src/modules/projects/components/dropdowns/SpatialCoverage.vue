<template>
  <single-select
    v-model="model"
    label="Spatial Coverage"
    :options="spatial_coverages"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_SPATIAL_COVERAGES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'SpatialCoverage',
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
    spatial_coverages: {
      query: FETCH_SPATIAL_COVERAGES
    }
  },
  data() {
    return {
      spatial_coverages: []
    };
  }
};
</script>
