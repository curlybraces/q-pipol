<template>
  <single-select
    v-model="model"
    label="Project Status"
    :options="project_statuses"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_PROJECT_STATUSES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'ProjectStatus',
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
    project_statuses: {
      query: FETCH_PROJECT_STATUSES
    }
  },
  data() {
    return {
      project_statuses: []
    };
  }
};
</script>
